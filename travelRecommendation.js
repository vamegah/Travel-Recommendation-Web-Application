const API_URL = "travel_recommendation_api.json";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");

function showRecommended(data) {
  const resultDiv = document.getElementById("result");
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
  const query = searchInput.value;

  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log("fetched data", data);
      const _query = query.toLowerCase();
      const recommended = [];
      if (["beach", "beaches"].includes(_query)) {
        recommended.push(...data.beaches);
      } else if (["temple", "temples"].includes(_query)) {
        recommended.push(...data.temples);
      } else if (["country", "countries"].includes(_query)) {
        recommended.push(...data.countries);
      } else {
        console.log("No recommend data");
      }
      showRecommended(recommended);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Enter keywork like beaches, temples or countries";
});