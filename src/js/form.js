function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const form = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const info = document.querySelector('.info');
const successMessage = document.querySelector('.success-message');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
 
  if (!name || !email || !message) {
    nameInput.classList.add('plase_color');
    emailInput.classList.add('plase_color');
    messageInput.classList.add('plase_color');
    return;
  }

  if (!isValidEmail(email)) {
    info.style.opacity = 1
    info.innerHTML = 'Please enter a valid email address.';
    return;
  }


  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        info.style.opacity = 1;
        // info.innerHTML = 'The message has been sent.';
        nameInput.classList.remove('plase_color');
        emailInput.classList.remove('plase_color');
        messageInput.classList.remove('plase_color');
        successMessage.style.display = 'block';
        setTimeout(function() {
          info.style.opacity = 0;
          successMessage.style.display = 'none';
        }, 2500);
      } else {
        info.style.opacity = 1;
        info.innerHTML = 'An error occurred while sending a message.';
      }
    }
  };
  xhr.open('POST', 'php/index.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  let formData = `name=${name}&email=${email}&message=${message}`;
  xhr.send(formData);
  form.reset();
});

