import { useEffect } from "react";
import { useNavigate } from "react-router";
import { updateIpAddress } from "../services/axios";

const Ipad = () => {
    const navigate = useNavigate();

    useEffect(() => {
      updateIpAddress(window.location.hostname);
      navigate("/pre-game");
    }, [navigate]);
  
    return <></>;
}

export default Ipad