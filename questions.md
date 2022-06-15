# Part 2

**1. What is the difference between Component and PureComponent? give an example where it might break my app.**

To be honest, I never worked with class Components, so I don’t know the answer to that.

**2. Context + ShouldComponentUpdate might be dangerouse. Can think of why is that?**

Again, I never worked with class Components on React. I can learn it if you needed, but the PDF says that I can’t use any web or other resource, so I’m being honest with you.

**3. Describe three ways to pass information from a component to its Parent.**

The **first one** is using a setState from the parent component.

    import { useState } from "react";
    
    const Children = (setNewState) => {
      return (
        <button onClick={() => setNewState("Hi from children")}>
          Set Parent State
        </button>
      );
    };
    
    const Parent = () => {
      const [state, setState] = useState("");
      return (
        <div>
          <h1>{state}</h1>
          <Children setNewState={setState} />
        </div>
      );
    };

The **second** it's using context. You have to create a contextProvider.


    // Create context
    const NewContext = React.createContext("initial Context");
    
    const App = () => {
      const [contextState, setContextState] = useState("initialState");
    
      const handleChangeContext = (text) => {
        setContextState(text);
      };
    
      return (
        <NewContext.Provider value={{ contextState, handleChangeContext }}>
          <h1>{contextState}</h1>
          <Component />
        </NewContext.Provider>
      );
    };
    
    const Component = () => {
      const { contextState, handleChangeContext } = useContext(NewContext);
      return (
        <button onClick={() => handleChangeContext("Hi from children")}>
          Set Parent State
        </button>
      );
    };


The **third one** can be using third-party libraries such as Redux toolkit, etc.

**4. Give two ways to prevent components from re-rendering**

You can use "*useMemo*" and "*useCallback*". 
**useMemo** allows us to save on cache the data from the first render, and, if the function it's the same and has the same arguments, it doesn't re-render, just shows the previously cached data. 

Also, you can prevent re-renders with **useCallback**. It not going the cache the result, but it can memorize a callback function preventing re-renders. 

**5. What is a fragment and why do we need it? Give an example where it might break my app.**

A fragment (<></>) works as an HTML tag, but it's not an HTML tag. His function is to wrap all the children elements inside of it, not render another HTML tag, save memory and load faster. 
Also, you have to be careful because, if you render items inside of it on a children component, those items will be rendered on the next parent element/container, so if you don't prevent that by using good CSS styles or something like that, it can break your App. 

**6. Give three examples of the HOC pattern.** 

I don't know the name, maybe I used HOC sometime but I don't remember what it is. 

**7. What's the difference in handling exceptions in promises, callbacks and async...await.** 

With callbacks you are going directly into "callback hell", you are going to write and repeat A LOT of code to handle exceptions because they are a lot of functions inside of other functions. 

With the Promises, all was better. You only have a new Promise with resolve and reject, and the "then". The downside of this approach is that, sometimes, you will have a chain of "then"s and "catch"s to solve the exceptions, and the code can be a little bit messy. 

And finally, with async-await it's all much easier and cleaner. You only need to add the keyword "async" before the function, this will return a new Promise, and using the keyword "await" you will have the same result. To handle exceptions you only need to wrap the code inside of a "try, catch". If something goes wrong, a catch will be executed, passing the error and there you can handle it just how you like it. 

**8. How many arguments does setState and take and why is it async.** 

I don't know about classes, but the "useState" hook returns 2 values: the state, and a function to set the state. That function receives the new value, but if you want to use the previous state: 

    const [number, setNumber] = useState(4)
    setNumber((prevState) => {
            return prevState - 1;
          });
    // number = 3      

**9. List the steps needed to migrate a Class to Function Component.** 

I don't know because I never worked with Class Components, but I know how to make Function Components. 

**10. List a few ways styles can be used with components.** 

You can use: 
**Inline CSS**:

    //Insde of the Component
    <h1 styles={{color: "red", fontSize: "24px"}}>Component text</h1>
    
**CSS Modules**
With modules, you don't need to worry about conflicts between different names of classes, because they are scoped only for your component. I use this approach a lot with nextjs and it's one of my favorites. 
To use it you only need to create a file like: 
***ComponentName.module.css***  and import it inside of your Component file as:

import styles from "./ComponentName.module.css"

and to use it

    <h1 className={styles.classNameSelected}>Hi</h1>

**Normal CSS**
This is the classic way of making CSS files, just make a **ComponentName.css** file and start adding classes and styles. To use it you only have to import it into the Component file and apply styles just like this:

    <h1 className={"classNameSelected"}>Hello word</h1>

Be careful because the **scope is global here**, so you have to use some pattern with the different class names. 

**Styled Components**
It's a very popular third-party library that allows us to write CSS in JS and re-use those styles. 

**11. How to render an HTML string comming from the server.**

You have to use a property called "dangerouslySetInnerHTML" abailable on different HTML tags. 
As an example: 

    const Component = () => {
      const [htmlString, setHtmlString] = useState("");
    
      useEffect(() => {
        // function who fetch the data from the server and set the
        // new state with the HTML string
        getData();
      }, []);
    
      return <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>;
    };
