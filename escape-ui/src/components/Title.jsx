const Title = ({ children,extraStyle, ...props }) => {
  return <div style={{ fontSize: "3rem", fontWeight: 700, ...extraStyle }} {...props}>{children}</div>;
};

export default Title;
