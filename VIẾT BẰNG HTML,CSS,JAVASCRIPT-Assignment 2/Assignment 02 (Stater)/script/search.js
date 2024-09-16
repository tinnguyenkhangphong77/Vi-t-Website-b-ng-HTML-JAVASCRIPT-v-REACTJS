"use strict";

const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const findBtn = document.getElementById("find-btn");
const tableBodyEl = document.getElementById("tbody");
const petArr = JSON.parse(getFromStorage("petArr", "[]"));
const breedArr = JSON.parse(getFromStorage("breedArr", "[]"));
typeInput.addEventListener("change", function () {
  breedInput.innerHTML = `<option>Selected Breed</option>`;
  renderBreedOption(breedArr.filter((breed) => breed.type === typeInput.value));
});
function renderBreedOption(breedTypeArray) {
  for (const item of breedTypeArray) {
    const optionElement = document.createElement("option");
    optionElement.textContent = item.breed;
    breedInput.appendChild(optionElement);
  }
}
findBtn.addEventListener("click", function () {
  const userInput = {
    id: idInput.value,
    name: nameInput.value,
    type: typeInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  // tiêu chí để search
  const criteria = {};
  if (userInput.id !== "") {
    criteria.id = userInput.id;
  }
  if (userInput.name !== "") {
    criteria.name = userInput.name;
  }
  if (userInput.type !== "Select Type") {
    criteria.type = userInput.type;
  }
  if (userInput.breed !== "Select Breed") {
    criteria.breed = userInput.breed;
  }
  if (userInput.vaccinated) {
    criteria.vaccinated = true;
  }
  if (userInput.dewormed) {
    criteria.dewormed = true;
  }
  if (userInput.sterilized) {
    criteria.sterilized = true;
  }
  console.log("criteria: ", criteria);
  let foundPet = petArr.filter((petData) => {
    if (Object.hasOwn(criteria, "id")) {
      return petData.id.includes(criteria.id);
    }
    return true;
  });
  foundPet = foundPet.filter((petData) => {
    if (Object.hasOwn(criteria, "name")) {
      return petData.name.includes(criteria.name);
    }
    return true;
  });
  foundPet = foundPet.filter((petData) => {
    if (Object.hasOwn(criteria, "type")) {
      return petData.type === criteria.type;
    }
    return true;
  });
  foundPet = foundPet.filter((petData) => {
    if (Object.hasOwn(criteria, "breed")) {
      return petData.breed === criteria.breed;
    }
    return true;
  });
  foundPet = foundPet.filter((petData) => {
    if (Object.hasOwn(criteria, "vaccinated")) {
      return petData.vaccinated === criteria.vaccinated;
    }
    return true;
  });
  foundPet = foundPet.filter((petData) => {
    if (Object.hasOwn(criteria, "dewormed")) {
      return petData.dewormed === criteria.dewormed;
    }
    return true;
  });
  foundPet = foundPet.filter((petData) => {
    if (Object.hasOwn(criteria, "sterilized")) {
      return petData.sterilized === criteria.sterilized;
    }
    return true;
  });
  renderTableData(foundPet);
});
(function () {
  renderTableData(petArr);
})();
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (const data of petArr) {
    const row = document.createElement("tr");

    const dataOfOneRow = `<th scope="row">${data.id}</th>
    <td>${data.name}</td>
    <td>${data.age}</td>
    <td>${data.type}</td>
    <td>${data.weight} kg</td>
    <td>${data.length} cm</td>
    <td>${data.breed}</td>
    <td><i class="bi bi-square-fill" style="color: ${data.color}"></i></td>
    <td><i class="bi ${
      data.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      data.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      data.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"</i></td>
    <td>${new Date(data.date).getDate()}/${
      new Date(data.date).getMonth() + 1
    }/${new Date(data.date).getFullYear()}</td>`;
    row.innerHTML = dataOfOneRow;
    tableBodyEl.appendChild(row);
    console.log("From renderTableData function");
  }
}
