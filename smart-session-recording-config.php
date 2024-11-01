<?php
define('SMART_SESSION_RECORDING_PLUGIN_NAME',dirname(plugin_basename(__FILE__)));
define('SMART_SESSION_RECORDING_DIR',WP_PLUGIN_DIR.'/'.SMART_SESSION_RECORDING_PLUGIN_NAME);
define('SMART_SESSION_RECORDING_URL', plugin_dir_url(__FILE__));
define('SMART_SESSION_RECORDING_LATEST_DB_VERSION',12);

define('SMART_SESSION_RECORDING_HEADER',$wpdb->prefix .'smart_session_recording_header');
define('SMART_SESSION_RECORDING_DETAIL',$wpdb->prefix .'smart_session_recording_detail');