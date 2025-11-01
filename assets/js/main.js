//updatae ofline vs online
function updateStatus() {
  const statusIndicator = document.getElementById('status-indicator');

  if (navigator.onLine) {
    statusIndicator.classList.remove('offline');
    statusIndicator.classList.add('online');
  } else {
    statusIndicator.classList.remove('online');
    statusIndicator.classList.add('offline');
  }
}

updateStatus();

window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);

///burger menu
const container = document.querySelector('.container'); 
const burger = document.getElementById('burger');
const burgerIcon = document.getElementById('burgerIcon');

const staticMenu = document.getElementById('menuWindow');
const popupMenu = staticMenu.cloneNode(true);
popupMenu.classList.add('popup');
popupMenu.removeAttribute('id'); 

container.appendChild(popupMenu);

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  popupMenu.classList.toggle('active');

  if (burger.classList.contains('active')) {
    burgerIcon.src = "assets/images/ui/close.png";
  } else {
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


//towns-slider
const track = document.querySelector('.quiz-town-connetn');
const prev = document.querySelector('.arrow-left');
const next = document.querySelector('.quiz-arrow-right');
const totalItems = track.children.length;

let rows = 2;
let columnsPerPage = 4;
let currentPage = 0;

function getSettings() {
  if (window.innerWidth <= 768) {
    columnsPerPage = 2;
  } else {
    columnsPerPage = 4;
  }
}

function updateSlider() {
  getSettings();

  const firstItem = track.querySelector('div');
  if (!firstItem) return;

  const style = getComputedStyle(track);
  const gap = parseFloat(style.getPropertyValue('gap')) || 10;
  const colWidth = firstItem.offsetWidth;
  const movePerColumn = colWidth + gap;

  const totalColumns = Math.ceil(totalItems / rows);
  const totalPages = Math.ceil(totalColumns / columnsPerPage);

  if (currentPage >= totalPages) currentPage = totalPages - 1;

  const offset = currentPage * columnsPerPage * movePerColumn;
  track.style.transform = `translateX(-${offset}px)`;


  if (currentPage === 0) {
    prev.style.visibility = 'hidden';
  } else {
    prev.style.visibility = 'visible';
  }

  if (currentPage >= totalPages - 1) {
    next.style.visibility = 'hidden';
  } else {
    next.style.visibility = 'visible';
  }
}

prev.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    updateSlider();
  }
});

next.addEventListener('click', () => {
  const totalColumns = Math.ceil(totalItems / rows);
  const totalPages = Math.ceil(totalColumns / columnsPerPage);
  if (currentPage < totalPages - 1) {
    currentPage++;
    updateSlider();
  }
});

window.addEventListener('load', updateSlider);
window.addEventListener('resize', updateSlider);


// quiz
document.addEventListener("DOMContentLoaded", function () {
  function extractStepNumberFromClasses(element) {
    for (const className of Array.from(element.classList)) {
      const match = className.match(/^quiz(\d+)$/);
      if (match) return parseInt(match[1], 10);
    }
    return null;
  }

  const allCandidates = Array.from(document.querySelectorAll("[class^='quiz']"));
  let quizBlocks = allCandidates
    .map(el => ({ el, step: extractStepNumberFromClasses(el) }))
    .filter(item => item.step !== null)
    .sort((a, b) => a.step - b.step)
    .map(item => item.el);

  if (quizBlocks.length === 0) {
    quizBlocks = allCandidates;
  }

  let currentQuiz = 0;
  const answers = {};

  const form = document.getElementById("estimateForm");
  if (form) form.style.display = "none";

  function stepContainsForm(stepEl) {
    if (!stepEl) return false;
    return !!stepEl.querySelector && !!stepEl.querySelector("#estimateForm");
  }

  quizBlocks.forEach((block, i) => {
    block.style.display = i === 0 ? "block" : "none";
  });

  document.querySelectorAll(".quiz-option").forEach(option => {
    option.addEventListener("click", () => {

      function findQuizContainer(node) {
        let current = node.closest("[class^='quiz']");
        while (current && current !== document.body) {
          const hasNumberedClass = Array.from(current.classList).some(c => /^quiz\d+$/.test(c));
          if (hasNumberedClass) return current;
          current = current.parentElement;
        }
        return node.closest("[class^='quiz']");
      }

      const quizBlock = findQuizContainer(option);

      const quizIndex = quizBlocks.indexOf(quizBlock);
      const question = quizBlock.querySelector("h3")?.textContent.trim();
      const answer = option.nextElementSibling?.textContent.trim();

      if (question && answer) answers[question] = answer;

      if (quizIndex >= 0) {
        quizBlocks[quizIndex].style.display = "none";
      }

      if (quizIndex >= 0 && quizBlocks[quizIndex + 1]) {
        const nextStep = quizBlocks[quizIndex + 1];
        nextStep.style.display = "block";
        if (form && stepContainsForm(nextStep)) form.style.display = "block";
        currentQuiz = quizIndex + 1;
      } else {
        if (form) form.style.display = "block";
      }
    });
  });

  document.querySelectorAll(".quiz-town-connetn > div").forEach(townItem => {
    townItem.addEventListener("click", () => {
      function findQuizContainer(node) {
        let current = node.closest("[class^='quiz']");
        while (current && current !== document.body) {
          const hasNumberedClass = Array.from(current.classList).some(c => /^quiz\d+$/.test(c));
          if (hasNumberedClass) return current;
          current = current.parentElement;
        }
        return node.closest("[class^='quiz']");
      }

      const quizBlock = findQuizContainer(townItem);
      const quizIndex = quizBlocks.indexOf(quizBlock);
      const question = quizBlock.querySelector("h3")?.textContent.trim();
      const answer = townItem.textContent.trim();

      if (question && answer) answers[question] = answer;

      if (quizIndex >= 0) {
        quizBlocks[quizIndex].style.display = "none";
      }

      if (quizIndex >= 0 && quizBlocks[quizIndex + 1]) {
        const nextStep = quizBlocks[quizIndex + 1];
        nextStep.style.display = "block";
        if (form && stepContainsForm(nextStep)) form.style.display = "block";
        currentQuiz = quizIndex + 1;
      } else {
        if (form) form.style.display = "block";
      }
    });
  });

  document.querySelectorAll(".quiz-prev").forEach(button => {
    button.addEventListener("click", () => {
      if (currentQuiz > 0) {
        quizBlocks[currentQuiz].style.display = "none";
        quizBlocks[currentQuiz - 1].style.display = "block";
        currentQuiz--;
      }
    });
  });


  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const message = form.querySelector("textarea")?.value.trim() || "";
      answers["Дополнительная информация"] = message || "—";

      const phoneNumber = "79237167543";
      let text = "Здравствуйте! Хочу получить расчет стоимости.%0A";
      for (const [question, answer] of Object.entries(answers)) {
        text += `*${question}:* ${answer}%0A`;
      }

      const url = `https://wa.me/${phoneNumber}?text=${text}`;
      window.open(url, "_blank");

      form.style.display = "none";
      const overlay = document.getElementById("popupOverlay");
      if (overlay) overlay.style.display = "flex";
    });
  }


  const closePopupBtn = document.getElementById("closePopup");
  if (closePopupBtn) {
    closePopupBtn.addEventListener("click", () => {
      const overlay = document.getElementById("popupOverlay");
      if (overlay) overlay.style.display = "none";
      if (form) form.style.display = "block";
    });
  }


  const backToQuizBtn = document.getElementById("backToQuiz");
  if (backToQuizBtn) {
    backToQuizBtn.addEventListener("click", () => {
      const overlay = document.getElementById("popupOverlay");
      if (overlay) overlay.style.display = "none";
      currentQuiz = 0;
      quizBlocks.forEach((block, i) => {
        block.style.display = i === 0 ? "block" : "none";
      });
      if (form) form.style.display = "none";
    });
  }
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