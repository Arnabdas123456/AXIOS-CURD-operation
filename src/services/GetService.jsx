import axios from "axios"

// This is the API URL for fetching movie data from OMDB API
const api = axios.create({ // Creating an instance of axios with a base URL
    baseURL: "https://www.omdbapi.com/",
});

// This function fetches movie data from the API and returns the response
export const getMovie = () => {
    return api.get("?i=tt38961986&apikey=1c12799f&s=sex&page=1"); // The API key and search parameters are included in the request
} 