<?php
session_start();
$info = '';

if (isset($_POST['submit'])) {
    // Отримуємо дані з форми
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    // Перевіряємо валідність email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $info = "Неправильний формат електронної пошти";
        exit();
    }
    
    // Перевіряємо ліміт повідомлень
    if (!isset($_SESSION['message_count'])) {
        $_SESSION['message_count'] = 0;
    }
    if ($_SESSION['message_count'] >= 5) {
        $info = "Досягнуто ліміт відправки повідомлень";
        exit();
    }
    
    // Встановлюємо email отримувача
    $to_email = "igorovica@gmail.com";

    // Встановлюємо тему та вміст повідомлення
    $subject = "Нове повідомлення від $name";
    $body = "Ім'я: $name\nEmail: $email\n\nПовідомлення:\n$message";

    // Відправляємо email
    $headers = "From: $email";
    mail($to_email, $subject, $body, $headers);

    // Збільшуємо лічильник повідомлень
    $_SESSION['message_count']++;

    // Повертаємо користувача на поточну сторінку
    header('Location: ' . $_SERVER['REQUEST_URI']);
    exit();
}
?>
