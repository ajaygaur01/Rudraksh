"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function useLogout() {
    const router = useRouter();

    const logout = () => {
        Cookies.remove("auth_token"); // Remove the token
        router.push("/login"); // Redirect to login page
    };

    return logout;
}