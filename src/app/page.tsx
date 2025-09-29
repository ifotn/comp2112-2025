'use client';

import { useState } from "react";

export default function Home() {
  // create a state var to track # of button clicks, defaults to zero
  const [ count, setCount ] = useState<number>(0);

  const handleClick = () => {
    // increment the count var by 1 each time 
    setCount(count + 1);
  }

  // every React component must have 1 return to send the JSX to the DOM
  return (
    <main>
      <h1>COMP2112 Class Site</h1>
      <p>This is Rich&apos;s in class site is built with Next.js and is hosted on Vercel.</p>
      <section>
        <button onClick={handleClick}>Click Me</button>
        <p>You have clicked the button {count} times.</p>
      </section>
    </main>
  );  
}
