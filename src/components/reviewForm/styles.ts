const styles =  {
    root: {
      marginTop: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
    },
    form: {
      width: "100%",
      color: "white",
      backgroundColor: "rgba(255, 255, 255, 0.8)"!,
      "& > * ": {
        marginTop: 2,
      },
    },
    textField: {
      width: "40ch",
      backgroundColor: "rgba(255, 255, 255, 0.5)", // plcaeholder while attempting to solve text colour issue
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
  };
  export default styles