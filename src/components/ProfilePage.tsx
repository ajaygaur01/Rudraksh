"use client";

import { useState } from "react";
import { User, Package, MapPin, Key, LogOut, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useLogout from "@/utils/logout";
import AddressForm from "./Address";

interface UserData {
  firstName: string;
  lastName?: string;
  email: string;
  dateOfBirth?: string;
  gender?: string;
  phone?: string;
  orders?: number;
  addresses?: number;
}

interface ProfilePageProps {
  user: UserData;
}

export default function ProfilePage({ user }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const logout = useLogout();

  const userData: UserData = {
    firstName: user.firstName || "User",
    lastName: user.lastName || "Undisclosed",
    email: user.email || "",
    dateOfBirth: user.dateOfBirth || "Undisclosed",
    gender: user.gender || "Undisclosed",
    phone: user.phone || "Undisclosed",
    orders: user.orders || 0,
    addresses: user.addresses || 0,
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <>
            {/* Profile Information */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Profile information</h2>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-muted-foreground">Full name</h3>
                    <p>{userData.firstName}</p>
                  </div>
                  <div>
                    <h3 className="text-muted-foreground">Date of birth</h3>
                    <p>{userData.dateOfBirth}</p>
                  </div>
                  <div>
                    <h3 className="text-muted-foreground">Gender</h3>
                    <p>{userData.gender}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Methods */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Contact methods</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-muted-foreground">Email</h3>
                    <p>{userData.email}</p>
                  </div>
                  <div>
                    <h3 className="text-muted-foreground">Phone</h3>
                    <p>{userData.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        );

      case "orders":
        return (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">My Orders</h2>
              <p>You have {userData.orders} orders.</p>
            </CardContent>
          </Card>
        );

      case "addresses":
        return (
          <Card>
             <AddressForm userId={user.email} />
          </Card>
        );

      case "change-password":
        return (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">Change Password</h2>
              <p>Update your password securely.</p>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold">{userData.firstName}</h2>
              <p className="text-muted-foreground">{userData.email}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                <button
                  className={cn(
                    "flex items-center p-4 border-l-4 border-transparent hover:bg-accent w-full text-left",
                    activeTab === "profile" && "border-l-4 border-primary bg-accent/50"
                  )}
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span>My profile</span>
                </button>

                <button
                  className={cn(
                    "flex items-center justify-between p-4 border-l-4 border-transparent hover:bg-accent w-full text-left",
                    activeTab === "orders" && "border-l-4 border-primary bg-accent/50"
                  )}
                  onClick={() => setActiveTab("orders")}
                >
                  <div className="flex items-center">
                    <Package className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>Orders</span>
                  </div>
                  <span className="bg-muted rounded-full px-2 py-0.5 text-sm">{userData.orders}</span>
                </button>

                <button
                  className={cn(
                    "flex items-center justify-between p-4 border-l-4 border-transparent hover:bg-accent w-full text-left",
                    activeTab === "addresses" && "border-l-4 border-primary bg-accent/50"
                  )}
                  onClick={() => setActiveTab("addresses")}
                >
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>Addresses</span>
                  </div>
                  <span className="bg-muted rounded-full px-2 py-0.5 text-sm">{userData.addresses}</span>
                </button>

                <button
                  className={cn(
                    "flex items-center p-4 border-l-4 border-transparent hover:bg-accent w-full text-left",
                    activeTab === "change-password" && "border-l-4 border-primary bg-accent/50"
                  )}
                  onClick={() => setActiveTab("change-password")}
                >
                  <Key className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span>Change password</span>
                </button>

                <button
                  onClick={logout}
                  className="flex items-center p-4 border-l-4 border-transparent hover:bg-accent w-full text-left"
                >
                  <LogOut className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span>Logout</span>
                </button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content (Conditionally Rendered) */}
        <div className="w-full md:w-2/3 lg:w-3/4">{renderTabContent()}</div>
      </div>
    </div>
  );
}
