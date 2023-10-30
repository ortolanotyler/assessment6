### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
    
    1. Async/Await: 
       this gives us code that appears more synchronous and uses promises to keep code readable/running smooth.

    2. Promises 
      in general this represents a value that could potentially be available, whether that is immediately, never, or in the future. asynchronous operations return promises so that code can continue to function before promise is resolved. 

    3. callbacks 
    functions passed as arguments. they execute after asynchronous operation is finished. building block of asynchronous code

- What is a Promise?
represents a value that could potentially be available, whether that is immediately, never, or in the future. asynchronous operations return promises so that code can continue to function before promise is resolved. 

- What are the differences between an async function and a regular function?
async functions allow us to pause and resume execution without blocking the thread, as javascript is by default a single-threaded language. Async functions always return promises (rather than a return value). 


- What is the difference between Node.js and Express.js?

node is a runtime environment, while express is a framework built on top of that environment. express is more of a high level abstraction that allows us to bypass some of the more difficult aspects of a lower level env like node. with node we execute javascript on the server, with express we can build web applications more simply. these two are also often used together, so they aren't subsitutions for one another. more like complimentary tools to use in web development

- What is the error-first callback pattern?
we use this convention with asynchronous operations in node. we set the callback as the last argument to an asynchronous operation, and try to catch the error before that. if we have no errors, the result is passed to the second arg in the function

- What is middleware?
middleware "sits" in the "middle" of the client and the server. it can handle incoming http requests, user authentication, headers,sessions. 

- What does the `next` function do?

we use next when one middleware operation is complete, giving control to the next middleware. this is written as a route handler and follows the request route . it isnt required in middleware functions. 


- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

1. instead of using .getJson (which has to wait for each request to finish) we can use Promise.All
2. i would probably change the variable names to be more descriptive, so that if someone is reviewing my code they would have a better idea jjust what it is fetching. 
3. there is not any error handling present. if one of these fails, it could crash the entire application. 

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
