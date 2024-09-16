"use strict";

const submitBtn = document.getElementById("submit-btn");
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
const tableBodyEl = document.getElementById("tbody");
const healthyButton = document.getElementById("healthy-btn");

const petArr = [];
let healthyPetArr = [];

function checkInput(data) {
  console.log("data", data);
  if (data.id == "") {
    alert("Input ID cannot be blank!");
    return false;
  }
  if (data.name == "") {
    alert("Input Name cannot be blank!");
    return false;
  }
  if (isNaN(data.age)) {
    alert("Input Age cannot be blank!");
    return false;
  }
  if (data.type == "Select Type") {
    alert("Please select Type!");
    return false;
  }
  if (data.weight == "") {
    alert("Input Weight cannot be blank!");
    return false;
  }
  if (data.length == "") {
    alert("Input Length cannot be blank!");
    return false;
  }
  if (data.breed == "Select Breed") {
    alert("Please select Breed!");
    return false;
  }

  return true;
}

function checkUnique(id) {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id == id) {
      alert("ID must be unique!");
      return false;
    }
  }
  return true;
}

function checkBetweenAge(val, min, max) {
  if (val >= 1 && val <= max) {
    return true;
  }
  alert(`Age must be between ${min} and ${max}!`);
  return false;
}
function checkBetweenWeight(val, min, max) {
  if (val >= 1 && val <= max) {
    return true;
  }
  alert(`Weight must be between ${min} and ${max}!`);
  return false;
}
function checkBetweenLenght(val, min, max) {
  if (val >= 1 && val <= max) {
    return true;
  }
  alert(`Lenght must be between ${min} and ${max}!`);
  return false;
}

function validateData(data) {
  if (
    checkInput(data) &&
    checkUnique(data.id) &&
    checkBetweenAge(data.age, 1, 15) &&
    checkBetweenWeight(data.weight, 1, 15) &&
    checkBetweenLenght(data.length, 1, 100)
  )
    return true;
  return false;
}

function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  const check = "bi-check-circle-fill";
  const nonCheck = "bi-x-circle-fill";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    let pet = petArr[i];
    row.innerHTML = `
    <th scope="row">${pet.id}</th>
    <td>${pet.name}</td>
    <td>${pet.age}</td>
    <td>${pet.type}</td>
    <td>${pet.weight} kg</td>
    <td>${pet.length} cm</td>
    <td>${pet.breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
    </td>
    <td><i class="bi ${pet.vaccinat ? check : nonCheck}"></i></td>
    <td><i class="bi ${pet.dewormed ? check : nonCheck}"></i></td>
    <td><i class="bi ${pet.sterilized ? check : nonCheck}"></i></td>
    <td id="pet-bmi">${pet.bmi}</td>
    <td>
    ${pet.date.getDate()}/${pet.date.getMonth() + 1}/${pet.date.getFullYear()}
    </td>
    <td><button type="button" class="btn btn-danger" onclick="deletePet('${
      pet.id
    }')">Delete</button>
    </td>`;

    tableBodyEl.appendChild(row);
  }
}

// viet tiepo
submitBtn.addEventListener("click", function (e) {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    color: colorInput.value,
    length: lengthInput.value,
    breed: breedInput.value,
    vaccinat: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
    bmi: "?",
  };

  const validate = validateData(data);

  if (validate) {
    petArr.push(data);
    clearInput();
    renderTableData(healthyCheck ? healthyPetArr : petArr);

    // renderTableData(petArr);
  }
});
// xóa
function deletePet(petId) {
  if (confirm("Bạn có chắc chắn muốn xóa không?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id == petId) {
        petArr.splice(i, 1);
        break;
      }
    }
    renderTableData(healthyCheck ? healthyPetArr : petArr);
  }
}
//
let healthyCheck = false;
function isHealthy(pet) {
  return pet.vaccinat && pet.dewormed && pet.sterilized;
}
// Sự kiện click vào nút "Show All Pet/Show Healthy Pet"
healthyButton.addEventListener("click", function () {
  // Đảo ngược giá trị của biến healthyCheck
  healthyCheck = !healthyCheck;

  // Thay đổi nội dung của nút
  if (healthyCheck) {
    healthyButton.textContent = "Show All Pet";
  } else {
    healthyButton.textContent = "Show Healthy Pet";
  }

  // Lọc ra danh sách các thú cưng lành mạnh nếu healthyCheck là true
  if (healthyCheck) {
    healthyPetArr = petArr.filter((pet) => isHealthy(pet));
  }

  // Hiển thị dữ liệu tương ứng
  renderTableData(healthyCheck ? healthyPetArr : petArr);
});
function calculateBMI(weight, length, type) {
  let bmi;
  if (type === "Dog") {
    bmi = (weight * 703) / Math.pow(length, 2);
  } else if (type === "Cat") {
    bmi = (weight * 886) / Math.pow(length, 2);
  }
  return bmi.toFixed(2); // Làm tròn chỉ số BMI đến 2 chữ số thập phân
}

const calculateBMIBtn = document.getElementById("calculate-bmi-btn");

calculateBMIBtn.addEventListener("click", function () {
  const rows = document.querySelectorAll("#tbody tr");

  rows.forEach((row) => {
    const type = row.cells[3].textContent; // Lấy loại thú cưng từ cột thứ 4 (index 3)
    const weight = parseFloat(row.cells[4].textContent); // Lấy cân nặng từ cột thứ 5 (index 4)
    const length = parseFloat(row.cells[5].textContent); // Lấy độ dài từ cột thứ 6 (index 5)

    const bmi = calculateBMI(weight, length, type);
    row.cells[11].textContent = bmi; // Hiển thị chỉ số BMI trong cột thứ 12 (index 11)
  });
});
