// Create references that we need in this exercise
const form = document.querySelector(".form");
const button = document.querySelector(".button");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const nameInput = document.querySelector("#name");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");

// 3. Connect label to corresponding input
form.addEventListener("click", function (event) {
  const tagName = event.target.tagName;

  if (tagName !== "LABEL") {
    return; // Cancels the function right away
  }

  const label = event.target;
  const input = label.nextElementSibling;
  input.focus();
});

// 4. Make every input mandatory.

// form.addEventListener("input", function (event) {
//   const inputs = form.querySelectorAll("input");
//   let allInputsHaveValue = false;

//   for (const input of inputs) {
//     if (input.value === "") {
//       allInputsHaveValue = false;
//       break;
//     } else {
//       allInputsHaveValue = true;
//     }
//   }

//   if (allInputsHaveValue) {
//     button.removeAttribute("disabled");
//   } else {
//     button.setAttribute("disabled", true);
//   }
// });

// 5. Validate the password, it must containt atleast 8 characters.

// form.addEventListener("input", function (event) {
//   const id = event.target.id;
//   const value = event.target.value;
//   const allInputsHaveValue = checkIfAllInputsHaveValue();

//   if (id === "password") {
//     const passwordIsValid = checkIfPasswordIsValid(value);

//     if (passwordIsValid) {
//       setPwdValidationStyling("valid");
//     } else {
//       setPwdValidationStyling("error");
//     }
//   }

//   if (allInputsHaveValue) {
//     button.removeAttribute("disabled");
//   } else {
//     button.setAttribute("disabled", true);
//   }
// });

// 6. Validate the confirmPassowrd, must be identical to password

// form.addEventListener("input", function (event) {
//   const id = event.target.id;
//   const value = event.target.value;
//   const allInputsHaveValue = checkIfAllInputsHaveValue();

//   if (id === "password") {
//     const passwordIsValid = checkIfPasswordIsValid(value);

//     if (passwordIsValid) {
//       setPwdValidationStyling("valid", passwordInput);
//     } else {
//       setPwdValidationStyling("error", passwordInput);
//     }
//   }

//   if (id === "confirm-password") {
//     const confirmPasswordIsValid = checkIfConfirmPasswordIsValid();

//     if (confirmPasswordIsValid) {
//       setPwdValidationStyling("valid", confirmPasswordInput);
//     } else {
//       setPwdValidationStyling("error", confirmPasswordInput);
//     }
//   }

//   if (allInputsHaveValue) {
//     button.removeAttribute("disabled");
//   } else {
//     button.setAttribute("disabled", true);
//   }
// });

// 7. Make sure submit is disabled if the passwords are not valid.

form.addEventListener("input", function (event) {
  const id = event.target.id;
  const value = event.target.value;
  const allInputsHaveValue = checkIfAllInputsHaveValue();

  if (id === "password") {
    const passwordIsValid = checkIfPasswordIsValid(value);

    if (passwordIsValid) {
      setPwdValidationStyling("valid", passwordInput);
    } else {
      setPwdValidationStyling("error", passwordInput);
    }
  }

  if (id === "confirm-password") {
    const confirmPasswordIsValid = checkIfConfirmPasswordIsValid();

    if (confirmPasswordIsValid) {
      setPwdValidationStyling("valid", confirmPasswordInput);
    } else {
      setPwdValidationStyling("error", confirmPasswordInput);
    }
  }

  const bothPasswordsAreValid =
    checkIfPasswordIsValid(value) && checkIfConfirmPasswordIsValid();

  if (allInputsHaveValue && bothPasswordsAreValid) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", true);
  }
});

// 8. Gather all the data from the inputs and log as an object.

form.addEventListener("submit", function (event) {
  console.log("form submitted");
  event.preventDefault();

  const data = {
    name: nameInput.value,
    username: usernameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    confirmPassword: confirmPasswordInput.value,
  };

  console.log(data);
});

// ########## Utility functions below ########## //

function checkIfAllInputsHaveValue() {
  const inputs = document.querySelectorAll("input");

  for (const input of inputs) {
    if (input.value === "") {
      return false;
    }
  }

  return true;
}

function checkIfPasswordIsValid(passwordValue) {
  if (passwordValue.length >= 8) {
    return true;
  }

  return false;
}

function setPwdValidationStyling(value, element) {
  if (value === "valid") {
    element.classList.add("valid");
    element.classList.remove("error");
  } else if (value === "error") {
    element.classList.remove("valid");
    element.classList.add("error");
  }
}

function checkIfConfirmPasswordIsValid() {
  const passwordValue = passwordInput.value;
  return confirmPasswordInput.value === passwordValue;
}
