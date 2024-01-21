import client from "./client";

export default Spotify = async (token) => {
  const check = () => {
    return "Connected";
  };
  const callToExchange = async (code) => {
    console.log("code:", code);
    const res = await client.post(
      "/exchange",
      {
        code: code,
      },
      {
        headers: {
          Accept: "application/json",
          Auth: `JWT ${token}`,
        },
      }
    );

    console.log(code);

    return res.data.access_token;
  };

  const fetchAccessToken = async (response) => {
    if (response?.type === "success") {
      const { code } = response.params;
      try {
        const access_token = await callToExchange(code);
        console.log("access_token:", access_token);
        return access_token;
      } catch (error) {
        console.error("Error fetching refresh token:", error);
      }
    }
  };

  const fetchUserProfile = async (spotify_token) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${spotify_token}`,
        },
      });
      const data = await response.json();
      console.log("User Profile:", data);
      return {
        avatar: data.images[0].url,
        name: data.display_name,
        location: data.country,
      };
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return { fetchAccessToken, fetchUserProfile, check };
};