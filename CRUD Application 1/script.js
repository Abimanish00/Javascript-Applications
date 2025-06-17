// Data store (in a real app, this would be a database)
let items = [];
let currentItemId = null;

// DOM Elements
const itemForm = document.getElementById("itemForm");
const itemIdInput = document.getElementById("itemId");
const itemNameInput = document.getElementById("itemName");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const itemsList = document.getElementById("itemsList");
const itemAgeInput = document.getElementById("itemAge");
const itemCollegeInput = document.getElementById("itemCollege");
const itemAddressInput = document.getElementById("itemAddress");

// Form submit handler
itemForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = itemNameInput.value.trim();
  const age = itemAgeInput.value;
  const college = itemCollegeInput.value.trim();
  const address = itemAddressInput.value.trim();

  if (!name || !college || !address || !age) {
    alert("Please fill all required fields!");
    return; 
  }

  if (currentItemId) {
    // Update existing item
    const index = items.findIndex((item) => item.id === currentItemId);
    items[index] = { ...items[index], name, age, college, address };
  } else {
    // Add new item
    const newItem = {
      id: Date.now().toString(),
      name,
      age,
      college,
      address,
    };
    items.push(newItem);
  }

  resetForm();
  renderItems();
});

// Cancel button handler
cancelBtn.addEventListener("click", resetForm);

// Reset form to initial state
function resetForm() {
  itemForm.reset();
  currentItemId = null;
  itemIdInput.value = "";
  submitBtn.textContent = "Add Item";
  cancelBtn.style.display = "none";
}

// Render all items in the table
function renderItems() {
  if (items.length === 0) {
    itemsList.innerHTML = '<tr><td colspan="5">No students found</td></tr>';
    return;
  }

  itemsList.innerHTML = items
    .map(
      (item) => `
        <tr>
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.college}</td>
            <td>${item.address}</td>
            <td>
                <button class="edit-btn" data-id="${item.id}">Edit</button>
                <button class="delete-btn" data-id="${item.id}">Delete</button>
            </td>
        </tr>
    `
    )
    .join("");

  // Add event listeners to edit and delete buttons
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", handleEdit);
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", handleDelete);
  });
}

// Edit item handler
function handleEdit(e) {
  const id = e.target.getAttribute("data-id");
  const item = items.find((item) => item.id === id);

  if (item) {
    currentItemId = item.id;
    itemIdInput.value = item.id;
    itemNameInput.value = item.name;
    itemAgeInput.value = item.age;
    itemCollegeInput.value = item.college;
    itemAddressInput.value = item.address;
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
    items = items.filter((item) => item.id !== id);
    renderItems();

    // If we were editing this item, reset the form
    if (currentItemId === id) {
      resetForm();
    }
  }
}

// Initialize the app
renderItems();
