import React from "react";
import { SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Styles for the sort card component
const styles = {
  root: {
    maxWidth: 345,
    backgroundColor: "#1a1a1a",
    color: "white",
  },
  formControl: {
    margin: 1,
    minWidth: 220,
    color: "white",
    backgroundColor: "#1a1a1a",
    border: '1px solid white',
  },
};

// Props interface for the SortTvShowsCard component
interface SortTvCardProps {
  onSortChange: (sortOption: string) => void;
  sortOption: string;
}

// SortTvShowsCard component
const SortTvCard: React.FC<SortTvCardProps> = ({ onSortChange, sortOption }) => {
  const handleSortChange = (e: SelectChangeEvent) => {
    onSortChange(e.target.value);
  };

  return (
    <Card sx={styles.root} variant="outlined">
      <CardContent>
        <InputLabel id="sort-label" sx={{ color: "white", paddingLeft: "10px" }}>Sort by</InputLabel>
        <FormControl sx={styles.formControl}>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={sortOption}
            defaultValue="none"
            onChange={handleSortChange}
            variant="filled"
            sx={{ 
              backgroundColor: "#1a1a1a", color: "white",
              "& .MuiSelect-icon": {
                color: "white",
              },
            }}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="popularity">Popularity</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default SortTvCard;
