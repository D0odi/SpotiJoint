import { client } from "./client";

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
          code,
          redirect_uri,
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

  const fetchAccessToken = async (code, redirect_uri) => {
    try {
      const access_token = await callToExchange(code, redirect_uri);
      console.log("access_token:", access_token);
      return access_token;
    } catch (error) {
      console.error("Error fetching refresh token:", error);
    }
  };

  const fetchUserProfile = async (token_s) => {
    console.log("fetchUserProfile called ", token_s);
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token_s}`,
        },
      });
      const data = await response.json();
      console.log("User Profile name:", data.display_name);
      return {
        avatar: data.images.length !== 0 ? data.images[0].url : null,
        name: data.display_name,
        location: data.country,
      };
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
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
        const {
          is_playing,
          item: {
            artists,
            name,
            duration_ms,
            album: { images },
            external_urls: { spotify },
          },
          progress_ms,
        } = data;
        return {
          is_playing,
          artists,
          name,
          progress_ms,
          duration_ms,
          songImage: images[1].url,
          spotify_redirect: spotify,
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
