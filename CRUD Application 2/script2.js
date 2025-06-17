// Utility functions for localStorage
function getStudentsFromStorage() {
  const data = localStorage.getItem("students");
  return data ? JSON.parse(data) : [];
}

function saveStudentsToStorage(students) {
  localStorage.setItem("students", JSON.stringify(students));
}

let currentStdId = null;

const stdforms = document.getElementById("stdforms");
const stdIdInput = document.getElementById("stdId");
const stdNameInput = document.getElementById("stdName");
const stdMailInput = document.getElementById("stdMail");
const stdPhnNoInput = document.getElementById("stdPhnNo");
const mark1Input = document.getElementById("stdMark1");
const mark2Input = document.getElementById("stdMark2");
const mark3Input = document.getElementById("stdMark3");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const stdlist = document.getElementById("stdlist");

stdforms.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = stdNameInput.value.trim();
  const mail = stdMailInput.value.trim();
  const phn_no = stdPhnNoInput.value.trim();
  const mark1 = mark1Input.value.trim();
  const mark2 = mark2Input.value.trim();
  const mark3 = mark3Input.value.trim();

  if (!name || !mail || !phn_no || !mark1 || !mark2 || !mark3) {
    alert("Please fill all the fields");
    return;
  }

  let students = getStudentsFromStorage();

  if (currentStdId) {
    const index = students.findIndex((student) => student.id === currentStdId);
    students[index] = {
      ...students[index],
      name,
      mail,
      phn_no,
      mark1,
      mark2,
      mark3,
    };
  } else {
    const newStd = {
      id: Date.now().toString(),
      name,
      mail,
      phn_no,
      mark1,
      mark2,
      mark3,
    };
    students.push(newStd);
  }

  saveStudentsToStorage(students);

  resetForm();
  renderStd();
});

cancelBtn.addEventListener("click", resetForm);

function resetForm() {
  stdforms.reset();
  currentStdId = null;
  stdIdInput.value = "";
  submitBtn.textContent = "Add Item";
  cancelBtn.style.display = "none";
}

function renderStd() {
  let students = getStudentsFromStorage();
  if (students.length == 0) {
    stdlist.innerHTML = '<tr><td colspan="8">No students found</td></tr>';
    return;
  }

  stdlist.innerHTML = students
    .map((student) => {
      const total =
        Number(student.mark1) + Number(student.mark2) + Number(student.mark3);
      let result = "";
      if (
        Number(student.mark1) >= 35 &&
        Number(student.mark2) >= 35 &&
        Number(student.mark3) >= 35
      ) {
        result = "Pass";
      } else {
        result = "Fail";
      }
      return `
      <tr>
        <td>${student.name}</td>
        <td>${student.mail}</td>
        <td>${student.phn_no}</td>
        <td>${student.mark1}</td>
        <td>${student.mark2}</td>
        <td>${student.mark3}</td>
        <td>${total}</td> 
        <td class="${result.toLowerCase()}">${result}</td>
        <td>
            <button class="edit-btn" data-id="${student.id}">Edit</button>
            <button class="delete-btn" data-id="${student.id}">Delete</button>
        </td>
      </tr>
    `;
    })
    .join("");

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", handleEdit);
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", handleDelete);
  });
}

function handleEdit(e) {
  const id = e.target.getAttribute("data-id");
  const students = getStudentsFromStorage();
  const student = students.find((student) => student.id === id);

  if (student) {
    currentStdId = student.id;
    stdIdInput.value = student.id;
    stdNameInput.value = student.name;
    stdMailInput.value = student.mail;
    stdPhnNoInput.value = student.phn_no;
    mark1Input.value = student.mark1;
    mark2Input.value = student.mark2;
    mark3Input.value = student.mark3;
    submitBtn.textContent = "Update Student";
    cancelBtn.style.display = "inline-block";
    document
      .querySelector(".form-container")
      .scrollIntoView({ behavior: "smooth" });
  }
}

// Delete item handler
function handleDelete(e) {
  if (confirm("Are you sure you want to delete this item?")) {
    const id = e.target.getAttribute("data-id");
    let students = getStudentsFromStorage();
    students = students.filter((student) => student.id !== id);
    saveStudentsToStorage(students);
    renderStd();

    if (currentStdId === id) resetForm();
  }
}

// Initialize the app
renderStd();
