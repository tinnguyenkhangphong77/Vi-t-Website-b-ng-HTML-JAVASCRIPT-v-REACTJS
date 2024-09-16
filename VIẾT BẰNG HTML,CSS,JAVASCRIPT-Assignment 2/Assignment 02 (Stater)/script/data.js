"use strict";
import saveAs from "./FileSaver.js";

const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
const inputFile = document.getElementById("input-file");
const breedArray = JSON.parse(getFromStorage("breedArray", "[]"));
const petArray = JSON.parse(getFromStorage("petArray", "[]"));
const dataFromLocalStorage = getFromStorage("petArray", "[]");
const data = JSON.stringify(JSON.parse(dataFromLocalStorage));
exportBtn.addEventListener("click", function () {
  const confirmed = window.confirm("Are you sure");
  if (confirmed) {
    saveStaticDataToFile();
  }
});
function saveStaticDataToFile() {
  const blob = new Blob([data], { type: "application/json" });
  saveAs(blob, "export.json");
}
importBtn.addEventListener("click", function () {
  const file = inputFile.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (event) {
      // get data from imported json;
      const petDataFromImport = event.target.result;
      // parsing it to json format
      const petArrayFromImportedFile = JSON.parse(petDataFromImport);
      // nếu hai id trùng nhau thì cập nhật thông tin pet theo file import
      const result1 = petArray.map((pet) => {
        const result = petArrayFromImportedFile.find(
          (pet2) => pet2.id === pet.id
        );
        return result == undefined ? pet : result;
      });
      // tìm pet nằm trong file import mà không có trong local storage
      const result2 = petArrayFromImportedFile.filter((pet) => {
        return petArray.every((pet2) => pet2.id !== pet.id);
      });
      // nối 2 mảng lại với nhau
      const resultAfterConcatenatingTwoArray = result1.concat(result2);
      console.table(resultAfterConcatenatingTwoArray);
      // update local storage after importing file json
      saveToStorage(
        "petArray",
        JSON.stringify(resultAfterConcatenatingTwoArray)
      );
      // update breed array
      let breedArrayFromImportedFile = getBreedArrayFromImportedFile(
        petArrayFromImportedFile
      );
      const newArr = [];
      breedArrayFromImportedFile.forEach((item) => {
        if (!breedArray.some((value) => value.breed === item.breed)) {
          newArr.push(item);
        }
      });
      // nối 2 mảng lại với nhau
      const afterMergeTwoBreedArray = breedArray.concat(newArr);
      console.table(afterMergeTwoBreedArray);
      saveToStorage("breedArray", JSON.stringify(afterMergeTwoBreedArray));
    };
    reader.onerror = function () {
      console.log("Could not read file");
    };
  }
  if (file == null) {
    alert("You have not chosen file yet!");
  }
  // reset imported file
  inputFile.value = "";
});
function getBreedArrayFromImportedFile(petArrayFromImportedFile) {
  const newBreedArray = [];
  petArrayFromImportedFile.forEach((currentValue, index) => {
    newBreedArray.push({ type: currentValue.type, breed: currentValue.breed });
  });
  return newBreedArray;
}
function isTheSame(arrayA, arrayB) {
  if (arrayA.length !== arrayB.length) {
    return false;
  }
  return arrayA.every((currentValue, index) => currentValue === arrayB[index]);
}
