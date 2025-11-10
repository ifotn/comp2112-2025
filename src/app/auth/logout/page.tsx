'use client';

import { useCounter } from "@/app/context/GlobalContext";
import { useRouter } from "next/navigation";

export default function Logout() {
    const { setUsername } = useCounter(); // to be used to remove global username var
    const router = useRouter(); // for redirect after logging out

    // call logout on API to also expire JWT
    const apiDomain: string = process.env.NEXT_PUBLIC_API_DOMAIN!;

    const handleLogout = async () => {
        try {
            const response: Response = await fetch(`${apiDomain}/users/logout`, {
                credentials: 'include' // pass current jwt so API can terminate it
            });

            if (response.ok) {
                setUsername('');  // remove global username value
                router.push('/'); // redirect to home
            }
        }
        catch (error) {
            console.log(`Logout Error ${error}`);
        }
    };

    handleLogout();

    return ('<h1>Logging Out...</h1>');
}
