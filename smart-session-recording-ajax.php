<?php
function rednao_ssr_submit_recording()
{
    $params=array(
        'uniqid'=>RedNaoGetPostValue('uniqid'),
        'duration'=>RedNaoGetPostValue('duration')
    );

    if(isset($_POST['html']))
    {
        $params['sessionId']=RedNaoGetPostValue('sessionId');
        $params['url']=RedNaoGetPostValue('url');
        $params['initialProperties']=RedNaoGetPostValue('initialProperties');
        $params['html']=RedNaoGetPostValue('html');

    }

    if(isset($_POST['actions']))
    {
        $params['lastTime']=RedNaoGetPostValue('lastTime');
        $params['actions']=RedNaoGetPostValue('actions');
    }
    saveRecording($params,false);

}


function CompleteRecordings(){
    global $wpdb;
    $wpdb->query('UPDATE '.SMART_SESSION_RECORDING_HEADER.'
                    SET STATUS=\'c\',
                      duration=(
                          SELECT max(last_time) FROM '.SMART_SESSION_RECORDING_DETAIL.'
                          where header_uniq_id='.SMART_SESSION_RECORDING_HEADER.'.uniq_id
                      )
                    where status is null and start_time< UNIX_TIMESTAMP(NOW())*1000-3600000');

    $seconds=intval(get_option('rednao_urfwp_seconds'));
    if($seconds>0)
    {
        $wpdb->query($wpdb->prepare('
            delete header,detail
            from '.SMART_SESSION_RECORDING_HEADER.' header
            left join '.SMART_SESSION_RECORDING_DETAIL.' detail
            on  header.uniq_id=detail.header_uniq_id
            where duration<%s',$seconds*1000
        ));
    }
}

function saveRecording($params,$verifyIfDuplicated){
    global $wpdb;
    $uniqid=$params['uniqid'];
    $duration=$params['duration'];

    if($verifyIfDuplicated)
    {
        global $wpdb;
        $result=$wpdb->get_var($wpdb->prepare("SELECT status FROM ".SMART_SESSION_RECORDING_HEADER.' where uniq_id=%s',$uniqid),'ARRAY_A');
        if($result=='c')
            die();
    }
    if($uniqid=='')
    {
        echo 'UniqID is empty, rejecting save';
        die();
    }
    if(isset($params['html']))
    {
        $values=array();
        $values['uniq_id']=$uniqid;
        $values['session_id']=$params['sessionId'];
        $values['start_time']=round(microtime(true) * 1000);
        $values['url']=$params['url'];
        $values['initial_properties']=$params['initialProperties'];
        $values['html']=$params['html'];
        $values['userid']='';
        if(is_numeric($duration))
        {
            $values['duration'] = $duration;
            $values['status']='c';
        }


        if(is_user_logged_in())
        {
            $current_user = wp_get_current_user();
            $values['userid']=$current_user->user_login;
        }

        if($values['html']==''||$values['initial_properties']=='')
        {
            echo "html and initial properties are empty,rejecting save";
            die();
        }

        $wpdb->insert(SMART_SESSION_RECORDING_HEADER,$values);
        echo $wpdb->last_query;
    }

    if(isset($params['duration'])&&!isset($params['html']))
    {
        if(is_numeric($duration))
        {
            $wpdb->update(SMART_SESSION_RECORDING_HEADER,array('duration'=>$duration,'status'=>'c'),array('uniq_id'=>$uniqid));

        }

    }

    $actions=$params['actions'];
    if(isset($params['actions']))
    {
        $values=array();
        $values['header_uniq_id']=$uniqid;
        $values['last_time']=$params['lastTime'];
        $values['actions']=$params['actions'];
        $wpdb->insert(SMART_SESSION_RECORDING_DETAIL,$values);
    }

    die();
}

function rednao_ssr_get_recordings()
{
    CompleteRecordings();
    $page=RedNaoGetPostValue('page');
    if(!is_numeric($page))
        die();
    $page=intval($page);

    global $wpdb;
    $result=$wpdb->get_results($wpdb->prepare("SELECT uniq_id,start_time,duration,url,header1.session_id,userid FROM 
                                                (select distinct session_id from ".SMART_SESSION_RECORDING_HEADER."                                                    
                                                    order by start_time desc limit %d,40) header1
                                                    join ".SMART_SESSION_RECORDING_HEADER." header2
                                                    on header1.session_id=header2.session_id
                                                    where status='c'
                                                    order by start_time desc",$page*40),'ARRAY_A');
    echo json_encode($result);
    die();
}

function RedNaoGetPostValue($parameterName)
{
    if(isset($_POST[$parameterName]))
        if(is_array(($_POST[$parameterName])))
            return $_POST[$parameterName];
        else
            return stripslashes($_POST[$parameterName]);

    return "";
}


function rednao_ssr_delete_recordings(){
    $type=RedNaoGetPostValue('type');
    $time= strtotime(date("Y-m-d", time()));
    switch ($type){
        case 'a':
            $time='0';
            break;
        case 't':
            $time=$time*1000;
            break;
        case 'w':
            $time=strtotime('-'.date('w', $time).' day',$time)*1000;
            break;
        case 'm':

            $time=strtotime('-'.(date('j', $time)-1).' day',$time)*1000;
            break;
    }

    global $wpdb;
    $wpdb->query($wpdb->prepare('
        delete header,detail
        from '.SMART_SESSION_RECORDING_HEADER.' header
        left join '.SMART_SESSION_RECORDING_DETAIL.' detail
        on  header.uniq_id=detail.header_uniq_id
        where status=\'c\' and (start_time<%s or 0=%s)',$time,$time));

    echo '{"status":"success"}';

    die();

}

function rednao_ssr_update_schedule()
{
    $schedule=RedNaoGetPostValue('schedule');
    $seconds=RedNaoGetPostValue('seconds');

    if($seconds!='')
        update_option('rednao_urfwp_seconds',$seconds);
    if($schedule=='')
        die();

    if(wp_next_scheduled ( 'usfwp_schedule_delete'))
        wp_clear_scheduled_hook('usfwp_schedule_delete');



    if($schedule=='daily'||$schedule=='weekly'||$schedule=='monthly')
    {
        $time= strtotime(date("Y-m-d", time()));
        switch ($schedule){
            case 'daily':
                $time=strtotime('+1 day',$time);
                break;
            case 'weekly':
                $time=strtotime('-'.date('w', $time).' day',$time);
                $time=strtotime('+7 day',$time);
                break;
            case 'monthly':
                $schedule='urfwpmonthly';
                $time=strtotime('-'.(date('j', $time)-1).' day',$time);
                $time=strtotime('+1 month',$time);
                break;
        }


        if (! wp_next_scheduled ( 'usfwp_schedule_delete' )) {
            wp_schedule_event(time(), $schedule, 'usfwp_schedule_delete');
        }
    }

    update_option('rednao_urfwp_schedule',RedNaoGetPostValue('schedule'));

    echo '{"success":"y"}';
    die();

}

function usfwp_schedule_delete_action(){
    $schedule=get_option('rednao_urfwp_schedule');
    if($schedule!='daily'&&$schedule!='weekly'&&$schedule!='monthly')
        return;

    $time= strtotime(date("Y-m-d", time()));
    switch ($schedule){
        case 'daily':
            $time=$time*1000;
            break;
        case 'weekly':
            $time=strtotime('-7 day',$time)*1000;
            break;
        case 'monthly':
            $time=strtotime('-31'.' day',$time)*1000;
            break;
    }

    global $wpdb;
    $wpdb->query($wpdb->prepare('
        delete header,detail
        from '.SMART_SESSION_RECORDING_HEADER.' header
        left join '.SMART_SESSION_RECORDING_DETAIL.' detail
        on  header.uniq_id=detail.header_uniq_id
        where start_time<%s',$time));

    $wpdb->query('
        delete header,detail
        from '.SMART_SESSION_RECORDING_DETAIL.' detail
        left join '.SMART_SESSION_RECORDING_HEADER.' header
        on  header.uniq_id=detail.header_uniq_id
        where uniq_id is null');
}