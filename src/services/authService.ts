import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default {
  login: async (email: string, password: string) => {
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }
      debugger;
      toast.success("Logged in successfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });

      const data = await response.json();
      return data.token;
    } catch (error) {
      throw error;
    }
  },
};
