import React from "react";
import { SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Mimicking the visual style and layout of the FilterCard component but on the opposite side of the screen
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

// The sort movies card props interface (onSortChange function and sortOption string for use in the Select component)
interface SortMoviesCardProps {
  onSortChange: (sortOption: string) => void;
  sortOption: string;
}

// The sort movies card component which takes the onSortChange function and the sortOption string as props
const SortMoviesCard: React.FC<SortMoviesCardProps> = ({ onSortChange, sortOption }) => {
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
            defaultValue="None"
            onChange={handleSortChange}
            variant="filled"
            sx={{ 
                backgroundColor: "#1a1a1a", color: "white",
                "& .MuiSelect-icon": {
                    color: "white",
                  },
             }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="popularity">Popularity</MenuItem>
            <MenuItem value="earnings">Earnings</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default SortMoviesCard;
