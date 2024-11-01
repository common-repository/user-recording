<?php
wp_enqueue_script('jquery');
wp_enqueue_script('smart-session-recorder-settings', SMART_SESSION_RECORDING_URL.'js/Bundle/settings_bundle.js', array('jquery'), '', null, false);
wp_enqueue_style('urfwp-bootstrap',SMART_SESSION_RECORDING_URL.'js/lib/bootstrap/css/bootstrap.css');
wp_enqueue_style('urfwp-bootstrap-theme',SMART_SESSION_RECORDING_URL.'js/lib/bootstrap/css/bootstrap-theme.css');

$seconds=get_option('rednao_urfwp_seconds');
if($seconds==false)
    $seconds=0;
$params = array('Params',
    'ajaxurl'=>admin_url('admin-ajax.php'),
    'siteurl'=>get_site_url(),
    'pluginUrl'=>SMART_SESSION_RECORDING_URL,
    'currentSchedule'=>get_option('rednao_urfwp_schedule'),
    'seconds'=>$seconds
);

wp_localize_script('smart-session-recorder-settings','smartformsrecordingparams',$params);

?>

<div id="srfwp-settings"></div>