<?php
$a=1;
$content=file_get_contents('php://input');
parse_str($content,$params);
foreach($params as $key=>$value)
{
    $params[$key]=stripslashes($value);
}
require_once('smart-session-recording-ajax.php');

saveRecording($params,true);