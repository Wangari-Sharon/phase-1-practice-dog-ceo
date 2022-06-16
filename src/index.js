console.log('%c HI', 'color: firebrick')

const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const getBreedDropdown = document.getElementById('breed-dropdown');
let allBreeds;


function getDog(url) {
  const dogImageContainer = document.getElementById('dog-image-container');
  const image = document.createElement('img');
  image.src = url;
  dogImageContainer.appendChild(image);
}

function getBreed(dogBreed) {
  const breedList = document.getElementById('dog-breeds');
  const breed = document.createElement('li');
  breed.innerText = dogBreed;
  breed.addEventListener('click', (e) => {
    e.target.style.color = 'red';
  })
  breedList.appendChild(breed);
}

function fetchAllImageUrl() {
  fetch(imgUrl)
  .then(res => res.json())
  .then(data => {
    for (let imageUrl of data.message) {
      getDog(imageUrl);
    }
  })
}

function fetchAllBreedUrl() {
  fetch(breedUrl)
  .then(res => res.json())
  .then(data => {
    allBreeds = Object.keys(data.message);
    for (let breed of allBreeds) {
      getBreed(breed);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  fetchAllImageUrl()
  fetchAllBreedUrl()
});

getBreedDropdown.addEventListener('change', e => {
  const dropDownValue = e.target.value;
  const breedContainer = document.getElementById('dog-breeds');
  breedContainer.innerHTML = '';
  const filterBreeds = allBreeds.filter(breed => breed[0] === dropDownValue);
  for (let breed of filterBreeds) {
    getBreed(breed)
  }
}) 