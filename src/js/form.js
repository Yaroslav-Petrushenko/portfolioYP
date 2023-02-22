// Отримуємо форму та її елементи
const form = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

// Додаємо подію submit до форми
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Зупиняємо стандартну поведінку форми

  // Створюємо новий об'єкт FormData для збереження даних форми
  const formData = new FormData();
  formData.append('name', nameInput.value);
  formData.append('email', emailInput.value);
  formData.append('message', messageInput.value);

  // Відправляємо дані форми за допомогою AJAX
  const xhr = new XMLHttpRequest();
  xhr.open('POST', './php/index.php');
  xhr.onload = function() {
    if (xhr.status === 200) {
      alert('Повідомлення надіслано. Дякуємо!');
    } else {
      alert('Виникла помилка під час відправки повідомлення.');
    }
  };
  xhr.send(formData);
});

