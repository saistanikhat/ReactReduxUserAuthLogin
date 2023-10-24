export default {
  fetchUser: async (token: string | null) => {
    try {
      const response = await fetch("https://reqres.in/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
};
