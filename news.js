const cardsContainer = document.querySelector('.cards')
const msgInfo = document.querySelector('.msgInfo')
const mainContainer = document.querySelector('.mainContainer')
const modalBackground = document.querySelector('.modalBackground')
const closeBtn = document.querySelector('.closeBtn')
const modalTitle = document.querySelector('#modalTitle')
const modalDate = document.querySelector('#modalDate')
const modalContentText = document.querySelector('#modalContentText')
const modalImg = document.querySelector('#modalImg')
const modalAlt = document.querySelector('#modalAlt')
const modalFigure = document.querySelector('#modalFigure')
const gridContent = document.querySelector('.gridContent')
const modalContent = document.querySelector('.modalContent')

const datoURL = 'https://graphql.datocms.com/'
const DATO_TOKEN = 'b6fcb659a85d87c7444991a4ed5ec6'
const query = `
{
    allArticles {
      title
      shortDescription
      content
      date
      image {
        url
        alt
      }
    }
  }
  `
  
let numberOfNews = 0
const news = []
  
const getNews = () => {
  fetch(datoURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${DATO_TOKEN}`,
    },
    body: JSON.stringify({
      query
    })
  })
  .then(res => res.json())
  .then(({data : {allArticles}}) => {
    news.push(...allArticles)
    writeNews()
  })
  .catch(showErrorMsg)
}

const showErrorMsg = () => {
  msgInfo.innerHTML = 'Przepraszamy, wystąpił błąd podczas ładowania aktualności. Prosimy spróbować ponownie później lub skontaktować się z naszym zespołem wsparcia technicznego. Pracujemy nad rozwiązaniem tego problemu. Przepraszamy za wszelkie niedogodności.'
  msgInfo.classList.remove('animateLoading')
  msgInfo.classList.add('error')
}

const writeNews = () => {
  const newsToWrite = news.slice(numberOfNews, numberOfNews + 6)
  const fragment = document.createDocumentFragment()
  newsToWrite.forEach(({ image, title, date, shortDescription }) => {
    const container = document.createElement('div')
    const index = numberOfNews
    container.addEventListener('click', () => openModal(index))
    container.className = 'card'
    container.innerHTML = ` 
      <div class="cardContent ${image ? '' : 'cardContentWithoutImg'}">
        ${image ? `<img src="${image.url}" alt="${image.alt}">` : ''}
        <div class="info">
          <h2>${title}</h2>
          <p>${date}</p>
        </div>
        <p>${shortDescription}</p>
      </div>
    `
    fragment.appendChild(container)
    numberOfNews++
  })
  if (numberOfNews < news.length) {
    if (!document.querySelector('.loadMoreBtn')) {
      const button = document.createElement('button')
      button.className = 'loadMoreBtn'
      button.innerHTML = 'Załaduj więcej'
      button.addEventListener('click', writeNews)
      mainContainer.appendChild(button)
    }
  } else {
    document.querySelector('.loadMoreBtn').remove()
  }
  msgInfo.style.display = 'none'
  cardsContainer.appendChild(fragment)
}

const openModal = index => {
  const { title, content, date, image } = news[index]
  if (image) {
    modalFigure.style.display = 'block'
    gridContent.style.gridTemplateColumns = '1fr 1fr'
    modalImg.setAttribute('src', image.url)
    modalImg.setAttribute('alt', image.alt)
    modalAlt.innerHTML = image.alt
  } else {
    modalFigure.style.display = 'none'
    gridContent.style.gridTemplateColumns = '1fr'
  }
  modalTitle.innerHTML = title
  modalDate.innerHTML = date
  modalContentText.innerHTML = content
  modalBackground.classList.add('active')
  modalContent.classList.add('active')
}

const closeModal = () => {
  modalBackground.classList.remove('active')
  modalContent.classList.remove('active')
}

getNews()

closeBtn.addEventListener('click', closeModal)
modalBackground.addEventListener('click', (e) => {
  if(e.target == modalBackground) {
    closeModal()
  } 
})