import { useMutation, useQuery } from "react-query";
import Button from "../components/Button";
import { GET_GAME, UNMORTAGE_COLOR } from "../services/sharedQueries";
import { useNavigate } from "react-router";
import { useState } from "react";

const getGroupedData = (data, fields) => {
  return data
    .filter((zone) => zone.player === fields.player)
    .reduce((groups, item) => {
      const { hex } = item;
      if (!groups[hex]) {
        groups[hex] = [];
      }
      groups[hex].push(item);
      return groups;
    }, {});
};
const Unmortage = () => {
  const [fields, setFields] = useState({
    player: 0,
    color: "",
  });
  const navigate = useNavigate();

  const { data: runningGame, isLoading: runningGameLoading } = useQuery(
    GET_GAME,
    {
      cacheTime: 0,
      staleTime: 0,
    }
  );

  const { mutateAsync: unmortageColor, isLoading: unmortageColorLoading } =
    useMutation(UNMORTAGE_COLOR);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        rowGap: "2rem",
        padding: "2rem",
        height: "100%",
        backgroundColor: "#D32027",
        minHeight: "inherit",
      }}
    >
      <div
        style={{
          fontSize: "20px",
          textAlign: "center",
          fontWeight: "700",
          color: "white",
        }}
      >
        Unmortage (Bank -&gt; Player)
      </div>
      <Button
        extraStyle={{
          marginBottom: "1rem",
          width: "100%",
          color: "black",
          backgroundColor: "white",
        }}
        onClick={() => {
          navigate("/game");
        }}
      >
        BACK
      </Button>
      <div>
        <div style={{ marginBottom: ".5rem", color: "white" }}>Player:</div>
        <select
          style={{
            fontSize: "1rem",
            padding: "1rem",
            borderRadius: "0.5rem",
            width: "100%",
            outline: "none",
            backgroundColor: "transparent",
            color: "white",
            borderColor: "white",
          }}
          onChange={(e) => {
            setFields({ color: "", player: +e.target.value });
          }}
          value={fields.player}
        >
          {runningGame?.game?.players?.map((zone) => {
            return (
              <option
                value={zone.index}
                style={{ backgroundColor: "white", color: "black" }}
              >
                {zone.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <div style={{ marginBottom: ".5rem", color: "white" }}>Color:</div>
        <div
          style={{
            display: "flex",
            columnGap: "1rem",
            rowGap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {runningGame?.game?.colors &&
            Object.entries(
              getGroupedData(runningGame?.game?.colors, fields)
            )?.map(([key, value], i) => {
              if (key === "jail" || key === "edl") {
                return <></>;
              }
              return (
                <div
                  onClick={() => {
                    if (value.filter((zone) => zone.isMortage).length === 0)
                      return;
                    setFields((prev) => ({ ...prev, color: key }));
                  }}
                  style={{
                    backgroundColor: key,
                    opacity:
                      value.filter((zone) => zone.isMortage).length === 0
                        ? ".5"
                        : "1",
                    width: "100px",
                    height: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <div style={{ position: "absolute", top: 5, right: 5 }}>
                    {fields.color === key && (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_636_3084)">
                          <path
                            d="M0.256592 13.4867C0.256592 13.4867 4.09659 17.81 4.86326 19.576H8.16326C9.54659 15.3527 14.9199 5.27267 19.5273 1.73934C20.4806 0.512671 18.0839 0.00600377 16.1489 0.81867C13.2323 2.042 7.73226 11.392 6.70559 13.64C5.24893 14.0233 3.71226 11.1833 3.71093 11.1833L0.256592 13.4867Z"
                            fill="black"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_636_3084">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    )}
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: "700" }}>
                    {value.length}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Button
        extraStyle={{
          marginBottom: "1rem",
          width: "100%",
          color: "black",
          backgroundColor: "white",
        }}
        onClick={async () => {
          if (runningGameLoading || unmortageColorLoading) return;
          if (!fields.color) {
            alert("Select a color");
            return;
          }
          try {
            await unmortageColor({
              hex: fields.color,
              player: fields.player,
            });
            navigate("/game");
          } catch (error) {
            alert("error:", error);
          }
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default Unmortage;
