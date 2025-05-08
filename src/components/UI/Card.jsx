export const Card = ({ movieData }) => {
    const { Poster, imdbID } = movieData;
    return (
        <>
            <li className="hero-container">
                <div className="main_container">
                    <div className="poster-container">
                        <img src={Poster} alt={imdbID} className="poster" />
                    </div>
                    <div className="ticket-container">
                        <div className="ticket-contain">
                            <button className="ticket-buy">Watch Now</button>
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
};
