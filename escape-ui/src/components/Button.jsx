const Button = ({ extraStyle,children,width, ...props }) => {
  return (
    <div
      style={{
        width,
        padding: "1rem 2rem",
        borderRadius: ".5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        color:'#000',
        fontWeight:700,
        ...extraStyle
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Button;
