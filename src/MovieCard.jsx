import React from 'react';

const MovieCard = ({ movie }) => {
    return (
        <div className="movie">
            <div>
                <p>{movie.Year}</p>
            </div>
            <div>
                <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noopener noreferrer">
                    <img
                        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
                        alt={movie.Title}
                    />
                </a>
            </div>
            <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
                {movie.imdbRating && (
                    <p>IMDb Rating: <strong>{movie.imdbRating}</strong></p>
                )}
            </div>
        </div>
    );
};

export default MovieCard;
