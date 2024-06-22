import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";


interface MovieContextInterface {
    favourites: number[];
    playlist: number[];  // NEW
    addToFavourites: ((movie: BaseMovieProps) => void);
    removeFromFavourites: ((movie: BaseMovieProps) => void);
    addToPlaylist: ((movie: BaseMovieProps) => void);  // NEW
    removeFromPlaylist: ((movie: BaseMovieProps) => void);  // NEW
    addReview: ((movie: BaseMovieProps, review: Review) => void);  // NEW
}

const initialContextState: MovieContextInterface = {
    favourites: [],
    playlist: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addToPlaylist: (movie) => { movie.id },  // NEW
    removeFromPlaylist: (movie) => { movie.id },  // NEW
    addReview: (movie, review) => { movie.id, review},  // NEW
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [myReviews, setMyReviews] = useState<Review[]>( [] )  // NEW
    const addReview = (movie:BaseMovieProps, review: Review) => {   // NEW
        setMyReviews( {...myReviews, [movie.id]: review } )
      };

    const [favourites, setFavourites] = useState<number[]>([]);

    const addToFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(movie.id)) {
                return [...prevFavourites, movie.id];
            }
            return prevFavourites;
        });
    }, []);

    const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
    }, []);


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [playlist, setPlaylist] = useState<number[]>([]);  // NEW

    const addToPlaylist = useCallback((movie: BaseMovieProps) => {  // NEW
        setPlaylist((prevPlaylist) => {
            if (!prevPlaylist.includes(movie.id)) {
                return [...prevPlaylist, movie.id];
            }
            return prevPlaylist;
        });
    }, []);

    const removeFromPlaylist = useCallback((movie: BaseMovieProps) => {  // NEW
        setPlaylist((prevPlaylist) => prevPlaylist.filter((mId) => mId !== movie.id));
    }, []);

    

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                playlist,  // NEW
                addToFavourites,
                removeFromFavourites,
                addToPlaylist,  // NEW
                removeFromPlaylist,  // NEW
                addReview,    // NEW
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;