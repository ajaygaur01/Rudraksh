"use client";
import { useEffect, useState } from "react";
import ProfilePage from "@/components/ProfilePage";
import { fetchUserDetails } from "@/utils/api";

const UserPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUser() {
      const userData = await fetchUserDetails();
      if (userData) setUser(userData);
      else {
        console.log(error)
        setError("Failed to load user details");
      }
    }
    loadUser();
  }, []);

    console.log("user in fetch details", user);
   
  return (
    <div>
        <ProfilePage user={{firstName: user?.name || "", email: user?.email || ""}} />
    </div>
  )
}

export default UserPage