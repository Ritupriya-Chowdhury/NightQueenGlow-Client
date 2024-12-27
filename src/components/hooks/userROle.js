
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthCotext";

export const useRole = () => {
    const { user } = useContext(AuthContext);
 

  if (!user) {
    return null; // No user is logged in
  }

  return user.role; // Return the user's role (buyer, seller, admin)
};
