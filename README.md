# React Guidance

## 1. Best Practices for State

The Golden Rule:

* **Never modify state directly** (e.g., count++ or myObject.key = 'value'). Always use the setter function (setCount). Modifying state directly will not trigger a re-render and can lead to bugs.
* **State is Asynchronous:** Calling the setter function doesn't update the state variable immediately. React batches state updates for performance. We'll explore the implications of this in a later lesson. For now, just know that you can't rely on the state variable having its new value on the very next line of code after calling the setter.
* **Call Hooks at the Top Level:** You must call useState (and other Hooks) at the top level of your component function. Don't call them inside loops, conditions, or nested functions.

## 2. Best Practices for Forms

* **Always Use Labels:** Every form input should have an associated \<label\> element. This is crucial for accessibility, as it allows screen readers to describe the input to users.
* **Controlled is Usually Better:** While "uncontrolled components" exist (where you pull the value from the DOM directly), using controlled components is the standard, recommended practice in React as it makes your UI state predictable.
* **Initialize State:** Always initialize your state for inputs, even if it's just an empty string ('') or null. Don't leave it as undefined.

## 3. About useEffect

The ```useEffect``` Hook allows you to run a piece of code (your "effect") after the component has rendered to the screen. It also gives you control over when your effect should be re-run.

First, import it alongside useState:

```JavaScript

import { useState, useEffect } from 'react';

```

The basic syntax is:

```JavaScript

useEffect(() => {
  // This is your effect function.
  // Code here runs AFTER the component renders.

}, [/* dependency array */]);
```

useEffect takes two arguments:

* **A function** that contains the side effect logic.
* **An optional dependency array**, which is the crucial part that controls when the effect runs again.

### The Dependency Array: The Key to Control

The dependency array tells React: "Only re-run this effect if the values in this array have changed since the last render."

There are three ways to use it:

**No Dependency Array:** ```useEffect(() => { ... })```

When it runs: After the initial render, and after every single re-render of the component.
When to use: Rarely. Mostly for specific cases where you truly need something to happen on every render. This can easily cause performance issues or infinite loops if you're not careful.

**Empty Dependency Array:**```useEffect(() => { ... }, [])```

When it runs: Only once, right after the component mounts (i.e., after the very first render).
When to use: This is perfect for one-time setup tasks. The most common use case is fetching initial data for the component.
**Dependency Array with Values:** ```useEffect(() => { ... }, [prop, someState])```

When it runs: After the initial render, and again anytime the value of ```prop``` or ```someState``` changes.
When to use: When you need to re-run an effect in response to a change in a specific prop or state variable. For example, fetching new data when a user ID changes.

## 4. Conditional Rendering

### What is Conditional Rendering?

Conditional rendering is the practice of showing different UI elements or components based on certain conditions or states.

React is highly flexible and doesn't have a built-in ```<if>``` element. Instead, it relies on standard JavaScript logic to control what gets rendered. Let's master **the most common patterns.**

#### 1. Using an if/else Statement

This is the most straightforward JavaScript pattern. If you have a complex condition or need to return entirely different blocks of JSX, you can use a standard if statement before your return statement.

```JavaScript

function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please sign in.</h1>;
  }
}

// In App.jsx
// <Greeting isLoggedIn={true} />  // Renders "Welcome back!"
// <Greeting isLoggedIn={false} /> // Renders "Please sign in."
```

#### 2. The Ternary Operator (condition ? true : false)

The ternary operator is a clean, inline way to handle simple if/else logic directly inside your JSX. It's incredibly common in React.

The syntax is ```condition ? expressionIfTrue:expressionIfFalse```

```JavaScript

function LoginButton({ isLoggedIn }) {
  return (
    <div>
      <p>The user is {isLoggedIn ? 'currently' : 'not'} logged in.</p>
      <button>
        {isLoggedIn ? 'Log Out' : 'Log In'}
      </button>
    </div>
  );
}
```

This is often more readable and concise than a full if/else block for simple cases.

#### 3. The Logical ```&&``` Operator

You've already seen this one. It's perfect for when you want to render something _only if_ a condition is met, and render nothing otherwise.

It works because in JavaScript, ```true && expression``` always evaluates to expression, and ```false && expression``` always evaluates to ```false``` (and React doesn't render ```false```).

```JavaScript

function Mailbox({ unreadMessages }) {
  const messageCount = unreadMessages.length;
  return (
    <div>
      <h1>Hello!</h1>
      {/* If messageCount > 0 is true, the part after && will be rendered. */}
      {/* If it's false, nothing is rendered. */}
      {messageCount > 0 &&
        <h2>
          You have {messageCount} unread messages.
        </h2>
      }
    </div>
  );
}
// <Mailbox unreadMessages={['Hi', 'Hello']} /> // Renders the h2
// <Mailbox unreadMessages={[]} />              // Does not render the h2
```

### Best Practices

* **Choose the right tool:** Use `if/else` for complex logic. Use the ternary operator for simple A or B conditions. Use `&&` for simple A or nothing conditions.
* **Avoid overly nested ternaries:** If you find yourself writing `condition1 ? (condition2 ? A : B) : C`, it's probably a sign that you should use a standard `if/else` block for better readability.
* **Don't put numbers on the left side of `&&`:** A tricky edge case is that ```0 && <Component />``` will actually render the number `0` on your page. Always use a boolean value on the left side, like `count > 0 && <Component />`.

## 5. The "Lifting State Up" Pattern

React's data flow is intentionally one-way (unidirectional), which makes applications easier to understand. There is no direct way to pass data "up." Instead, we use a clever and powerful pattern that relies on something we already know: **passing functions as props.**

The pattern, often called **"Lifting State Up,"** works like this:

* The **Parent** component defines a function that can update its own state.
* The **Parent** passes this function down to the **Child** component as a prop.
* The **Child** component, when something happens (like a user clicking a button), calls the function it received via its props.
* When the Child calls this function, it can pass data back to the Parent as an argument to that function.
This way, the Child "sends a message" to the Parent, and the Parent can update its own state in response, causing a re-render.

### Example: A Child Input Updating a Parent's Display

Let's imagine a parent component that displays a message, and a child component that contains the input field to change that message.

* **1.The Child Component (`ChildInput.jsx`)**

This component doesn't have any state. It just receives the current value and a function to call when it changes. It's a "dumb" or "presentational" component.

```JavaScript

// Receives the current text and a function `onTextChange` as props
function ChildInput({ textValue, onTextChange }) {

  const handleChange = (event) => {
    // When the input changes, call the function passed from the parent
    // and send the new value back up as an argument.
    onTextChange(event.target.value);
  };

  return (
    <div>
      <label>Set the Parent's Message: </label>
      <input type="text" value={textValue} onChange={handleChange} />
    </div>
  );
}

export default ChildInput;
```

* **2. The Parent Component (`ParentDisplay.jsx`)**

This component holds the state and defines the function that will update it. It "lifts the state up" so it can be shared.

```JavaScript

import { useState } from 'react';
import ChildInput from './ChildInput';

function ParentDisplay() {
  // The state lives in the parent component.
  const [message, setMessage] = useState('Hello World');

  // This is the function we will pass down to the child.
  // It knows how to update the parent's state.
  const handleMessageChange = (newMessage) => {
    setMessage(newMessage);
  };

  return (
    <div>
      <h1>Current Message: {message}</h1>
      <hr />
      {/* Pass the current state value AND the function down as props.
      */}
      <ChildInput 
        textValue={message} 
        onTextChange={handleMessageChange} 
      />
    </div>
  );
}
export default ParentDisplay;
```

When you type in the `ChildInput`, it calls `handleMessageChange` which lives in `ParentDisplay`. This updates the `message` state in the parent, which then re-renders and shows the new `message` in the `<h1>`.
