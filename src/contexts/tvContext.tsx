import React, { createContext, useState, useCallback, ReactNode } from "react";
import { BaseTvShowProps, Review } from "../types/interfaces";

interface TvShowsContextInterface {
    favourites: number[];
    addToFavourites: (tvShow: BaseTvShowProps) => void;
    removeFromFavourites: (tvShow: BaseTvShowProps) => void;
    addReview: (tvShow: BaseTvShowProps, review: Review) => void;
}

const initialTvShowsContextState: TvShowsContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addReview: () => {},
};

export const TvShowsContext = createContext<TvShowsContextInterface>(initialTvShowsContextState);

const TvShowsContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [reviews, setReviews] = useState<{ [tvShowId: number]: Review }>({});

    const addToFavourites = useCallback((tvShow: BaseTvShowProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(tvShow.id)) {
                console.log("Added to favourites");
                return [...prevFavourites, tvShow.id];
            }
            return prevFavourites;
        });
    }, []);

    const removeFromFavourites = useCallback((tvShow: BaseTvShowProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((id) => id !== tvShow.id));
    }, []);

    const addReview = useCallback((tvShow: BaseTvShowProps, review: Review) => {
        setReviews((prevReviews) => ({
            ...prevReviews,
            [tvShow.id]: review,
        }));
    }, []);

    return (
        <TvShowsContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                addReview,
            }}
        >
            {children}
        </TvShowsContext.Provider>
    );
};

export default TvShowsContextProvider;
