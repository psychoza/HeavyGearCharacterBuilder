<?php
$fileData = $_POST['fileData'];
$fileName = $_POST['fileName'];

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$fileHandle = fopen("/var/tmp/web/CE_".$fileName, 'w+');
fwrite($fileHandle,$fileData);
http_response_code(200);
