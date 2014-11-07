<?php
$isAlive = ["isAlive"=>"true"];
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
echo $_GET['callback'] . "(" . json_encode($isAlive) . ")";