"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const UserPage = () => {
    let token : string | undefined;
    const router = useRouter();
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        token = Cookies.get("auth_token");
        if(!token) {
            router.replace('/register');
        }
    }, [])
    
   
  return (
    <div>UserPage</div>
  )
}

export default UserPage