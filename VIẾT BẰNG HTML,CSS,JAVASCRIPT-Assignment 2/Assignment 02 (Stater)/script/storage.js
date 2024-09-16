"use strict";

function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
function getFromStorage(key, defaultVal) {
  return localStorage.getItem(key) ?? defaultVal;
}

// const petArr = JSON.parse(getFromStorage("petArr")) ?? "[]";
// const breedArr = getFromStorage("breedArr") || [];
