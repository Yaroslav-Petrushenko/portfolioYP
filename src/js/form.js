function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const form = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const info = document.querySelector('.info');


form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !email || !message) {
    nameInput.classList.add('plase_color')
    emailInput.classList.add('plase_color')
    messageInput.classList.add('plase_color')
    // alert('Будь ласка, заповніть усі поля.');
    return;
  }

  if (!isValidEmail(email)) {
    alert('Будь ласка, введіть коректну адресу електронної пошти.');
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        info.style.opacity = 1
        // alert('Повідомлення надіслано. Дякуємо!');
        nameInput.classList.remove('plase_color')
        emailInput.classList.remove('plase_color')
        messageInput.classList.remove('plase_color')
      } else {
        alert('Виникла помилка під час відправки повідомлення.');
      }
    }
  };
  xhr.open('POST', 'php/index.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  let formData = `name=${name}&email=${email}&message=${message}`;
  xhr.send(formData);
});
