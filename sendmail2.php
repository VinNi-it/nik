<?php
    $to = "vniks1976@gmail.com";
    $email = htmlspecialchars($_POST['email']);


    $msg = "Сообщение отправлено <b>".$_POST['name']."</b>.<br><b>Текст сообщения: </b><br>".$_POST['message']."<br><br>с почты".$_POST['email']."<br><br>концовка";
    $subject = "=?utf-8?B?".base64_encode("Сообщение с сайта VinNi")."?=";
    $headers = "From: $email\r\nReply-to: $email\r\nContent-type: text/html; charset=utf-8\r\n";
    $success = mail($to, $subject, $msg, $headers);
    echo $success;
?>

