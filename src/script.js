const form = document.getElementById("form");
const input = document.getElementById("input");
const noteContainer = document.getElementById("note-container");

let notes = [];
const createNote = (note) => {
  const item = {
    note: note,
    check: false,
  };
  notes.push(item);
};

const storageData = () => {
  localStorage.setItem("notes", JSON.stringify(notes));
  readStorage();
};

const readStorage = () => {
  notes = JSON.parse(localStorage.getItem("notes"));
  if (notes === null) notes = [];
  noteContainer.innerHTML = "";
  if (!notes.length)
    noteContainer.innerHTML = `<h2 class="text-center text-xl text-amber-500 font-semibold">no notes yet!</h2>`;
  notes.map((item) => {
    const check = item.check ? "../assets/checkbox.svg" : "../assets/box.svg";
    const checkBg = item.check? "bg-lime-500":"bg-orange-500";
    noteContainer.innerHTML += `
    <div class="card ${checkBg}">
      <p class="text-yellow-50 font-medium">${item.note}</p>
      <div class="flex gap-2">
        <img class="w-7 invert cursor-pointer" data-check src="${check}"/>
        <img class="w-7 invert cursor-pointer" data-remove src="../assets/remove.svg"/>
      </div>
    </div>`;
  });
};

const checkOrRemove = (e) => {
  const text = e.target.parentElement.parentElement.innerText;
  if (e.target.hasAttribute("data-remove"))
    notes = notes.filter(item => item.note !== text);
  if (e.target.hasAttribute("data-check"))
    notes.map((item) => (item.note === text ? (item.check = !item.check) : {}));
  storageData();
};

const addNote = (e) => {
  e.preventDefault();
  if (!input.value) return;
  createNote(input.value);
  storageData();
  form.reset();
};

noteContainer.addEventListener("click", checkOrRemove);
form.addEventListener("submit", addNote);
document.addEventListener("DOMContentLoaded", readStorage);