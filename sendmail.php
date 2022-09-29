<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;
  
  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru','phpmailer/language/');
  $mail->IsHTML(true);

  //от кого письмо
  $mail->setFrom('info@ukr.net', 'фрилансер');
  //кому отправить
  $mail->addAddress('vniks1976@gmail.com');
  //тема письма
  $mail->Subject = 'Привет';

  //рука
  $hand = 'правая';
  if($_POST['hand'] == "left"){
    $hand = "левая";
  }

//тело письма
$body = '<h1>Вам письмо!</h1>';

if(trim(!empty($_POST['name']))){
  $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))){
  $body.='<p><strong>Email:</strong> '.$_POST['email'].'</p>';
}

if(trim(!empty($_POST['message']))){
  $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
}

$mail->Body = $body;
//отправляем
if(!$mail->send()) {
  $message = 'Ошибка';
} else {
  $message = 'Данные отправлены';
}

$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);

?>