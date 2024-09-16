"use strict";

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const tableBodyEl = document.getElementById("tbody");
const submitBtn = document.getElementById("submit-btn");

const breedArr = JSON.parse(getFromStorage("breedArr") || "[]");
console.log("breedArr", breedArr);

// check validate Breed & Type

function validateData(data) {
  if (data.breed == "") {
    alert("Vui lòng nhập Breed!");
    return false;
  }
  if (data.type == "Select Type") {
    alert("Vui lòng chọn Type!");
    return false;
  }

  return true;
}

// hàm hiển thị danh sách Breed
function renderTableBreed(breedArr) {
  console.log("renderTableBreed");
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < breedArr.length; i++) {
    console.log("for breedArr");
    const row = document.createElement("tr");

    row.innerHTML = ` 
    <td>${i + 1}</td>
    <td>${breedArr[i].breed}</td>
    <td>${breedArr[i].type}</td>
    <button class="btn btn-danger text-black" onclick="deleteBreed('${
      breedArr[i].breed
    }')">Delete</button>
    `;

    tableBodyEl.appendChild(row);
  }
}

// hàm xóa breed
const deleteBreed = (breed) => {
  if (confirm("Are you sure?")) {
    for (let i = 0; i < breedArr.length; i++)
      if (breedArr[i].breed == breed) {
        breedArr.splice(i, 1);
        saveToStorage("breedArr", JSON.stringify(breedArr));
        renderTableBreed(breedArr);
        break;
      }
  }
};

// hàm clear form
function clearInputBreed() {
  typeInput.value = "Select Type";
  breedInput.value = "";
}

// hàm submit khi click button submit
submitBtn.addEventListener("click", function (e) {
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };

  const validate = validateData(data);

  if (validate) {
    breedArr.push(data);
    clearInputBreed();
    saveToStorage("breedArr", JSON.stringify(breedArr));
    renderTableBreed(breedArr);
  }
});

renderTableBreed(breedArr);
