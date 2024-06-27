document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("calculator-form");
  const resultsContainer = document.getElementById("results-kcal");
  let diffWeight;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
  
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const age = parseInt(document.getElementById("age").value);
    const activityLevel = parseInt(document.getElementById("activity-level").value);
    const sex = document.getElementById("sex").value;
    const goal = document.getElementById("goal").value;

    // Declare the variables 
    // THIS IS ALL TAKEN FROM ANOTHER PROJECT I MADE A WHILE AGO
    let freqUser = activityLevel; // use activityLevel instead of freq
    let h = height * 0.01; // Convert cm to meters
    let bmi = weight / (h * h);
    let mb = 0;
    let calChange;
    let dif = 200;
    let pesoMas;
    let pesoMenos;
  
    if (sex == "m") {
      mb = 665 + 9.6 * weight + 9.8 * height - 4.7 * age;
    } else if (sex == "h") {
      mb = 66 + 13.7 * weight + 5 * height - 6.8 * age;
    } else {
      alert("Error.");
    }
  
    for (let freq = 0; freq <= 6; freq++) {
      if (freq === 1) {
        calChange = mb;
      } else if (freq === 2) {
        calChange = mb + 50;
      } else if (freq === 3) {
        calChange = mb + 100;
      } else if (freq === 4) {
        calChange = mb + 200;
      } else if (freq === 5) {
        calChange = mb + 450;
      } else if (freq === 6) {
        calChange = mb + 700;
      } else {
        calChange = "ERROR";
      }
  
      if (freq === freqUser) {
        break;
      }
    }
  
    pesoMas = calChange + dif;
    pesoMenos = calChange - dif;


    if(goal == "cut"){
      diffWeight = pesoMenos;
    } else {
      diffWeight = pesoMas;
    }

    let kcalSearch = diffWeight / 3;

    const apiKey = "AIzaSyDKnzEeDVrPIrGyj6BeWP6RHCd51MDjw4U"; 
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=${kcalSearch}+cal+recipe`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const items = data.items;

        // DISPLAY THE CALCULATED RESULTS
        if (goal == "cut") {
          resultsContainer.innerHTML = `
            <article>
              <p>BMI: ${bmi.toFixed(2)}</p>
              <p>Calories required for your activity level: ${calChange.toFixed(2)}</p>
              <p>Calories to lose weight: ${pesoMenos.toFixed(2)}</p>
            </article>
          `;
        } else {
          resultsContainer.innerHTML = `
            <article>
              <p>BMI: ${bmi.toFixed(2)}</p>
              <p>Calories required for your activity level: ${calChange.toFixed(2)}</p>
              <p>Calories to gain weight: ${pesoMas.toFixed(2)}</p>
            </article>
          `;
        }

        // DISPLAY THE RECIPE RESULTS
        const recipeResultsHTML = items.map(item => `
          <div class="recipe">
            <img src="${item.snippet.thumbnails.default.url}" alt="${item.snippet.title}">
            <p>${item.snippet.title}</p>
          </div>`).join("");

        resultsContainer.innerHTML += `<div class="recipe-list">${recipeResultsHTML}</div>`;
      })
      .catch(error => {
        console.error("Error fetching data:", error);        
        alert("Error fetching data;")
      });
  });
});
