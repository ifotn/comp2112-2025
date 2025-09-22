'use client';

import { useState } from "react";

export default function Contact() {
    const [ name, setName] = useState<string>('');

    // watch name input and update state var as input value changes
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    // show confirmation when button clicked
    const handleSubmit = () => {

    }

    return (
        <main>
            <h1>Contact Us</h1>
            <p>Contact us at 705.000.0000 or send us a message below</p>
            <input type="text" placeholder="Your Name" value={name} onChange={handleNameChange} />
            <p>Your name is: {name}</p>
            <button onClick={handleSubmit}>Submit</button>
        </main>
    );
}