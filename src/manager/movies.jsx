import React, { useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Movies() {
    const navigate = useNavigate();
    const [movies, setMovies] = React.useState([]);
    const BASE_URL = "http://localhost:5000/";

    useEffect(() => {
    axios.get(`${BASE_URL}api/movies`)
      .then(res => setMovies(res.data || []))
      .catch(err => console.error("Movies error:", err));
  }, []);

    const handleMovieClick = (movieId) => {
        navigate(`/moviedetails/${movieId}`);
    }

    if (!movies.length) {
        return <p className="text-center mt-10">No movies available.</p>;
    }

    return (
        <div className="p-4 bg-white">
            <h1 className="text-2xl font-bold mb-4">Movies</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <div
                        key={movie._id}
                        className="cursor-pointer border rounded-lg p-2 hover:shadow-lg transition-shadow duration-200"
                        onClick={() => handleMovieClick(movie._id)}
                    >
                        <img src={movie.infoMo.somePic} alt={movie.nameMo} className="w-full h-auto rounded" />
                    </div>
                ))}
            </div>
        </div>
    );

}
export default Movies;