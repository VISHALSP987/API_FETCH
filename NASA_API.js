const API_URL = "https://images-api.nasa.gov";
const API_KEY = "NoueHJTQTwshAs5vzTRMQE7NH4LADTkjR7MkV3M6";

const SearchInput = document.getElementById("search-input");
const SearchButton = document.getElementById("search-button");
const Data = document.getElementById("data");

// Check if there are stored search results when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const storedSearchResults = sessionStorage.getItem('searchResults');
    if (storedSearchResults) {
        displayStoredResults(JSON.parse(storedSearchResults));
    }
});

SearchButton.addEventListener('click', (event) => {
    event.preventDefault();
    //extracting the search term
    const SearchText = SearchInput.value.trim();
    //Fetch operation
    if (SearchText !== "") {
        const fetchURL = `${API_URL}/search?q=${SearchText}`;
        fetchData(fetchURL);
    } else {
        Data.style.display = "none";
    }
});

// Fetch function
async function fetchData(searchQuery) {
    try {
        const response = await fetch(searchQuery);
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        console.log(data);
        Data.style.display = "flex";
        // Store the search results in sessionStorage
        sessionStorage.setItem('searchResults', JSON.stringify(data.collection.items));
        displayData(data.collection.items);
    } catch (error) {
        console.error('Error fetching data: ', error);
        Data.innerHTML = "<h1>Error fetching data. Please check your internet connection.</h1>"
        Data.style.display = "flex";
        Data.style.color = "red";
    }
}

// Display function
function displayData(items) {
    Data.innerHTML = "<h1>Search results...<h1>";
    for (let i = 0; i < items.length; i += 2) {
        const row = document.createElement("div");
        row.classList.add("row");

        for (let j = i; j < i + 2 && j < items.length; j++) {
            const item = items[j];
            const imageURL = item.links ? item.links[0].href : "";
            const title = item.data ? item.data[0].title : "Unknown";
            const description = item.data ? item.data[0].description_508 : "Unknown";

            const div = document.createElement("div");
            div.classList.add("image-item");

            const image = document.createElement("img");
            image.classList.add("img");
            image.src = imageURL;
            image.alt = "image";

            const detailsButton = document.createElement("button");
            detailsButton.classList.add("btn");
            detailsButton.innerHTML = "Show Details &#8594;";
            detailsButton.addEventListener('click', () => {
                window.location.href = `new.html?imageURL=${encodeURIComponent(imageURL)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
            });

            div.appendChild(image);
            div.appendChild(detailsButton);

            row.appendChild(div);
        }
        Data.appendChild(row);
    }
    Data.style.display = "flex";
}

// Function to display stored search results
function displayStoredResults(storedItems) {
    Data.innerHTML = "<h1>Search results...<h1>";
    for (let i = 0; i < storedItems.length; i += 2) {
        const row = document.createElement("div");
        row.classList.add("row");

        for (let j = i; j < i + 2 && j < storedItems.length; j++) {
            const item = storedItems[j];
            const imageURL = item.links ? item.links[0].href : "";
            const title = item.data ? item.data[0].title : "Unknown";
            const description = item.data ? item.data[0].description_508 : "Unknown";

            const div = document.createElement("div");
            div.classList.add("image-item");

            const image = document.createElement("img");
            image.classList.add("img");
            image.src = imageURL;
            image.alt = "image";

            const detailsButton = document.createElement("button");
            detailsButton.classList.add("btn");
            detailsButton.innerHTML = "Show Details &#8594;";
            detailsButton.addEventListener('click', () => {
                window.location.href = `new.html?imageURL=${encodeURIComponent(imageURL)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
            });

            div.appendChild(image);
            div.appendChild(detailsButton);

            row.appendChild(div);
        }
        Data.appendChild(row);
    }
    Data.style.display = "flex";
}