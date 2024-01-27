import client from "./client";

const formatTime = (ms) => {
  let totalSeconds = Math.floor(ms / 1000);
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  return `${minutes}:${seconds}`;
};

export default Spotify = async (user_token) => {
  const check = () => {
    return "Spotify.js connected";
  };
  const callToExchange = async (code, redirect_uri) => {
    try {
      console.log("code:", code);
      console.log("user_token:", user_token);
      const res = await client.get("/exchange", {
        params: {
          code: code,
          redirect_uri: redirect_uri,
        },
        headers: {
          Accept: "application/json",
          Auth: `JWT ${user_token}`,
        },
      });

      console.log("res.data:", res.data);

      return res.data.access_token;
    } catch (error) {
      console.error("Error exchanging code:", error);
    }
  };

  const fetchAccessToken = async (response, redirect_uri) => {
    console.log("call");
    if (response?.type === "success") {
      const { code } = response.params;
      try {
        const access_token = await callToExchange(code, redirect_uri);
        console.log("access_token:", access_token);
        return access_token;
      } catch (error) {
        console.error("Error fetching refresh token:", error);
      }
    } else {
      console.log("Error fetching refresh token");
    }
  };

  const fetchUserProfile = async (token_s) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token_s}`,
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

  const fetchCurrentPlaying = async (token_s) => {
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: `Bearer ${token_s}`,
          },
        }
      );

      if (response.status == 200) {
        const data = await response.json();
        return {
          name: data.item.name,
          progress_ms: formatTime(data.progress_ms),
          songImage: data.item.album.images[2].url,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching currently playing track:", error);
    }
  };

  return { fetchAccessToken, fetchUserProfile, fetchCurrentPlaying, check };
};
