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

export const getHeaders = async () => { 
    return { "Authorization": `Bearer ${await getApiToken()}` }
}


export const findPlaylistByGenre = async (genre) => {

    const params = {
        "type": "playlist",
        "q": `genre:${genre}`
    }

    const response = await axios.get(SPOTIFY_SEARCH_API, {headers: await getHeaders(), params: params});
    return response;

};

export const findPlaylistBySearch = async (query) => {
    const params = {
        "type": "playlist",
        "q": query
    }

    const response = await axios.get(SPOTIFY_SEARCH_API, {headers: await getHeaders(), params: params});
    return response;

};

export const searchSpotify = async (query) => {
    const params = {
        "type": "track,album,artist,playlist",
        "q": query
    }
    
    const response = await axios.get(SPOTIFY_SEARCH_API, {headers: await getHeaders(), params: params});
    if (response.status != 200) {
        console.error(response); 
        throw new Error("Spotify API returned an error", response.statusText)
    }
    return response.data;
}




