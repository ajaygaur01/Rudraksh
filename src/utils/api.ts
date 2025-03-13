import { jwtDecode } from "jwt-decode";
import Cookie from "js-cookie";

function getUserIdFromToken(): string | null {
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
    return { error: error.message || 'Unknown error' };
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

export const removeCartItem = async (userId: string, productId: string) => {
  try {
    // Retrieve token from cookies
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("auth_token="))
      ?.split("=")[1];

    if (!token) {
      throw new Error("Unauthorized: No token found");
    }

    const response = await fetch("/api/cart/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // ✅ Send JWT token for authentication
      },
      body: JSON.stringify({ userId, productId }),
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


export const handleRemoveItem = async (userId: string, productId: string) => {
  try {
    const updatedCart = await removeCartItem(userId, productId);
    console.log("Cart updated:", updatedCart);
    // Optionally update state here if needed
  } catch (error) {
    console.error(error);
  }
};

  