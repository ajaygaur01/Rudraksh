import { jwtDecode } from "jwt-decode";
import Cookie from "js-cookie";

export function getUserIdFromToken(): string | null {
  const token = Cookie.get('auth_token'); // Fetch cookie properly in Next.js

  if (!token) return null;

  try {
    const decoded: { userId: string } = jwtDecode(token);
    return decoded.userId;
  } catch (error) {
    console.error("Error decoding auth_token:", error);
    return null;
  }
}

export async function fetchUserDetails() : Promise<User | null> {
  try {
    const response = await fetch("/api/userdetails/get", {
      method: "GET",
      credentials : 'include',
      headers: {
        "Content-Type": "application/json",

      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch user details");
    }

    const data = await response.json();
    return data.user; // Returns user object
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
}

export async function addToCart(productId: string, quantity: number) {
  const token = document.cookie
    .split("; ")
    .find(row => row.startsWith("auth_token="))
    ?.split("=")[1];

  console.log("---cookie---", token);

  let userId = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      userId = payload.id || payload.userId;
    } catch (error) {
      console.error("Error decoding JWT:", error);
    }
  }

  console.log("---userId---", userId);

  if (!userId) {
    console.error("No user ID found in token.");
    return { error: "User not authenticated" };
  }

  try {
    const response = await fetch('/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      credentials: "include",
     body: JSON.stringify({ userId, productId, quantity }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to add to cart');
    }

    return data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return { error: (error instanceof Error) ? error.message : 'Unknown error' };
  }
}

 
export const handleAddToCart = async (productId : string,quantity : number) => {
    const result = await addToCart(productId, quantity);
    if (result.error) {
      alert(`Error: ${result.error}`);
    } else {
      console.log('Cart updated:', result);
    }
};

export const removeCartItem = async (productId: string) => {
  try {
    const token = document.cookie
    .split("; ")
    .find(row => row.startsWith("auth_token="))
    ?.split("=")[1];

  console.log("---cookie---", token);

  let userId = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      userId = payload.id || payload.userId;
    } catch (error) {
      console.error("Error decoding JWT:", error);
    }
  }
//ddd
  console.log("---userId---", userId);

  if (!userId) {
    console.error("No user ID found in token.");
    return { error: "User not authenticated" };
  }
    const response = await fetch("/api/cart/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // ✅ Send JWT token for authentication
        
      },
      body: JSON.stringify({productId , userId}),
      credentials :"include"
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to remove item from cart");
    }

    return data.cart; // ✅ Return updated cart after deletion
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
};


export const handleRemoveItem = async (productId: string) => {
  try {
    const updatedCart = await removeCartItem( productId);
    console.log("Cart updated:", updatedCart);
    // Optionally update state here if needed
  } catch (error) {
    console.error(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addAddress = async (userId: string, addressData: any) => {
  try {
    const response = await fetch("/api/address/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": userId,
      },
      body: JSON.stringify(addressData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to add address");
    }

    return data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error adding address:", error.message);
    throw error;
  }
};

export async function addReview({
  productId,
  rating,
  description,
}: {
  productId: string;
  rating: number;
  description: string;
}) {
  try {
    const response = await fetch("/api/reviews/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ productId, rating, description }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to add review");
    }
    return data;
  } catch (error) {
    console.error("Error adding review:", error);
    return { error: (error instanceof Error) ? error.message : "An unknown error occurred" };
  }
}


export async function getReviews(productId: string) {
  try {
    const response = await fetch(`/api/reviews/${productId}`, {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch reviews");
    }

    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return { error: (error instanceof Error) ? error.message : "An unknown error occurred" };
  }
}
