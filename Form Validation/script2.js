document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const passwordStrength = document.getElementById("passwordStrength");
  const passwordText = document.getElementById("passwordText");

  // Validate name field
  nameInput.addEventListener("input", function () {
    validateName();
  });

  // Validate email field
  emailInput.addEventListener("input", function () {
    validateEmail();
  });

  // Validate password field
  passwordInput.addEventListener("input", function () {
    validatePassword();
    checkPasswordStrength();
  });

  // Validate confirm password field
  confirmPasswordInput.addEventListener("input", function () {
    validateConfirmPassword();
  });

  // Form submission handler
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (
      isNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      // In a real application, you would submit the form here
      alert("Form submitted successfully!");
      form.reset();
      resetValidationStyles();
    } else {
      alert("Please fix the errors in the form before submitting.");
    }
  });

  // Validation functions
  function validateName() {
    const nameValue = nameInput.value.trim();
    const nameGroup = nameInput.closest(".form-group");

    if (nameValue === "") {
      showError(nameGroup, "Full name is required");
      return false;
    } else if (nameValue.length < 3) {
      showError(nameGroup, "Full name must be at least 3 characters");
      return false;
    } else {
      showSuccess(nameGroup);
      return true;
    }
  }

  function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailGroup = emailInput.closest(".form-group");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
      showError(emailGroup, "Email is required");
      return false;
    } else if (!emailRegex.test(emailValue)) {
      showError(emailGroup, "Please enter a valid email address");
      return false;
    } else {
      showSuccess(emailGroup);
      return true;
    }
  }

  function validatePassword() {
    const passwordValue = passwordInput.value;
    const passwordGroup = passwordInput.closest(".form-group");

    if (passwordValue === "") {
      showError(passwordGroup, "Password is required");
      return false;
    } else if (passwordValue.length < 8) {
      showError(passwordGroup, "Password must be at least 8 characters");
      return false;
    } else {
      showSuccess(passwordGroup);
      return true;
    }
  }

  function validateConfirmPassword() {
    const passwordValue = passwordInput.value;
    const confirmPasswordValue = confirmPasswordInput.value;
    const confirmPasswordGroup = confirmPasswordInput.closest(".form-group");

    if (confirmPasswordValue === "") {
      showError(confirmPasswordGroup, "Please confirm your password");
      return false;
    } else if (confirmPasswordValue !== passwordValue) {
      showError(confirmPasswordGroup, "Passwords do not match");
      return false;
    } else {
      showSuccess(confirmPasswordGroup);
      return true;
    }
  }

  // Password strength checker
  function checkPasswordStrength() {
    const passwordValue = passwordInput.value;
    let strength = 0;

    // Check password length
    if (passwordValue.length >= 8) strength += 1;
    if (passwordValue.length >= 12) strength += 1;

    // Check for uppercase letters
    if (/[A-Z]/.test(passwordValue)) strength += 1;

    // Check for lowercase letters
    if (/[a-z]/.test(passwordValue)) strength += 1;

    // Check for numbers
    if (/[0-9]/.test(passwordValue)) strength += 1;

    // Check for special characters
    if (/[^A-Za-z0-9]/.test(passwordValue)) strength += 1;

    // Update the strength meter and text
    let width = 0;
    let backgroundColor = "#e74c3c";
    let strengthText = "Weak";

    if (strength > 4) {
      width = 100;
      backgroundColor = "#2ecc71";
      strengthText = "Very Strong";
    } else if (strength > 3) {
      width = 75;
      backgroundColor = "#3498db";
      strengthText = "Strong";
    } else if (strength > 2) {
      width = 50;
      backgroundColor = "#f1c40f";
      strengthText = "Medium";
    } else if (strength > 0) {
      width = 25;
      strengthText = "Weak";
    } else {
      width = 0;
      strengthText = "";
    }

    passwordStrength.style.width = `${width}%`;
    passwordStrength.style.backgroundColor = backgroundColor;
    passwordText.textContent = passwordValue
      ? `Password strength: ${strengthText}`
      : "";
  }

  // Helper functions for validation UI
  function showError(formGroup, message) {
    formGroup.classList.remove("success");
    formGroup.classList.add("error");
    formGroup.querySelector(".error").textContent = message;
    formGroup.querySelector(".error").style.display = "block";
  }

  function showSuccess(formGroup) {
    formGroup.classList.remove("error");
    formGroup.classList.add("success");
    formGroup.querySelector(".error").style.display = "none";
  }

  function resetValidationStyles() {
    const formGroups = document.querySelectorAll(".form-group");
    formGroups.forEach((group) => {
      group.classList.remove("success", "error");
      group.querySelector(".error").style.display = "none";
    });

    passwordStrength.style.width = "0%";
    passwordText.textContent = "";
  }
});
