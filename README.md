# Account Registration Solution

This is an example of a solution to the exercise [Account Registration](https://github.com/jensen-frontend-2024/exercise-js-account-registration). The solution is made at Oktober 23 2024 by Niklas Fähnrich.

Down below is a walkthroug of all the steps.

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

### 5. Validate the password, it must contain atleast 8 characters.
