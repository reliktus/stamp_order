<?php
$to = "reliktus@gmail.com";
$subject = "Zamowienie pieczatki";

$message = $_POST['mytext1'];

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: multixero@gmail.com' . "\r\n";


mail($to,$subject,$message,$headers);
echo('Mail send');
?>