// Create references that we need in this exercise
const form = document.querySelector(".form");
const button = document.querySelector(".button");
const password = document.querySelector("#password");

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

form.addEventListener("input", function (event) {
  const id = event.target.id;
  const value = event.target.value;
  const allInputsHaveValue = checkIfAllInputsHaveValue();

  if (id === "password") {
    const passwordIsValid = checkIfPasswordIsValid(value);

    if (passwordIsValid) {
      setPwdValidationStyling("valid");
    } else {
      setPwdValidationStyling("error");
    }
  }

  if (allInputsHaveValue) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", true);
  }
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

function setPwdValidationStyling(value) {
  if (value === "valid") {
    password.classList.add("valid");
    password.classList.remove("error");
  } else if (value === "error") {
    password.classList.remove("valid");
    password.classList.add("error");
  }
}
