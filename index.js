// Create references that we need in this exercise
const form = document.querySelector(".form");
const button = document.querySelector(".button");

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

form.addEventListener("input", function (event) {
  const inputs = form.querySelectorAll("input");
  let allInputsHaveValue = false;

  for (const input of inputs) {
    if (input.value === "") {
      allInputsHaveValue = false;
      break;
    } else {
      allInputsHaveValue = true;
    }
  }

  if (allInputsHaveValue) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", true);
  }
});
