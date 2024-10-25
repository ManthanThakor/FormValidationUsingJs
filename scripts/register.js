//! toggling icon for password show and hide
const toggleIcon = document.getElementById("toggle-icon");
const passwordInput = document.getElementById("password");

toggleIcon.addEventListener("click", () => {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  toggleIcon.innerHTML =
    type === "password"
      ? '<i class="fa-solid fa-eye"></i>'
      : '<i class="fa-solid fa-eye-slash"></i>';
});

//! toggling icon for password show and hide
const toggleIcon2 = document.getElementById("toggle-icon-two");
const passwordInput2 = document.getElementById("confirmPassword");

toggleIcon2.addEventListener("click", () => {
  const type =
    passwordInput2.getAttribute("type") === "password" ? "text" : "password";
  passwordInput2.setAttribute("type", type);
  toggleIcon2.innerHTML =
    type === "password"
      ? '<i class="fa-solid fa-eye"></i>'
      : '<i class="fa-solid fa-eye-slash"></i>';
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const phone = document.getElementById("phone");
  const country = document.getElementById("country");
  const agreement = document.getElementById("agree");
  const genderInputs = document.getElementsByName("gender");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    clearErrorMessages();

    // Username validation
    if (username.value.trim() === "") {
      showError(username, "Username is required.");
      isValid = false;
    }

    // Email validation
    if (email.value.trim() === "" || !validateEmail(email.value)) {
      showError(email, "Please enter a valid email.");
      isValid = false;
    }

    // Password validation
    if (password.value.length < 6) {
      showError(password, "Password must be at least 6 characters long.");
      isValid = false;
    }

    // Confirm password validation
    if (confirmPassword.value.trim() === "") {
      showError(confirmPassword, "Please confirm your password.");
      isValid = false;
    } else if (confirmPassword.value !== password.value) {
      showError(confirmPassword, "Passwords do not match.");
      isValid = false;
    }

    // Phone number validation
    if (!/^\d{10,15}$/.test(phone.value)) {
      showError(
        phone,
        "Phone number must be between 10 and 15 digits and contain only numbers."
      );
      isValid = false;
    }

    // Country validation
    if (country.value === "") {
      showError(country, "Please select a country.");
      isValid = false;
    }

    // Gender validation
    const genderSelected = Array.from(genderInputs).some(
      (input) => input.checked
    );
    if (!genderSelected) {
      showError(
        document.getElementById("genderError"),
        "Please select a gender."
      );
      isValid = false;
    }

    // Agreement validation
    if (!agreement.checked) {
      showError(
        document.getElementById("agreementError"),
        "You must agree to the terms and conditions."
      );
      isValid = false;
    }

    if (isValid) {
      alert("Registration successful!");
    }
  });

  function showError(element, message) {
    if (element.tagName === "INPUT" || element.tagName === "SELECT") {
      const errorMessage = document.getElementById(`${element.name}Error`);
      errorMessage.textContent = message;
      errorMessage.classList.add("visible");
      element.classList.add("error");
    } else {
      element.textContent = message;
      element.classList.add("visible");
    }
  }

  function clearErrorMessages() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((error) => {
      error.textContent = "";
      error.classList.remove("visible");
    });
    const inputs = form.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.classList.remove("error");
    });
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
