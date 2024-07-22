import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const styles = {
    root: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 4.0,
        padding: 3.0,
        backgroundColor: "rgba(0, 0, 0, 0)", // Set the background color to transparent for now. was a black box but I prefer the backdrop
        color: "white",
    },
};

interface TvShowHeaderProps {
    title: string;
}

const Header: React.FC<TvShowHeaderProps> = (headerProps) => {
    const title = headerProps.title;

    return (
        <Paper component="div" sx={styles.root}>
            <Typography variant="h4" component="h3">
                {title}
            </Typography>
        </Paper>
    );
};

export default Header;
