import { useLocation, useNavigate } from "react-router";
import FunLocLogo from "../assets/icons/361741912_6345718152176988_4611974629122257901_n.jpg";
import { ReactComponent as BackIcon } from "../assets/icons/back-icon.svg";

const AdminLayout = ({ backLink,backLinkDepth, children }) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <div style={{ position: "relative", height: "100%", padding: "2rem" }}>
      {(state?.backLink1 || state?.backLink2 || backLink) && (
        <div
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => {
            navigate(backLink || state[`backLink${backLinkDepth}`], {state}  );
          }}
        >
          <BackIcon width={20} height={20} fill="red" />
        </div>
      )}
      <div style={{ position: "absolute", bottom: 0, right: 0 }}>
        <img src={FunLocLogo} alt="" />
      </div>
      {children}
    </div>
  );
};

export default AdminLayout;
