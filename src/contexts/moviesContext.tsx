import React, { useState, useCallback, useEffect } from "react";
import { BaseMovieProps } from "../types/interfaces";
import { supabase } from '../supabaseClient';

// As with auth context, supabase material drawn from docs and this video: https://www.youtube.com/watch?v=Ewa3D-DoS5I (part of the same series)

/* Dropped playlist after the refactor to allow for persistence.
I think this makes for a more elegant user experience based on the netflix model
of all movies being in one user favourites list rather than multiple
*/
interface MovieContextInterface {
	favourites: number[];
	addToFavourites: (movie: BaseMovieProps) => void;
	removeFromFavourites: (movie: BaseMovieProps) => void;
}

const initialContextState: MovieContextInterface = {
	favourites: [],
	addToFavourites: () => { },
	removeFromFavourites: () => { },
};

// Create a context for the user's favorite movies
export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [favourites, setFavourites] = useState<number[]>([]); // State to track user's favorite movies

	// Function to get the current authenticated user (via supabase api)
	const getCurrentUser = async () => {
		try {
			const { data, error } = await supabase.auth.getUser();
			if (error) {
				throw new Error(error.message);
			}
			return data.user; // Return user data if no error
		} catch (error) {
			console.error('Error getting user:', error);
			return null; // Return null if there was an error
		}
	};

	// Effect to fetch the user's favorite movies on component mount
	useEffect(() => {
		const fetchFavorites = async () => {
			const user = await getCurrentUser(); // Get current user
			if (user) {
				try {
					// Fetch the user's favorite movies from the database
					const { data: favs, error: favError } = await supabase
						.from('MovieFavourites')
						.select('movie_id')
						.eq('user_id', user.id);
					if (favError) {
						throw new Error(favError.message);
					}
					console.log('Fetched favorites:', favs);
					// Update state with fetched favorite movie IDs
					setFavourites(favs.map((item: { movie_id: number }) => item.movie_id));
				} catch (error) {
					console.error('Error fetching favorites:', error);
				}
			}
		};

		fetchFavorites(); // Call fetchFavorites function
	}, []); // Empty dependency array to run only on component mount

	// Function to add a movie to favorites
	const addToFavourites = useCallback(async (movie: BaseMovieProps) => {
		const user = await getCurrentUser(); // Get current user
		if (user) {
			try {
				// Insert movie into the MovieFavourites table
				const { error } = await supabase
					.from('MovieFavourites')
					.insert([{ user_id: user.id, movie_id: movie.id }]);
				if (error) {
					throw new Error(error.message);
				}
				console.log(`Added movie ${movie.id} to favorites.`);
				// Update state with the new favorite movie ID
				setFavourites((prevFavourites) => [...prevFavourites, movie.id]);
			} catch (error) {
				console.error('Error adding to favorites:', error);
			}
		}
	}, []);

	// Function to remove a movie from favorites
	const removeFromFavourites = useCallback(async (movie: BaseMovieProps) => {
		const user = await getCurrentUser(); // Get current user
		if (user) {
			try {
				// Delete movie from the MovieFavourites table (outlined in supabase's site UI)
				const { error } = await supabase
					.from('MovieFavourites')
					.delete()
					.match({ user_id: user.id, movie_id: movie.id });
				if (error) {
					throw new Error(error.message);
				}
				console.log(`Removed movie ${movie.id} from favorites.`);
				// Update state by removing the movie ID
				setFavourites((prevFavourites) => prevFavourites.filter((id) => id !== movie.id));
			} catch (error) {
				console.error('Error removing from favorites:', error);
			}
		}
	}, []);

	return (
		<MoviesContext.Provider
			value={{
				favourites,
				addToFavourites,
				removeFromFavourites,
			}}
		>
			{children}
		</MoviesContext.Provider>
	);
};

export default MoviesContextProvider;
