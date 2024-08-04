# React App Assignment

###### Full Stack Development 2, HDip in Computer Science

__Name:__ Patrick O'Connor

__Deployed URL:__ https://pmdb.vercel.app/

__Video Demo:__ ..... URL of your YouTube video demonstration ....

This repository contains an implementation of the Movie Fans Web Application from the HDip in Computer Science, Full Stack 2 labs. This application has been expanded on for this assignment and renamed PMDB

### Features

+ Visual Enhancements inspired by modern streaming sites (monochrome pallet for visual contrast and image heavy components).
+ Movie cards are hoverable, clickable and feature dynamic details upon hovering on the bottom section.
+ Conditional logic in rendering so favourite buttons and protected routes etc do not appear unless logged in (the protected routes can still be demonstrated by using the /movies/favourites url when not authenticated. This will redirect to login).
+ Server state caching present since labs.
+ Hamburger menu for mobile view.
+ Page transitions.
+ Augmented upcoming movies api call. It's just a different version of discover when used normally but I found it to be unpredictable and would often render similar results to discover. I've instead used a discover call where I pass a specific date (Dec 2024) to the call to ensure results that are from ahead of this date. 
+ Extensive data hyperlinking throughout the user experience via clicking on various cards (e.g movie -> actor -> credits -> tv).
+ Fuzzy search implemented in filter allowing for typos etc in search (more akin to the netflix search experience).
+ Sorting (ordering) lists by date, rating etc. Present in all pages including favourites.
+ New views for TV, Actors and Top Rated Movies.
+ Favourite TV series which mirrors the functionality of favourite movies.
+ Actors page features details such as bio and photo in addition to a toggle to select their Movie or TV credits and conditional logic to display the choice via list components.
+ Pagination on main pages.
+ Advanced search uses a user input form with set selects(including type of media, year of release etc) to pass these as variables to a parameterised discover api call.
+ Initial dummy login component from lecture replaced with supabase/github OAuth
+ Supabase used for persistence of favourites across users (each saved favourite has a userid value that is then used to retrieve their specific favourites in the context).
+ Site deployed via vercel (link above).
+ Details pages now include trailer, backdrop image and a cast (scrollable card-based links to actor pages).
+ Details page also features a similar movies/show section that utilises the list component and thus allows navigation to these pages also.
+ Details page features the streaming services (in logo form thanks to a JustWatch API call supported by TMDB) that the media appears on via JustWatch and a hyperlink to the media's page on their site (this requires some small regex logic to take the title string and convert it to the hyphenated version JustWatch uses in their URL construction. This is the closest I could get to providing direct streaming links without using web-scraping etc).
+ Some storybook support for the redesigned elements such as the movieCard and for new features such as the advanced search.
+ Worth noting I've removed some components (writing reviews, must watch/playlist) as I felt they were superfluous and were already functional in the labs. Now a user can favourite anything, upcoming or current etc as is the case with Netflix etc. I feel this is a smoother user experience, hence the choice.

### Setup requirements.

I would advise using the deployed version as supabase and github auth hook have been reconfigured with these in mind. If in the event that you wish to clone it locally I can provide the env file if necessary. At this point I would have to manually reconfigure supabase and github so as above, please see the deployed version if possible.

### API endpoints

+ Discover list of movies - discover/movie __(present since labs)__
+ Return Top Rated movies - movie/top_rated
+ Return similar movies - movie/id/similar
+ Return the WatchProviders for a movie - movie/id/watch/providers
+ Return a specific movie's details - movie/id __(present since labs)__
+ Return all movie genres recorded by TMDB - genre/movie/list __(present since labs)__
+ Return images stored by TMDB related to a movie - movie/id/images
+ Return videos stored by TMDB related to a movie - movie/id/videos
+ Return the cast for a specific movie - movie/id/credits
+ Return the reviews for a specific movie - movie/id/reviews
+ Return the details for a specific actor - person/id
+ Return the movie credits for a specific actor - person/id/movie_credits
+ Discover list of tv shows - discover/tv
+ Return a specific tv shows details - tv/id
+ Return the cast for a specific tv show - tv/id/aggregate_credits (this returns an aggregate rather than just the latest season)
+ Return the reviews for a specific tv show - tv/id/reviews
+ Return similar tv shows - tv/id/similar
+ Return the WatchProviders for a tv show - tv/id/watch/providers
+ Return images stored by TMDB related to a tv show - tv/id/images
+ Return videos stored by TMDB related to a tv show - tv/id/videos
+ Return all tv show genres recorded by TMDB - genre/tv/list (this is a different list from movie genres)
+ Return the tv credits for a specific actor - person/id/tv_credits

### Routing

__Protected Routes__
+ /tvshows/favourites - displays the users favourited tv series
+ /movies/favourites - displays the users favourited movies __(present since labs)__

__Public Routes__
+ /tvreviews/:id - displays reviews for a specific tv show 
+ /top - lists top rated movies
+ /actors/:id - displays details page for a specific actor (passed as a param via the movie/tv details pages)
+ /search - displays the advanced search form and then the returned list after the form is submitted
+ /tv - displays a list of movies
+ /tvshows/:id - displays details page for a specific tv show
+ /login - logs in via supabase OAuth (github in this case)
+ /logout - clears the users tokens and auth
+ "*" - any unknown routes direct back to the homepage

### Third Party Components/Integration

+ JustWatch depends on their own API but it's leveraged by TMDB in my use case. In the use of it, we pass a movie or tv to the call and TMDB returns WatchProviders via JustWatch. In the application we're only using "flatrate" and "Ireland" to return streaming services for Ireland. The API can actually return VOD purchase sites and various regions but this wasn't necessary for this use case.
+ As mentioned in features, param-based api call using Discover call with customised fields depending on search input.
+ Supabase OAuth via github - supabase client is initialised in its own file before being used by AuthContext. The client is used to interact with the Supabase API to retrieve sessions, set tokens and set users.  
+ Supabase database - two simple tables were created within the Supabase web UI for movies and tv favourites. When a user adds a favourite it triggers a callback to the Supabase API where the new entry is inserted into the relevant table. The users id is written to this entry to allow later retrieval. All users share a single table but the userid is a UUID used to retrieve only the specific users entries. Same logic applies for tv shows and movies. Deletion logic is similar.
+ Fuse.js used for fuzzy search. This is used on a number of pages. useEffect is leveraged to initialise a fuzzy instance whenever new data is loaded. Fuzzy then takes this data and applies a specific threshold of allowed results to a key within the data (title in our case) This is the initial data that fuse will refer to (when our page loads and retrieves data via API call). Once it has been initialised, fuse is used in conjunction with the title search in filter. The user input is compared to the data fuse has been provided upon initialisation and then fuse returns results based on the threshold set for fuzzy matching.

### Independent learning

+ Vercel deployment: https://medium.com/@abdulmuizzayo6/how-to-host-your-react-app-on-vercel-effectively-7ae35b259044 I'd deployed my Full Stack 1 assignment to vercel but this article was helpful rectifying the issues a react application can run into where refreshes result in 404 errors. As per this article, creating a vercel.json file like the one in the article rectified the issue
+ Supabase Auth: https://www.youtube.com/watch?v=EOppukfgL_o and https://supabase.com/docs/guides/auth This expanded on the dummy auth from the lectures using AuthContext and randomised creds. The content from the video and docs were integrated with this existing dummy login. Majority of the functionality is contained within contexts/authContext.tsx . The supabaseClient.tsx page simply initialises the client for use elsewhere.
+ Supabase DB: https://www.youtube.com/watch?v=Ewa3D-DoS5I and https://supabase.com/docs/guides/database/postgres/row-level-security This was fairly simple to implement on top of the existing moviesContext.tsx functionality re favourites. Following the video helped in terms of setting up the tables in the Supabase UI correctly and the docs helped in terms of API syntax.
+ Watch Providers: https://developer.themoviedb.org/reference/movie-watch-providers As mentioned in both api/tmdb-api.tsx and components/templateMoviePage.tsx this implementation is an alternative to using JustWatch's own widget. I applied for the use of it but heard nothing back. The api call response data is filtered to only provide 'flatrate' and 'IE' results. The results are looped through to pass their 'logo_path' to tmdb to retrieve and display the streaming service logos.
+ Hamburger Nav: https://www.freecodecamp.org/news/how-to-create-an-animated-hamburger-menu-in-react/ Fairly self-explanatory but this implementation can be found in components/siteHeader/index.tsx where it is triggered by the use of useMediaQuery to check if the view is mobile. The return is wrapped in a conditional to render this if the condition is met versus the standard navbar.
+ Backdrops TMDB: https://www.themoviedb.org/bible/image/59f758339251416e71000065 This was inspired by numerous TMDB youtube videos where the background images all seemed to be devoid of text and high res. Upon reading up on the backdrop it was implemented as a static background image in the templateMoviePage and templateTvShowPage (components/templateMoviePage/index.tsx etc). The backdrop url is pointed to as the background image for the whole component.
+ Theme provider: https://react-ui.dev/components/ThemeProvider Arrived at this while trying to solve issues with css styles/sx values not being correctly inherited by components. This largely serves to wrap the site in the same styling as my components to prevent any whitespace in the gaps between components. In an ideal world I'd implement this site-wide to save on unnecessary css duplication. See src/theme.tsx for the specific code.
+ Page transitions: https://reactcommunity.org/react-transition-group After trying a few different solutions to page transitions in React this proved to be the simplest and only solution I could get to work. In src/pageTransitions.tsx we use location.pathname as a key and when this value changes, the CSSTransition component from React is triggered. The actual aesthetic of this is governed by src/styles.css .
+ Pagination: https://mui.com/material-ui/react-pagination/ This was also relatively straightforward to implement and can be found throughout the main pages on the site. There was already a chain of arrays for filtering/sorting etc and pagination was added to this so that the final results are passed to the pagination component. useState is used to determine the current page and additional logic handles the total number of pages via Math.Ceil. This logic is discussed in greater detail within the code comments (see pages/homePage.tsx lines 119 - 130 for example.)

### Use of AI

With all of my other assignments I've written a section on this and it's no different here. Chat GPT was certainly helpful for resolving some of the more esoteric CSS issues I was having (examples like the text fields not having correctly inverted colours in the search filter for example). It also proved helpful in terms of boilerplate or tedious tasks where I was asking it to simply refactor my code with slightly different variable names. This occured when implementing TV functionality. My initial intention had been to reuse components and provide logic to determine the type of media but this wasted a day and proved messy so I went with the less elegant approach of duplicating components. It was very helpful to simply pass my templateMoviePage.tsx file and tell it to refactor this with altered variable names and point it to the correct query from my API file.

Additionally, as was the case with Full Stack 1, the vscode CoPilot extension proved extremely useful when resolving typescript syntax issues and when commenting up code. Once I'd written a number of comments in a file already, it adapted well to my style of commenting and often thrust in the correct direction in terms of explanations. It wasn't perfect obviously but it made some of this work much more efficient. Another simple quality of life solution it provided was being able to type out the component name in any file and then have the option to immediately add an import line without having to do it manually.

My thoughts remain largely the same as full stack 1 assignments, AI excels as a productivity tool in terms of boilerplate code, mundane adjustments and syntax issues/debugging however its limits in the context of a heavily component-based project definitely come to the fore. The lack of a broad contextual understanding of a project means it often suggests wildly incompatible code and as a result, it still needs a disproportionate amount of direction. 
