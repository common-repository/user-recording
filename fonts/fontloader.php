<?php
header("Access-Control-Allow-Origin: *");
if(!isset($_GET['font']))
    exit;

$font=$_GET['font'];

if($font=='glyphicons-woff2')
    echo file_get_contents('glyphicons/glyphicons-halflings-regular.woff2');

if($font=='glyphicons-eot')
    echo file_get_contents('glyphicons/glyphicons-halflings-regular.eot');

if($font=='glyphicons-woff')
    echo file_get_contents('glyphicons/glyphicons-halflings-regular.woff');

if($font=='glyphicons-ttf')
    echo file_get_contents('glyphicons/glyphicons-halflings-regular.ttf');

if($font=='glyphicons-svg')
    echo file_get_contents('glyphicons/glyphicons-halflings-regular.svg');


if($font=='fontawesome-woff2')
    echo file_get_contents('fontawesome/fontawesome-webfont.woff2');

if($font=='fontawesome-eot')
    echo file_get_contents('fontawesome/fontawesome-webfont.eot');

if($font=='fontawesome-woff')
    echo file_get_contents('fontawesome/fontawesome-webfont.woff');

if($font=='fontawesome-ttf')
    echo file_get_contents('fontawesome/fontawesome-webfont.ttf');

if($font=='fontawesome-svg')
    echo file_get_contents('fontawesome/fontawesome-webfont.svg');
