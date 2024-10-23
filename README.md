# Account Registration Solution

This is an example of a solution to the exercise [Account Registration](https://github.com/jensen-frontend-2024/exercise-js-account-registration). The solution is made at Oktober 23 2024 by Niklas Fähnrich.

<details>
<summary>Table of content</summary>

3. [Connect labels to inputs without using the "for" attribute](#3-connect-labels-to-inputs-without-using-the-for-attribute)

4. [Make every input mandatory](#4-make-every-input-mandatory)

5. [Validate the password, it must contain atleast 8 characters.](#5-validate-the-password-it-must-contain-atleast-8-characters)

6. [Validate the confirmPassowrd, must be identical to password](#6-validate-the-confirmpassowrd-must-be-identical-to-password)

7. [Make sure submit is disabled if the passwords are not valid.](#7-make-sure-submit-is-disabled-if-the-passwords-are-not-valid)

8. [Gather all the data from the inputs and log as an object.](#8-gather-all-the-data-from-the-inputs-and-log-as-an-object)
</details>

Down below is a walkthroug of all the steps.

Exercise 1 and 2 are straight forward so they are not included in this walk through.

### 3. Connect labels to inputs without using the "for" attribute

Let's start with doing the first label and connect it to its corresponding input.

```js
const nameLabel = document.querySelector(".name-label");

nameLabel.addEventListener("click", function () {
  const nameInput = nameLabel.nextElementSibling;
  nameInput.focus();
});
```

Since we know the structure of our html document, we know that the label is followed by its corresponding input, hence we can use the property "nextElementSibling" in order to get a reference to the input itself.

So this is just one event for ONE of the labels. We have four more which means we need to sort of "dublicate" this code four more times. Do I want that? No, of course, not. Let's try with something else instead.

First let's try the `querySelectorAll` and loop through it. Since we are certain that we want a reference to all labels we can select by element.

```js
const labels = document.querySelectorAll("label");
```

This gives us a reference to all labels that exist in the html document. Now we can loop through this and add an event listener to all of them. The code is basically the same as before.

```js
for (const label of labels) {
  label.addEventListener("click", function () {
    const input = label.nextElementSibling;
    input.focus();
  });
}
```

Now we have solved the question, every label has an event registered to itself that just focus its corresponding input.

Let's think about this, we have now created five events that all demands resources from the client. It the application demands to many resources, the application will get slower, and that's not something we want of course. Now five events is nothing but still, let's practise to reduce the number of events. We can get away we just one in this case.

To fix this we need to "lift" up the event to the parent element "form", so we listen on a click inside the entire form instead.

```js
const form = document.querySelector(".form");
form.addEventListener("click", function () {
  console.log(form);
});
```

This code now runs a console.log whenever we click on the form element. But we need more information, and that information can be found on the event object. The event object is an object that the browser creates for us that contains ALL the available information about the event that was just triggered, and let's see what's inside.

```js
const form = document.querySelector(".form");
form.addEventListener("click", function (event) {
  console.log(event);
});
```

One piece of information the event object gives us is the element that was click on, meaning the element within the form that was clicked on, the target in other words. And this we can use in order to solve our problem here.

```js
const form = document.querySelector(".form");
form.addEventListener("click", function (event) {
  console.log(event.target);
});
```

But let's go one step further and check the tagName property of the element that was click. It the tagName is not a label, we can just cancel out our function. But if it is a label we can run the code we did earlier, by selecting the `nextElementSibling` and then focus that sibling, which should be an input.

```js
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
```

[Back to top](#account-registration-solution)

---

### 4. Make every input mandatory.

In order to solve this we can just add and attribute to all our input fileds. The attribute is called `required`.

```html
<div>
  <label class="name-label">Name</label>
  <input id="name" type="text" placeholder="name" required />
</div>
```

This is fine, but we might want to add some more functionlity to this. Let's disabled the button from the beginning so you can't click on it. Done easily, just add the attribute `disabled` to the button.

```html
<button disabled type="submit">Register</button>
```

Next step now, is to enable this button again when all the inputs have a value, and remember, av value that is NOT an empty string.

In order to do so, we need to register and event called "input". This event is triggered whenever the value of an input field has changed. We have five of them in our application, and we don't want to register an event for each of those, so let's do like we did before. Let's lift up the event to the form element instead.

```js
// the form reference is available since the last exercise.
form.addEventListener("input", function (event) {
  console.log(event.target);
  console.log(event.target.value);
});
```

Here we just console.log the target and its value, just to see that it works.

Let's collect our thoughts here. We want to enable the submit button sometime, how do we that? We can do a check after each input event if all the input fields have been filled. If that's the case, we enable the button, otherwise we keep it disabled.

In that case we need a reference to all the input fields.

```js
form.addEventListener("input", function (event) {
  const inputs = form.querySelectorAll("input");
  console.log(inputs);
});
```

Here we can see that we are invoking the querySelectorAll on the form reference, and that's totally fine. It just means that we are narrowing down the search area to be just within the form element.

Let's loop through the inputs and check if they all have values.

```js
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
    console.log("Great, all inputs have a value");
  } else {
    console.log("One of the inputs don't have a value");
  }
});
```

Here we just console.log a text whether or not all inputs have values.

What we want to do instead is to manipulate the attribute `disabled` on the button element, and to our help we have the methods: `removeAttribute()` and `setAttribute()`.

In order to more modularize our code, let's create a function that does this for us. It would look like this:

```js
function checkIfAllInputsHaveValue() {
  const inputs = document.querySelectorAll("input");

  for (const input of inputs) {
    if (input.value === "") {
      return false;
    }
  }

  return true;
}
```

Here we just get a reference to all the inputs, and then loop through them. If one of the inputs have a value that is an empty string, we return false. That means the function is canceled and the value false is returned. If all inputs have value that is not an empty string, the value true will be returned.

This part of the code:

```js
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
```

can now be switched out to this:

```js
const allInputsHaveValue = checkIfAllInputsHaveValue();
```

and here is the result of the code:

```js
form.addEventListener("input", function (event) {
  const allInputsHaveValue = checkIfAllInputsHaveValue();

  if (allInputsHaveValue) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", true);
  }
});
```

A little bit neater.

[Back to top](#account-registration-solution)

---

### 5. Validate the password, it must contain atleast 8 characters.

In order to validate the password of the pasword input we need to check it the value of that input is 8 characters or longer. First step is to create a reference to that input, it's done at the top of the file with the other element references.

```js
const passwordInput = document.querySelector("#password");
```

The id on the input element is something we have to add.

```html
<input id="password" type="password" placeholder="password" required />
```

When this is done i want to create the functionality for the validation check, and since we have started to create some independant functions, let's continue doing that. I will create this function:

```js
function checkIfPasswordIsValid(passwordValue) {
  if (passwordValue.length >= 8) {
    return true;
  }

  return false;
}
```

This function will take the password values as an argument and simply check if it is 8 characters or longer, it returns either true or false. Now we can use this function in our code together with and if check that checks if the target element is an element with the id "password". Then we now it's the input we are looking for and we can do our check.

```js
if (id === "password") {
  const passwordIsValid = checkIfPasswordIsValid(value);
}
```

But, it also said in the exercise that we should update the styling on the input field in order to reflect if the password is valid or not. Let's create another function for that.

```js
function setPwdValidationStyling(value, element) {
  if (value === "valid") {
    element.classList.add("valid");
    element.classList.remove("error");
  } else if (value === "error") {
    element.classList.remove("valid");
    element.classList.add("error");
  }
}
```

This function will accept two arguments, one which is the validation value of the input, either "valid" or "error" and the element that should recive the styling. After that it just does som simple DOM manipulation in order to add or remove the appropriate classes.

This function together with the earlier one and an if check will solve our problem. The event callback function in full:

```js
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

  if (allInputsHaveValue) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", true);
  }
});
```

The id and value variables are just derived from the event object.

[Back to top](#account-registration-solution)

---

### 6. Validate the confirmPassowrd, must be identical to password

Okay, let' validate the next password input that is the confirm password. The validation is simplier here, since we just need to check of the confirm password is equal to the password. Let's create a function for that:

```js
function checkIfConfirmPasswordIsValid() {
  const passwordValue = passwordInput.value;
  return confirmPasswordInput.value === passwordValue;
}
```

A function with no arguments but a boolean as a return value. In here we compare the value of the confirmPasswordInput and the value of the passwordInput. The reference to the PasswordInput exists from before but the confirmPasswordInput is something we have to create at the top in and inside the html.

```js
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
```

```html
<input
  id="confirm-password"
  type="password"
  placeholder="confirm password"
  required
/>
```

Also, the styling on the confirm password input should also be updated according to if it's valid or not. By sort of copying the earlier code for passwordInput validation and change the values we get this:

```js
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

  if (allInputsHaveValue) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", true);
  }
});
```

Works like a charm.

[Back to top](#account-registration-solution)

---

### 7. Make sure submit is disabled if the passwords are not valid.

Okay, this one is fairly straight forward, we just need to add to the existing check where we check if all the inputs have value that is not an empty string. To keep the code fairly readable, we can create a boolean that is derived from the two password checks functions.

```js
const bothPasswordsAreValid =
  checkIfPasswordIsValid(value) && checkIfConfirmPasswordIsValid();
```

If both of the passwords checks are true then this new variable will be evaluated to true as well. All other cases will result in a false value.

Add this to the last check in the event callback function and "bob's your uncle".

```js
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
```

[Back to top](#account-registration-solution)

---

### 8. Gather all the data from the inputs and log as an object.

The last one. In order to do this we need references to all the inputs, let's create that at the top.

```js
const form = document.querySelector(".form");
const button = document.querySelector(".button");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const nameInput = document.querySelector("#name");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
```

Don't forget to add the id attribute to the remaing inupt elements in the html file.

Next step, create a submit event on the form element. By doing so the browser will try to submit the form when clicking the button of type "submit".

```js
form.addEventListener("submit", function (event) {
  console.log("form submitted");
  event.preventDefault();
});
```

The `preventDefault()` is a method that exists on the event object and prevent the default behaviour of the submit event. The behaviour includes a hard refresh and a reset of all the values in the form, and we don't want that.

After this, just create an object and collect all the values from the different inputs and console.log it do the console.

```js
form.addEventListener("submit", function (event) {
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
```

There you go! Last step is just to add some nice css to your account registration form, but that you will have to do on your own!

[Back to top](#account-registration-solution)

---
