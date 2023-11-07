import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import { GET_GAME } from "../services/sharedQueries";

const Winner = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  
  useQuery(GET_GAME, {
    refetchInterval: 500,
    cacheTime: 0,
    staleTime: 0,
    onSuccess: (data) => {
      if (!data?.game?.isRunning) {
        navigate(`/`);
        return;
      }
    }}
  )

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
          // justifyContent:'center'
        }}
      >
        <img
          src={`http://${localStorage.getItem(
            "localServerIp"
          )}:8080/images/monopoly-logo.png`}
          style={{ width: "70%", objectFit: "contain" }}
          alt=""
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "2rem",
            marginRight: "40%",
          }}
        >
          <div
            style={{ color: "white", fontSize: "50px", textAlign: "center" }}
          >
            WINNER!
          </div>
          <div
            style={{ color: "white", fontSize: "120px", textAlign: "center" }}
          >
            {name.toUpperCase()}
          </div>
        </div>
        <div
          style={{ position: "absolute", right: 0, bottom: 0, display: "flex" }}
        >
          <img
            src={`http://${localStorage.getItem(
              "localServerIp"
            )}:8080/images/mr-monopoly.png`}
            style={{ width: "750px", objectFit: "contain" }}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Winner;
