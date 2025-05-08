import { useEffect, useState } from "react";
import { Card } from '../components/UI/Card';
import { getMovie } from "../services/GetService";

export const Movie = () => {
    const [data, setData] = useState([]);
    // This function fetches movie data from the API and updates the state
    const getMovieData = async () => {
        try {
            const res = await getMovie(); // Fetching movie data from the API
            console.log(res.data.Search);
            setData(res.data.Search); // Updating the state with the fetched data
        } catch (error) {
            console.error("Error message:", error.message);
            console.error("Error status:", error.response.status);
            console.error("Error data:", error.response.data);
        }
    };
    // useEffect hook to call getMovieData when the component mounts
    // This ensures that the movie data is fetched only once when the component is first rendered
    useEffect(() => {
        getMovieData();
    }, []);

    return (
        <ul className="grid-wrapper">
            {data.map((currData) => {
                return <Card key={currData.imdbID} movieData={currData} />;
            })};
        </ul>
    );
};