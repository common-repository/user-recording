<?php
$allowPublicView=false;
$allowPublicView=apply_filters('user_recording_for_wordpress_allow_public_view',$allowPublicView);
if ( !current_user_can('manage_options')&&!$allowPublicView)
    die();


include_once (SMART_SESSION_RECORDING_DIR.'/lib/LZString/LZString.php');
$id=get_query_var('smart_session_recording_id')?get_query_var('smart_session_recording_id'):"";
if($id==""&&isset($_GET["smart_session_recording_id"]))
    $id=$_GET["smart_session_recording_id"];
if($id==''||$id==null)
    die();

header('X-XSS-Protection',0);

global $wpdb;
$siteUrl=SMART_SESSION_RECORDING_URL.'/fonts/fontloader.php';
$result=$wpdb->get_results($wpdb->prepare("SELECT initial_properties,html FROM ".SMART_SESSION_RECORDING_HEADER.' where uniq_id=%s',$id),'ARRAY_A');

if(count($result)==0)
    die();
$html=LZString::decompressFromBase64($result[0]['html']);
$initial_properties=$result[0]['initial_properties'];

$result=$wpdb->get_results($wpdb->prepare("SELECT actions FROM ".SMART_SESSION_RECORDING_DETAIL.' where header_uniq_id=%s',$id),'ARRAY_A');
$actions='[';
for($i=0;$i<count($result);$i++)
{
        $actions.=($i>0?",":"").$result[$i]['actions'];
}
$actions.=']';
$fonts="
<style type=\"text/css\">
@font-face {
  font-family: 'Glyphicons Halflings';
  src: url('".$siteUrl."?font=glyphicons-eot');
  src: url('".$siteUrl."?smart_session_recording_font?#iefix&font=glyphicons-eot') format('embedded-opentype'), url('".$siteUrl."?font=glyphicons-woff2') format('woff2'), url('".$siteUrl."?font=glyphicons-woff') format('woff'), url('".$siteUrl."?font=glyphicons-ttf') format('truetype'), url('".$siteUrl."?#glyphicons_halflingsregular&font=glyphicons-svg') format('svg');
}

@font-face {
  font-family: 'FontAwesome';
  src: url('".$siteUrl."?font=fontawesome-eot&v=4.7.0');
  src: url('".$siteUrl."?#iefix&font=fontawesome-eot&&v=4.7.0') format('embedded-opentype'), url('".$siteUrl."?font=fontawesome-woff2&v=4.7.0') format('woff2'), url('".$siteUrl."?font=fontawesome-woff&v=4.7.0') format('woff'), url('".$siteUrl."?font=fontawesome-ttf&v=4.7.0') format('truetype'), url('".$siteUrl."?#fontawesomeregular&font=fontawesome-svg&v=4.7.0') format('svg');
  font-weight: normal;
  font-style: normal;
}
</style>
";
$script="<script type='text/javascript'>var smartSessionRecordingInitialProperties=$initial_properties; var smartSessionRecordingActions=$actions;var smartSessionRootUrl='".SMART_SESSION_RECORDING_URL."';</script><script type='text/javascript' src='".SMART_SESSION_RECORDING_URL."js/lib/velocity.min.js'></script><script type='text/javascript' src='".SMART_SESSION_RECORDING_URL."js/Bundle/player_bundle.js'></script>";
$html=preg_replace("/<script.*js\/Bundle\/recorder_(public_)?bundle.js[^>]*>(\<\/script>)?/",$script.$fonts,$html);
echo $html;



?>