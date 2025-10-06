'use client';

import Link from "next/link";
import { useCounter } from "../context/GlobalContext";

export default function Footer() {
    // set local var that reads global counter var from global context
    const { counter } = useCounter();

    return (
        <footer>
            <p>&copy; {new Date().getFullYear()}</p>
            <Link href="/contact">Contact Us</Link>
            <Link href="https://github.com/ifotn/comp2112-2025" target="_new">View Source</Link>
            <p>Total # of Home button clicks this Visit: {counter}</p>
        </footer>
    )
}