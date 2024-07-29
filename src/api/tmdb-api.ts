export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error
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
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${minDate}&api_key=${import.meta.env.VITE_TMDB_KEY}`)
    .then(res => res.json())
};

export const getTopMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`
  )
    .then(res => res.json())
};

export const getSimilarMovies = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1&include_adult=false&page=1`
  )
    .then(res => res.json())
}

export const getMovieWatchProviders = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then(res => res.json())
};


export const getMovie = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to get movie data. Response status: ${response.status}`);
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US"
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getMovieImages = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
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
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_KEY}`
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
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
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
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json.results);
      return json.results;
    });
};

export const getActor = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
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
}

export const getActorMovieCredits = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
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
}

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
    `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
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
    `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
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
    `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((res) => res.json())
    .catch((error) => {
      throw error;
    });
};

export const getTvShowImages = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
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
    `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${import.meta.env.VITE_TMDB_KEY}`
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
    "https://api.themoviedb.org/3/genre/tv/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US"
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getActorTvCredits = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
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
}

