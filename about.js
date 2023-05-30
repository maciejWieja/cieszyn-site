const headers = document.querySelectorAll('.header');
const yellowDot = document.querySelectorAll('.yellowDot');
const blueDot = document.querySelectorAll('.blueDot');

const headerTexts = ['o mieście', 'atrakcje turystyczne', 'rekreacja i przyroda', 'gastronomia i kuchnia regionalna'];

const addLetter = (element, text) => {
  const arrText = text.split('');
  let index = -1;
  const intervalId = setInterval(() => {
    index++;
    element.innerHTML += arrText[index];
    if (index === arrText.length - 1) {
      AnimateDot(element);
      clearInterval(intervalId);
    }
  }, 50);
};

const AnimateDot = (dot) => {
  switch (dot.id) {
    case 'firstHeader':
      yellowDot[0].classList.add('animateDot');
      break;
    case 'secondHeader':
      blueDot[0].classList.add('animateDot');
      break;
    case 'thirdHeader':
      yellowDot[1].classList.add('animateDot')
      break;
    case 'fourthHeader':
      blueDot[1].classList.add('animateDot');
      break;
  }
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const { target } = entry;
      switch (target.id) {
        case 'firstHeader':
          addLetter(target, headerTexts[0]);
          break;
        case 'secondHeader':
          addLetter(target, headerTexts[1]);
          break;
        case 'thirdHeader':
          addLetter(target, headerTexts[2]);
          break;
        case 'fourthHeader':
          addLetter(target, headerTexts[3]);
          break;
      }
      observer.unobserve(target);
    }
  });
});

headers.forEach((header) => observer.observe(header));
