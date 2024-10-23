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
