import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import TopRatedMoviesPage from "./pages/topRatedMovies";
import SiteHeader from "./components/siteHeader";
import UpcomingMoviePage from "./pages/upcomingMoviesPage";
import MoviesContextProvider from "./contexts/moviesContext";
import TvShowsContextProvider from "./contexts/tvContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import ActorPage from './pages/actorDetailsPage';
import LoginPage from './pages/loginPage';
import LogoutPage from './pages/logoutPage';
import ProtectedRoute from './components/protectedRoute';
import TV from "./pages/tvPage";
import TvDetailsPage from "./pages/tvDetailsPage";
import { QueryClientProvider, QueryClient } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools"; removed after moving filter buttons to bottom
import MustWatchPage from "./pages/mustWatchPage";
import FavouriteTvShowsPage from "./pages/favouriteTvShowsPage";
import AuthProvider from "./contexts/authContext";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./styles.css"; 
import PageTransition from "./pageTransition";
import AdvancedSearchPage from "./pages/advancedSearchPage";
import TvReviewPage from "./pages/tvReviewPage";

document.body.style.backgroundColor = '#1a1a1a'; // Very dark grey/black
document.body.style.color = 'white'; // Text color

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <SiteHeader />
            <MoviesContextProvider>
              <TvShowsContextProvider>
                <PageTransition>
                  <Routes>
                    {/* Movie Routes */}
                    <Route path="/movies/favourites" element={
                      <ProtectedRoute>
                        <FavouriteMoviesPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/movies/playlist" element={<MustWatchPage />} />
                    <Route path="/movies/:id" element={<MoviePage />} />
                    <Route path="/reviews/:id" element={<MovieReviewPage />} />
                    <Route path="/tvreviews/:id" element={<TvReviewPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/top" element={<TopRatedMoviesPage />} />
                    <Route path="/upcoming" element={<UpcomingMoviePage />} />
                    <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                    <Route path="/actors/:id" element={<ActorPage />} />
                    <Route path="/search" element={<AdvancedSearchPage />} />
                    {/* TV Show Routes */}
                    <Route path="/tv" element={<TV />} />
                    <Route path="/tvshows/favourites" element={
                      <ProtectedRoute>
                        <FavouriteTvShowsPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/tvshows/:id" element={<TvDetailsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/logout" element={<LogoutPage />} />

                    {/* Redirect any unknown routes to home */}
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </PageTransition>
              </TvShowsContextProvider>
            </MoviesContextProvider>
          </AuthProvider>
        </BrowserRouter>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
