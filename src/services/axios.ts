import axios from "axios";

const instance = axios.create({
    // baseURL: 'https://gogoanime-ceba.onrender.com/',
    baseURL: 'https://api.consumet.org/anime/gogoanime',
});

export default instance