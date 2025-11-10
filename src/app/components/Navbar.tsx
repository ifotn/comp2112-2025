'use client';

import Link from "next/link";

import { usePathname } from "next/navigation";

// read from global context to check for username
import { useCounter } from "../context/GlobalContext";

export default function Navbar() {
    // get current url
    const pathname = usePathname();

    // check for global username var
    const { username } = useCounter();

    // set link class depending if it matches the current url or not (active / inactive)
    const getLinkClass = (href:string) => {
        if (pathname === href || pathname.startsWith(href + '/')) {
            return 'activeLink';
        }
        else {
            return 'inactiveLink';
        }
    }

    return (
        <nav>
           <h1 className="brand">
                <Link href="/">
                    COMP2112 App
                </Link>
            </h1>
           <ul className="navElements">
               <li><Link href="/about" className={getLinkClass('/about')}>About</Link></li>
               <li><Link href="/contact" className={getLinkClass('/contact')}>Contact</Link></li>
               <li><Link href="/blog" className={getLinkClass('/blog')}>Blog</Link></li>  
                {!username &&
                    <>
                        <li><Link href="/auth/register" className={getLinkClass('/auth/register')}>Register</Link></li>
                        <li><Link href="/auth/login" className={getLinkClass('/auth/login')}>Login</Link></li>
                    </>
                }
                {username &&
                    <>
                        <li>{username}</li>
                        <li><Link href="/auth/logout" className={getLinkClass('/auth/logout')}>Logout</Link></li>
                    </>
                }
                
          
           </ul>
       </nav>
    );
}