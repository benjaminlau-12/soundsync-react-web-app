import axios from 'axios';
import { getHeaders } from '../Search/client';


export const findById = async (id, type) => {
    const API = `https://api.spotify.com/v1/${type}/${id}`;


    const response = await axios.get(API, {headers: await getHeaders()});
    return response;

};
