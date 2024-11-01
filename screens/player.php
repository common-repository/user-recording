<div>
    <div id="ssrLoadingScreen" style="position: absolute;width:100%;height: 100%;z-index: 10000;background-color: white;display:flex;justify-content: center;align-items: center; min-height: 400px;">
        <img src="<?php echo SMART_SESSION_RECORDING_URL?>/img/loading.gif">
    </div>
<div id="smart-session-recording-id"></div>
</div>
<?php

wp_enqueue_script('jquery');
wp_enqueue_script('smart-session-recorder-velocity',SMART_SESSION_RECORDING_URL."js/lib/velocity.min.js",array("jquery"));
wp_enqueue_script('smart-session-recorder-react-player', SMART_SESSION_RECORDING_URL.'js/Bundle/reactplayer_bundle.js', array('jquery'), '', null, false);
wp_enqueue_style('smart-session-recorder-bootstrap',SMART_SESSION_RECORDING_URL.'js/lib/bootstrap/css/bootstrap.css');
wp_enqueue_style('smart-session-recorder-recording',SMART_SESSION_RECORDING_URL.'css/recording.css');
wp_enqueue_style('smart-session-recorder-bootstrap-theme',SMART_SESSION_RECORDING_URL.'js/lib/bootstrap/css/bootstrap-theme.css');
$params = array('Params',
    'ajaxurl'=>admin_url('admin-ajax.php'),
    'siteurl'=>get_site_url(),
    'pluginUrl'=>SMART_SESSION_RECORDING_URL
);

wp_localize_script('smart-session-recorder-react-player','smartformsrecordingparams',$params);