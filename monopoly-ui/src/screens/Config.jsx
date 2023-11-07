import { useEffect } from "react";
import { updateIpAddress } from "../services/axios";
import { useNavigate } from "react-router";
import { GET_GAME } from "../services/sharedQueries";
import { useQuery } from "react-query";

const Config = () => {
  const navigate = useNavigate();

  useEffect(() => {
    updateIpAddress(window.location.hostname);
  }, [navigate]);

  useQuery(GET_GAME, {
    refetchInterval: 500,
    onSuccess: (data) => {
      if (data?.game) {
        navigate("/home");
        return;
      }
    },
  });

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        columnGap: ".25rem",
        rowGap: ".25rem",
        flexWrap: "wrap-reverse",
        justifyContent: "center",
        backgroundColor: "#D32027",
      }}
    >
      <div
        style={{
          margin: "2rem",
          width: "100%",
          border: "6px solid white",
          display: "flex",
          flexDirection: "column",
          rowGap: "6rem",
          alignItems: "center",
          padding: "4rem",
          justifyContent:'center'

        }}
      >
        <img
          src={`http://${localStorage.getItem(
            "localServerIp"
          )}:8080/images/monopoly-logo.png`}
          style={{ width: "100%", objectFit:'contain' }}
          alt=""
        />
      </div>
    </div>
  );
};

export default Config;
