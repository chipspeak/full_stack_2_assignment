import React from "react";
import { useEffect } from "react";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseMovieProps, MovieDetailsProps } from "../types/interfaces";

const WriteReviewPage: React.FC = () => {
    // Scroll to the top of the page when the component mounts (this ensures no errant page positions after loads from hyperlinks)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const location = useLocation()
    const { movieId } = location.state;
    const { data: movie, error, isLoading, isError } = useQuery<MovieDetailsProps, Error>(
        ["movie", movieId],
        () => getMovie(movieId)
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    return (
        <>
            {movie ? (
                    <PageTemplate movie={movie}>
                        <ReviewForm {...movie} />
                    </PageTemplate>
            ) : (
                <p>Waiting for movie review details</p>
            )}
        </>
    );
};

export default WriteReviewPage;