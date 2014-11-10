<?php
$fileName = basename($_GET["fileName"]);
$fileData = file_get_contents("/var/tmp/web/CE_".$fileName);

header('Content-type: text/plain');
header('Content-Disposition: attachment; filename="'.basename($fileName).'"');
header('Connection: Keep-Alive');
header('Expires: 0');
header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
header('Pragma: public');
header('Content-Length: ' . mb_strlen($fileData));

echo $fileData;