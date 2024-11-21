import { useEffect, useState } from "react";
import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=a4e98e76';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        try {
            const response = await fetch(`${API_URL}&s=${title}`);
            const data = await response.json();

            if (data.Search) {
                // Fetch IMDb ratings for each movie
                const moviesWithRatings = await Promise.all(
                    data.Search.map(async (movie) => {
                        const movieDetailsResponse = await fetch(`${API_URL}&i=${movie.imdbID}`);
                        const movieDetails = await movieDetailsResponse.json();
                        return { ...movie, imdbRating: movieDetails.imdbRating };
                    })
                );
                setMovies(moviesWithRatings);
            } else {
                setMovies([]);
            }
        } catch (error) {
            console.error("Error fetching movie data:", error);
        }
    };

    useEffect(() => {
        searchMovies("Batman");
    }, []);

    return (
        <div className="app">
            <h1>MovieGap</h1>

            <div className="search">
                <input
                    placeholder="Search for Movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            <div className="container">
                {movies && movies.length > 0 ? (
                    movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))
                ) : (
                    <p>No movies found</p>
                )}
            </div>
        </div>
    );
};

export default App;
