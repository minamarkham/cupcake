<?php session_start();

if(!$_POST) exit;

$verify   	= trim($_POST['verify']);
$verify   	= md5($verify);
$session = $_SESSION['verify'];

if($session != $verify) exit;

echo 'success';
exit;
