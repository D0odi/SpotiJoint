import React, { useState } from "react";

export const AppContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [token_s, setToken_s] = useState(null);
  const [spotifyAPI, setSpotifyAPI] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [token, setToken] = useState(null);
  const [homeBackground, setHomeBackground] = useState(null);

  const params = {
    homeBackground,
    setHomeBackground,
    token_s,
    spotifyAPI,
    setToken_s,
    setSpotifyAPI,
    loggedInUser,
    setLoggedInUser,
    token,
    setToken,
  };

  return <AppContext.Provider value={params}>{children}</AppContext.Provider>;
};
