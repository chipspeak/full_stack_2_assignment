import React, { useState } from "react";
import { Drawer, Fab, Box } from "@mui/material";
import SortMoviesCard from "../sortMoviesCard";

// Styles for the FAB button and the FAB container (Same thematic approach as filter fab button)
const styles = {
  fabBox: {
    position: "fixed",
    top: 150,
    left: 30,
  },
  fabContainer: {
    backgroundColor: "white",
    color: "black",
    "&:hover": {
      backgroundColor: "#666666",
      color: "white",
    },
  },
};

// The sort movies UI props interface
interface SortMoviesUIProps {
  onSortChange: (sortOption: string) => void;
}

// The sort movies UI component which takes the onSortChange function as a prop
const SortMoviesUI: React.FC<SortMoviesUIProps> = ({ onSortChange }) => {
  const [sortOpen, setSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string>("none");

  // Function to handle the sort change
  const handleSortChange = (sortOption: string) => {
    onSortChange(sortOption); // Call the onSortChange function with the new sort option
    setSortOption(sortOption); // Set the sort option state to the new sort option
    setSortOpen(false); // Close the drawer after selecting an option
  };

  return (
    <>
      <Box sx={styles.fabBox}>
        <Fab
          color="secondary"
          variant="extended"
          onClick={() => setSortOpen(true)}
          sx={styles.fabContainer}
        >
          Sort
        </Fab>
      </Box>
      <Drawer
        anchor="right"
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        PaperProps={{ sx: { backgroundColor: "#1a1a1a", color: "white" } }}
      >
        <SortMoviesCard sortOption={sortOption} onSortChange={handleSortChange} />
      </Drawer>
    </>
  );
};

export default SortMoviesUI;
