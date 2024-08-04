import React, { createContext, useState, useCallback, useEffect, ReactNode } from "react";
import { BaseTvShowProps } from "../types/interfaces";
import { supabase } from '../supabaseClient';

// This mirrors the MovieContextProvider but for TV shows after the refactor to allow backend persistence
interface TvShowsContextInterface {
	favourites: number[];
	addToFavourites: (tvShow: BaseTvShowProps) => void;
	removeFromFavourites: (tvShow: BaseTvShowProps) => void;
}

const initialTvShowsContextState: TvShowsContextInterface = {
	favourites: [],
	addToFavourites: () => { },
	removeFromFavourites: () => { },
};

export const TvShowsContext = createContext<TvShowsContextInterface>(initialTvShowsContextState);

const TvShowsContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [favourites, setFavourites] = useState<number[]>([]);

	// Function to get the current user
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

	// Fetch existing favourites on component mount
	useEffect(() => {
		const fetchFavourites = async () => {
			const user = await getCurrentUser();
			if (user) {
				try {
					const { data: favs, error: favError } = await supabase
						.from('TvFavourites')
						.select('tv_show_id')
						.eq('user_id', user.id);
					if (favError) {
						throw new Error(favError.message);
					}
					console.log('Fetched favourites:', favs);
					setFavourites(favs.map((item: { tv_show_id: number }) => item.tv_show_id));
				} catch (error) {
					console.error('Error fetching favourites:', error);
				}
			}
		};

		fetchFavourites(); // Call fetchFavourites function
	}, []); // Empty dependency array to run only on component mount

	// Add a tv show to favourites
	const addToFavourites = useCallback(async (tvShow: BaseTvShowProps) => {
		const user = await getCurrentUser();
		if (user) {
			try {
				const { error } = await supabase
					.from('TvFavourites')
					.insert([{ user_id: user.id, tv_show_id: tvShow.id }]);
				if (error) {
					throw new Error(error.message);
				}
				console.log(`Added tv show ${tvShow.id} to favourites.`);
				setFavourites((prevFavourites) => [...prevFavourites, tvShow.id]);
			} catch (error) {
				console.error('Error adding to favourites:', error);
			}
		}
	}, []);

	// Remove a tv show from favourites
	const removeFromFavourites = useCallback(async (tvShow: BaseTvShowProps) => {
		const user = await getCurrentUser();
		if (user) {
			try {
				const { error } = await supabase
					.from('TvFavourites')
					.delete()
					.match({ user_id: user.id, tv_show_id: tvShow.id });
				if (error) {
					throw new Error(error.message);
				}
				console.log(`Removed tv show ${tvShow.id} from favourites.`);
				setFavourites((prevFavourites) => prevFavourites.filter((id) => id !== tvShow.id));
			} catch (error) {
				console.error('Error removing from favourites:', error);
			}
		}
	}, []);



	return (
		<TvShowsContext.Provider
			value={{
				favourites,
				addToFavourites,
				removeFromFavourites,
			}}
		>
			{children}
		</TvShowsContext.Provider>
	);
};

export default TvShowsContextProvider;
