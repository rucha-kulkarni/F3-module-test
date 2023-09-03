// Your NASA API key (get this from the NASA API website)
const apiKey = '0v3XN8XZpINpBD81ufBX0SzmnB0PPlNXlRS9JGNq';

// Function to fetch the current image of the day
async function getCurrentImageOfTheDay() {
    try {
        const currentDate = new Date().toISOString().split("T")[0];
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`);
        const data = await response.json();
        displayImageData(data);
    } catch (error) {
        console.error('Error fetching current image:', error);
    }
}

// Function to fetch and display the image of the day for a selected date
async function getImageOfTheDay(date) {
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
        const data = await response.json();
        saveSearch(date);
        displayImageData(data);
        updatePageHeading(date);
    } catch (error) {
        console.error('Error fetching image:', error);
    }
}

// Function to save a search date to local storage
function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
    addSearchToHistory();
}

// Function to add search history to the UI
function addSearchToHistory() {
    const searchHistory = JSON.parse(localStorage.getItem('searches')) || [];
    const historyList = document.getElementById('search-history');
    historyList.innerHTML = '';

    searchHistory.forEach(date => {
        const listItem = document.createElement('li');
        listItem.textContent = date;
        listItem.addEventListener('click', () => {
            getImageOfTheDay(date)
            }
            );
        historyList.appendChild(listItem);
    });
}

// Function to display image data in the current image container
function displayImageData(data) {
    const currentImageContainer = document.getElementById('current-image-container');
    currentImageContainer.innerHTML = `
        <img src="${data.url}" alt="${data.title}">
        <h2>${data.title}</h2>
        <p>${data.explanation}</p>
    `;
}

// Event listener for the search form submission
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const selectedDate = document.getElementById('search-input').value;
    getImageOfTheDay(selectedDate);
});

function updatePageHeading(date) {
    const pageHeading = document.getElementById('heading');
    pageHeading.textContent = `Picture on ${date}`;
}

// Load the current image of the day when the page loads
getCurrentImageOfTheDay();

// Load and display search history from local storage
addSearchToHistory();
