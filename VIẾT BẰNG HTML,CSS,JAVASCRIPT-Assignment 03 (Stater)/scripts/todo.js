"use strict";

// Lấy username hiện tại
const currentUser = JSON.parse(getFromStorage("currentUser")) || [];

class Task {
  constructor(task, owner) {
    this.task = task;
    this.owner = owner;
    this.isDone = false;
  }
}

// mảng todoArr để chứa các Instance tượng trưng cho mỗi task.
let todoArr = JSON.parse(getFromStorage("todo_list")) || [];

// Hàm lấy ra danh sách todolist hiện tại
const currentUserTask = () =>
  todoArr.filter((todo) => todo.owner === currentUser);

// Xử lý sự kiện khi click add
document.getElementById("btn-add").addEventListener("click", (e) => {
  e.preventDefault();

  // Gọi hàm xử lý khi click vào nút Add
  handleAdd();
});

// Xử lý thêm task todo
function handleAdd() {
  const inputTask = document.getElementById("input-task");
  const taskValue = inputTask.value.trim(); // Lấy giá trị của input sau khi đã được loại bỏ khoảng trắng thừa

  // Kiểm tra tính hợp lệ của dữ liệu nhập vào
  if (!taskValue) {
    alert("Vui lòng điền nội dung task");
    return false;
  } else {
    const newTask = new Task(taskValue, currentUser);
    todoArr.push(newTask);

    // Lưu mảng todoArr vào LocalStorage.
    saveToStorage("todo_list", todoArr);

    // Xóa nội dung của input sau khi thêm task thành công
    inputTask.value = "";

    // Xóa nội dung cũ của todo list trước khi hiển thị lại
    clearTodoList();

    // show todolist
    showTodolist();
  }
}

// Hàm để hiển thị dữ liệu todolist
function displayTodos(task, isDone) {
  const todosContainer = document.getElementById("todo-list");
  const todoEl = document.createElement("li");
  todoEl.textContent = task;

  // Thêm class cho todo đã hoàn thành
  if (isDone) {
    todoEl.classList.add("checked");
  }

  // Xử lý sự kiện khi click vào từng task sẽ hoàn thành hay chưa
  todoEl.addEventListener("click", () => {
    actionTask(task, "toggleDone");
  });

  // Tạo nút delete
  const closeBtn = document.createElement("span");
  closeBtn.textContent = "×";
  closeBtn.classList.add("close");
  closeBtn.addEventListener("click", () => {
    actionTask(task, "remove");
  });

  todoEl.appendChild(closeBtn);
  todosContainer.appendChild(todoEl);
}

// Hàm show todolist
function showTodolist() {
  // Show todolist của người dùng đang đăng nhập
  const todolist = currentUserTask();

  // Lặp qua từng tin tức để render qua giao diện
  todolist.forEach((inputTask) => {
    displayTodos(inputTask.task, inputTask.isDone);
  });
}

// Hàm xóa nội dung cũ của todo list
function clearTodoList() {
  const todosContainer = document.getElementById("todo-list");
  todosContainer.innerHTML = "";
}

// Hàm done và remove task todo list
function actionTask(todo, status) {
  // Lọc ra các task có owner trùng khớp với currentUser
  const currentUserTasks = currentUserTask();

  // Tìm vị trí của task cần xóa trong mảng currentUserTasks
  const index = currentUserTasks.findIndex((task) => task.task === todo);

  // Nếu task được tìm thấy, xóa nó khỏi mảng currentUserTasks
  if (index === -1) return;

  // Đảo ngược trạng thái isDone của task hoặc remove task dựa vào status
  if (status === "remove") {
    currentUserTasks.splice(index, 1);
  } else if (status === "toggleDone") {
    currentUserTasks[index].isDone = !currentUserTasks[index].isDone;
  }

  // Cập nhật lại todoArr
  todoArr = [
    ...todoArr.filter((todo) => todo.owner !== currentUser),
    ...currentUserTasks,
  ];

  // Lưu mảng todoArr vào LocalStorage.
  saveToStorage("todo_list", todoArr);

  // Xóa nội dung cũ của todo list trước khi hiển thị lại
  clearTodoList();

  // show todolist
  showTodolist();
}

// Xóa nội dung cũ, mặc định của todo list trước khi hiển thị lại
clearTodoList();

// show todolist khi mới vào
showTodolist();
