import React, { useState } from "react";
import { Drawer, Fab, Box } from "@mui/material";
import SortTvShowsCard from "../sortTvCard"; 

// Styles for the FAB button and the FAB container
const styles = {
  fabBox: {
    position: "fixed",
    bottom: 10,
    right: 30,
  },
  fabContainer: {
    backgroundColor: "white",
    borderRadius: '5px',
    color: "black",
    "&:hover": {
      backgroundColor: "#666666",
      color: "white",
    },
  },
};

// The sort TV shows UI props interface
interface SortTvShowsUiProps {
  onSortChange: (sortOption: string) => void;
}

// The sort TV shows UI component which takes the onSortChange function as a prop
const SortTvUi: React.FC<SortTvShowsUiProps> = ({ onSortChange }) => {
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
        <SortTvShowsCard sortOption={sortOption} onSortChange={handleSortChange} />
      </Drawer>
    </>
  );
};

export default SortTvUi;
