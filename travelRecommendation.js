const API_URL = "travelRecommendation_api.json";

const userInput = document.querySelector("#searchField");
const searchButton = document.querySelector("#searchBtn");
const clearButton = document.querySelector("#clearBtn");

function showRecommended(data) {
    const resultDiv = document.getElementById("results");
    if (data.length === 0) {
        resultDiv.innerHTML = "<p>No Recommendation Result</p>";
    } else {
        resultDiv.innerHTML = data
            .map((item) => {
                if ("cities" in item) {
                    return item.cities
                        .map((city) => {
                            return `<div class="card">
                                <img src="${city.imageUrl}" width="500px" height="300px" />
                                <div class="inner">
                                    <h3>${city.name}</h3>
                                    <p>${city.description}</p>
                                    <button>Visit</button>
                                </div>
                            </div>`;
                        })
                        .join("");
                } else {
                    return `<div class="card">
                        <img src="${item.imageUrl}" width="500px" height="300px" />
                        <div class="inner">
                            <h3>${item.name}</h3>
                            <p>${item.description}</p>
                            <button>Visit</button>
                        </div>
                    </div>`;
                }
            })
            .join("");
    }
}

searchButton.addEventListener("click", () => {
    const keywords = {
        beach: ["beach", "beaches"],
        temple: ["temple", "temples"],
        country: ["country", "countries"]
    };

    const inputValue = userInput.value.toLowerCase();

    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("fetched data", data);
            const recommended = [];
            if (keywords.beach.includes(inputValue)) {
                recommended.push(...data.beaches);
            } else if (keywords.temple.includes(inputValue)) {
                recommended.push(...data.temples);
            } else if (keywords.country.includes(inputValue)) {
                recommended.push(...data.countries);
            } else {
                console.log("No results found for the entered keyword.");
            }
            showRecommended(recommended);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
        
});



clearButton.addEventListener("click", () => {
    userInput.value = "";
    const resultDiv = document.getElementById("results");
    resultDiv.innerHTML = "Enter keyword like beaches, temples or countries";
});

searchButton.addEventListener("click", () => console.log("Search button clicked"));
clearButton.addEventListener("click", () => console.log("Clear button clicked"));
