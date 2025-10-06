'use client';

import { useState } from "react";
import PageTitle from "./components/PageTitle";
import { useCounter } from "./context/GlobalContext";

export default function Home() {
  // create a state var to track # of button clicks, defaults to zero
  const [ count, setCount ] = useState<number>(0);

  // global increment method from context
  const { counter, increment } = useCounter();

  const handleClick = () => {
    // increment the local count var by 1 each time 
    setCount(count + 1);

    // call global increment method to increase global counter var by 1 (updates footer)
    increment();

    // option: use session storage instead of context
    sessionStorage.setItem("counter", counter.toString());
  }

  // every React component must have 1 return to send the JSX to the DOM
  return (
    <main>
      <PageTitle title="Home" />
      <h1>COMP2112 Class Site</h1>
      <p>This is Rich&apos;s in class site is built with Next.js and is hosted on Vercel.</p>
      <section>
        <button onClick={handleClick}>Click Me</button>
        <p>You have clicked the button {count} times.</p>
      </section>
    </main>
  );  
}
