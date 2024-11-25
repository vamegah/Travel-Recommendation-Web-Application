const API_URL = "travel_recommendation_api.json";

const userInput = document.getElementById("searchField");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");

function showRecommended(data) {
    const resultDiv = document.getElementById("results");
    if (data.length == 0) {
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
                        .join();
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
            .join();
    }
}

searchBtn.addEventListener("click", () => {
    const keywords = {
        beach: ["beach", "beaches"],
        temple: ["temple", "temples"],
        country: ["country", "countries"]
    };

    userInput.value.toLowerCase();

    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("fetched data", data);
            const recommended = [];
            // Check input against keyword arrays
            if (keywords.beach.includes(userInput)) {
                recommended.push(...data.beaches);
            } else if (keywords.temple.includes(userInput)) {
                recommended.push(...data.temples);
            } else if (keywords.country.includes(userInput)) {
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

clearBtn.addEventListener("click", () => {
    userInput.value = "";
    const resultDiv = document.getElementById("results");
    resultDiv.innerHTML = "Enter keywork like beaches, temples or countries";
});