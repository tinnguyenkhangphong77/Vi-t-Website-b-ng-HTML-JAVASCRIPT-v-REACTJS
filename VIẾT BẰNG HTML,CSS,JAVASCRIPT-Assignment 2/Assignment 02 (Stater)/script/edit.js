"use strict";
const navEl = document.querySelector("nav");
navEl.addEventListener("click", function () {
  navEl.classList.toggle("active");
});

const tableBodyEl = document.getElementById("tbody");

const form = document.getElementById("container-form");

const submitBtn = document.getElementById("submit-btn");

const petArr = JSON.parse(getFromStorage("petArr", "[]"));

const breedArr = JSON.parse(getFromStorage("breedArr", "[]"));

(function () {
  renderTableEdit(petArr);
})();

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
// === ===

typeInput.addEventListener("change", function () {
  breedInput.innerHTML = `<option>Select Breed</option>`;
  renderBreedOption(breedArr.filter((breed) => breed.type === typeInput.value));
});

submitBtn.addEventListener("click", function () {
  const afterEditData = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    breed: breedInput.value,
    color: colorInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };

  const validate = validateData(afterEditData);
  if (validate) {
    clearInput();
    for (const petData of petArr) {
      if (petData.id === afterEditData.id) {
        console.log(petData.id);
        petData.name = afterEditData.name;
        petData.age = afterEditData.age;
        petData.type = afterEditData.type;
        petData.weight = afterEditData.weight;
        petData.length = afterEditData.length;
        petData.breed = afterEditData.breed;
        petData.color = afterEditData.color;
        petData.vaccinated = afterEditData.vaccinated;
        petData.dewormed = afterEditData.dewormed;
        petData.sterilized = afterEditData.sterilized;
        console.log("pet data after editing", petData);
        break;
      }
    }

    saveToStorage("petArr", JSON.stringify(petArr));
    renderTableEdit(petArr);
    hideEditForm();
  }
});

function validateData(data) {
  let checked = true;

  // check Name of pet
  if (data.name === "") {
    checked = false;
    alert("Please input for name");
  }

  // check Age of pet
  if (isNaN(data.age)) {
    checked = false;
    alert("Age must be a number");
  } else {
    if (data.age < 1 || data.age > 15) {
      checked = false;
      alert("Age must be between 1 and 15!");
    }
  }

  // check Weight of pet
  if (isNaN(data.weight)) {
    checked = false;
    alert("Weight must be a number");
  } else {
    if (data.weight < 1 || data.weight > 15) {
      checked = false;
      alert("Weight must be between 1 and 15!");
    }
  }

  // check length of pet
  if (isNaN(data.length)) {
    checked = false;
    alert("Length must be a number");
  } else {
    if (data.length < 1 || data.length > 100) {
      checked = false;
      alert("Length must be between 1 and 100!");
    }
  }

  // check Type of pet
  if (data.type === "Select Type") {
    checked = false;
    alert("Please Select Type!");
  }

  // check Breed of pet
  if (data.breed === "Select Breed") {
    checked = false;
    alert("Please Select Breed!");
  }
  return checked;
}

// clear input
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  breedInput.value = "Select Breed";
  colorInput.value = "#000000";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// edit pet with specific id
function editPet(id) {
  const desiredPet = petArr.find((pet) => pet.id === id);
  console.log("found desired pet: ", desiredPet);
  showEditForm(desiredPet);
}

function showEditForm(petData) {
  form.classList.remove("hide");
  renderBreedOption(breedArr.filter((breed) => breed.type === petData.type));

  idInput.value = petData.id;
  nameInput.value = petData.name;
  ageInput.value = petData.age;
  typeInput.value = petData.type;
  weightInput.value = petData.weight;
  lengthInput.value = petData.length;
  colorInput.value = petData.color;
  breedInput.value = petData.breed;
  vaccinatedInput.checked = petData.vaccinated;
  dewormedInput.checked = petData.dewormed;
  sterilizedInput.checked = petData.sterilized;
}

function renderBreedOption(breedTypeArray) {
  for (const item of breedTypeArray) {
    const optionElement = document.createElement("option");
    optionElement.textContent = item.breed;
    breedInput.appendChild(optionElement);
  }
}

function hideEditForm() {
  form.classList.add("hide");
}

function renderTableEdit(petArr) {
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
    <td>
      <i class="bi bi-square-fill" style="color: ${data.color}"></i>
    </td>
    <td><i class="bi ${
      data.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    } "></i></td>
    <td><i class="bi ${
      data.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      data.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td>${new Date(data.date).getDate()}/${
      new Date(data.date).getMonth() + 1
    }/${new Date(data.date).getFullYear()}</td>
    <td>
      <button type="button" class="btn btn-warning" onclick="editPet('${
        data.id
      }')">Edit</button>
    </td>`;
    row.innerHTML = dataOfOneRow;
    tableBodyEl.appendChild(row);
  }
}
