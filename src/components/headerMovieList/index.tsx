import React from "react";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
// import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const styles = {
    root: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 4.0,
        padding: 3.0,
        backgroundColor: "#1a1a1a",
        color: "white",
    },
};

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = (headerProps) => {
    const title = headerProps.title

    return (
        <Paper component="div" sx={styles.root}>
            <Typography variant="h4" component="h3">
                {title}
            </Typography>
        </Paper>
    );
};

export default Header;