import axios from "axios";
export const SPOTIFY_SEARCH_API = "https://api.spotify.com/v1/search";


export const getApiToken = async () => {
     const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
     }
     const body = {
        "grant_type": "client_credentials",
        "client_id": process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        "client_secret": process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
     }

     return (await axios.post("https://accounts.spotify.com/api/token", body, {headers: headers})).data["access_token"]

}


export const findPlaylistByGenre = async (genre) => {
    const headers = {
        Authorization: `Bearer ${await getApiToken()}`
      }

    const params = {
        "type": "playlist",
        "q": `genre:${genre}`
    }


    const response = await axios.get(SPOTIFY_SEARCH_API, {headers: headers, params: params});
    return response;

};

export const findPlaylistBySearch = async (query) => {
    const headers = { 
        "Authorization": `Bearer ${await getApiToken()}`
    }


    const params = {
        "type": "playlist",
        "q": query
    }


    const response = await axios.get(SPOTIFY_SEARCH_API, {headers: headers, params: params});
    return response;

};




