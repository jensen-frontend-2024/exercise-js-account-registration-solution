// .3 Connect label to corresponding input

const form = document.querySelector(".form");
form.addEventListener("click", function (event) {
  const tagName = event.target.tagName;

  if (tagName !== "LABEL") {
    return; // Cancels the function right away
  }

  const label = event.target;
  const input = label.nextElementSibling;
  input.focus();
});
