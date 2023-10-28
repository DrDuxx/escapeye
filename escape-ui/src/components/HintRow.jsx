const HintRow = ({ index, ...props }) => {
  return (
    <div
      style={{
        padding: "1rem 2rem",
        flexBasis: "25%",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: ".5rem",
        fontWeight:700
      }}
      {...props}
    >
      Riddle {index}
    </div>
  );
};

export default HintRow;
