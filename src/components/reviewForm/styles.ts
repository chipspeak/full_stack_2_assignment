// MuiInputBase -> found this helpful for this and the possibility of createTheme and ThemeProvider: https://stackoverflow.com/questions/71912902/how-to-style-input-in-material-ui

const styles =  {
    root: {
      marginTop: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
    },
    form: {
      width: "100%",
      text: "white",
      "& > * ": {
        marginTop: 2,
      },
    },
    submit: {
      marginRight: 2,
    },
    snack: {
      width: "50%",
      "& > * ": {
        width: "100%",
      },
    },
    textFieldStyles: {
      padding: 1,
      "& .MuiInputBase-input": {
        color: "white", // Text color
      },
      "& .MuiInputLabel-root": {
        color: "white", // Label color
      },
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "white", // Border color
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "white", // Border color on hover
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "white", // Border color when focused
      },
    }
  };
  export default styles