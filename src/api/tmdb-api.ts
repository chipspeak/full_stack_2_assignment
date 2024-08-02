/* Hopefully these are self-explanatory, but the calls that I feel aren't are commented
I will flag watchProvider here. It's an api call tmdb uses to provide the streaming services
and rental/purchase service available for a given media. I'm using it to return the logos for the view pages
and to provide the data for the hyperlink to the service.
*/

// Movie API calls

export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

/* Function to get search results with parameters
inspired by the custom api call to update our upcoming results
I thought it would be a good idea to create a custom api call for search results
rather than try to filter through the results of a generic discover call
hopefully as I expand this, now that I know it works, it will allow for more deliberate
search filtering. I intend to add more parameters as I go along including a media field that will
allow the user to search via movies or tv, hopefully preventing the need for duplicate pages/components
*/
export const getSearchResults = (
  // the params for the moment (purely movie focused)
  media: string,
  genre: string,
  year: string,
  rating: string
) => {
  // Helper function to format date as YYYY-MM-DD
  const formatDate = (year: string, month: number, day: number) => {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  // Define the start and end dates for the given year
  const startDate = formatDate(year, 1, 1); // January 1st of the year
  const endDate = formatDate(year, 12, 31); // December 31st of the year

  let url = "";
  if (media === "movie") {
    // the base url for the api call prior to any additional params (+= the params to add them to the url)
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1`;
  }

  if (media === "tv") {
    // the base url for the api call prior to any additional params (+= the params to add them to the url)
    url = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1`;
  }

    // Add genre filter if provided (keeping these optional as any submission of the card will result in an api call) 
    if (genre) {
      url += `&with_genres=${genre}`;
    }

    // Add date range filter based on year (primary_release_date to obscure re-releases)
    if (year) {
      if (media === "movie") {
        url += `&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}`;
      } else if (media === "tv") {
        url += `&first_air_date.gte=${startDate}&first_air_date.lte=${endDate}`;
      }
    }

    // Add rating filter if provided
    if (rating) {
      url += `&vote_average.gte=${rating}`;
    }

  /* Fetch the data from the url before converting to json as elsewhere but then only returning the results
  this saves us needing to destruct the results from the data object in the component and allows us to immediately
  pass these to a list component in the view (e.g the MovieListPageTemplate component)
  */
console.log("Fetching URL:", url); // Debugging: Log URL to check parameters

return fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log("API Response Data:", data); // Debugging: Log response data
    return data.results; // Return only results
  })
  .catch(err => {
    console.error("Error fetching data:", err);
    throw err;
  });
};

/* This is pretty hacky but it's to try and successfully get upcoming movies while being able to fuzzy search
Because upcoming is essentially a discover call with a list of additional parameters, this attempts to prevent
duplicate movies by setting the min date as oct 1st 2024.
*/
export const getUpcomingMovies = () => {
  // Function to format the date as YYYY-MM-DD
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Specific date to filter upcoming movies
  const specificDate = new Date(2024, 10, 1); // Month is 0-indexed, so 11 = December

  // Format the future date
  const minDate = formatDate(specificDate);

  return fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${minDate}&api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then(res => res.json());
};

export const getTopMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`
  )
    .then(res => res.json());
};

export const getSimilarMovies = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1&include_adult=false&page=1`
  )
    .then(res => res.json());
};


export const getMovieWatchProviders = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
  )
    .then(res => res.json());
};

export const getMovie = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to get movie data. Response status: ${response.status}`);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getGenres = () => {
  return fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getMovieImages = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      return response.json();
    })
    .then((json) => {
      const posters = json.posters || [];
      const backdrops = json.backdrops || [];
      return { posters, backdrops };
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieVideos = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      return response.json();
    })
    .then((json) => {
      const results = json.results || [];
      return { results };
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieCast = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch cast data");
      }
      return response.json();
    })
    .then((json) => {
      const cast = json.cast || [];
      return { cast }; // Return an object with the cast array
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieReviews = (id: string | number) => { //movie id can be string or number
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json.results);
      return json.results;
    });
};

export const getActor = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch actor data");
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getActorMovieCredits = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch actor movie credits");
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

// Tv section

export const getTvShows = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch TV shows. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getTvShow = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to get TV show data. Response status: ${response.status}`);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getTvShowCast = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch TV show cast data");
      }
      return response.json();
    })
    .then((json) => {
      const cast = json.cast || [];
      return { cast }; // Return an object with the cast array
    })
    .catch((error) => {
      throw error;
    });
};

export const getTvReviews = (id: string | number) => { //movie id can be string or number
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json.results);
      return json.results;
    });
};

export const getSimilarTvShows = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1&include_adult=false&page=1`
  )
    .then((res) => res.json())
    .catch((error) => {
      throw error;
    });
};

export const getTvShowWatchProviders = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .catch((error) => {
      throw error;
    });
};

export const getTvShowImages = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      return response.json();
    })
    .then((json) => {
      const posters = json.posters || [];
      const backdrops = json.backdrops || [];
      return { posters, backdrops };
    })
    .catch((error) => {
      throw error;
    });
};

export const getTvShowVideos = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      return response.json();
    })
    .then((json) => {
      const results = json.results || [];
      return { results };
    })
    .catch((error) => {
      throw error;
    });
};

export const getTvGenres = () => {
  return fetch(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getActorTvCredits = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch actor TV credits");
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};
