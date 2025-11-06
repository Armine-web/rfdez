// menu popap
const burger = document.getElementById('burger');
const burgerIcon = document.getElementById('burgerIcon');
const menuPopap = document.getElementById('menuPopap');


if (menuPopap) {
  menuPopap.classList.remove('active');
  menuPopap.style.display = 'none';
}


burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  menuPopap.classList.toggle('active');

  if (menuPopap.classList.contains('active')) {
    menuPopap.style.display = 'block';
    burgerIcon.src = "assets/images/ui/close.png";
  } else {
    menuPopap.style.display = 'none';
    burgerIcon.src = "assets/images/ui/burger-menu.png";
  }
});


//more services

document.querySelectorAll('.service-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    this.parentElement.classList.toggle('active');
  });
});


//contact-form
const form = document.getElementById('contactForm');
const popup = document.getElementById('popup');

if (popup) popup.style.display = 'none';

const closeContactPopup = popup ? popup.querySelector('#closePopup') : null;

form.addEventListener('submit', async function (e) {
  e.preventDefault();


  const formData = new FormData(form);
  let plainText = 'Заявка с контактной формы\n';
  for (const [key, value] of formData.entries()) {
    plainText += `${key}: ${value}\n`;
  }


  try {
    const resp = await fetch('https://formsubmit.co/ajax/rfdezru@yandex.ru', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: 'Новая заявка с контактной формы',
        message: plainText
      })
    });
    if (!resp.ok) throw new Error('Email send failed');
  } catch (err) {
    console.error(err);
    alert('Не удалось отправить заявку. Попробуйте позже.');
    return;
  }


  if (popup) popup.style.display = 'flex';
  form.reset();
});

if (closeContactPopup) {
  closeContactPopup.addEventListener('click', () => popup && (popup.style.display = 'none'));
}
window.addEventListener('click', (e) => {
  if (e.target === popup) popup.style.display = 'none';
});


//scroll effects
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".dezinfekciya-item");

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); 
        }
      });
    }, {
      threshold: 0.2 
    });

    items.forEach(item => observer.observe(item));
  });