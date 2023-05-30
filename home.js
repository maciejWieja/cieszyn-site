const opinions = document.querySelectorAll('.opinion');
const contents = document.querySelectorAll('.content');
const loader = document.querySelector('.loader');
const body = document.querySelector('body');

const gptURL = 'https://api.openai.com/v1/chat/completions';
const openaiKey = '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';

const getOpinion = async () => {
  const response = await fetch(gptURL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${openaiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: 'Napisz krótką opinię o mieście cieszyn!' },
      ],
    }),
  });
  const data = await response.json();
  return data;
};

const writeOpinions = async () => {
  for (let i = 0; i < 3; i++) {
    try {
      const response = await getOpinion();
      opinions[i].innerHTML = response.data.choices[0].message.content;
    } catch (err) {
      console.log(`Wystąpił błąd:
        ${err}
      `);
    }
  }

  changeUIafterLoad();
};

const changeUIafterLoad = () => {
  loader.style.display = 'none';
  opinions[0].classList.add('firstOpinion');
  opinions[1].classList.add('secondOpinion');
  opinions[2].classList.add('lastOpinion');
  document.querySelectorAll('.bottom').forEach((e) => {
    e.classList.add('bottomAnimation');
  });
  document.querySelector('.navbar').classList.add('animateNavbar');
  document.querySelector('.logo').classList.add('animateLogo');
  document
    .querySelector('.secondOpinion')
    .addEventListener('animationend', () => {
      document.querySelector('body').style.overflowY = 'visible';
    });
};

scrollTo(0, 0);
writeOpinions();
