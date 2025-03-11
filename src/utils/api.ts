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
    const userId = getUserIdFromToken();
    console.log("---userId---",userId);
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': "cm84l3nqr0001n4bss8b8d7a3", // Replace with actual user ID from auth state
        },
        body: JSON.stringify({ productId, quantity }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add to cart');
      }
  
      return data; // Returns updated cart details
    } catch (error) {
      console.error('Error adding to cart:', error);
      if (error instanceof Error) {
        return { error: error.message };
      } else {
        return { error: 'An unknown error occurred' };
      }
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
  