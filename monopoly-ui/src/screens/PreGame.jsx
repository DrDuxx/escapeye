import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { GENERATE_GAME, GET_GAME } from "../services/sharedQueries";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const getIcons = (fields) => {
  let icons = [1, 2, 3, 4, 5, 6, 7];
  let remainingIcons = [...icons];
  let usedIcons = [];
  fields.players.map((zone) => {
    usedIcons.push(zone.symbol);
    let index = remainingIcons.indexOf(zone.symbol);
    remainingIcons.splice(index, 1);
    return zone;
  });
  return { icons, usedIcons, remainingIcons };
};

const handleChangePlayerName = (setFields, value, index) => {
  setFields((prev) => {
    let players = [...prev.players];
    players[index] = { ...players[index], name: value };
    return { ...prev, players };
  });
};

const handleChangePlayerSymbol = (setFields, value, index, setIsSelectOpen) => {
  setFields((prev) => {
    let players = [...prev.players];
    players[index] = { ...players[index], symbol: value };
    return { ...prev, players };
  });
  setIsSelectOpen(false);
};

const addNewPlayer = (setFields, fields) => {
  if(fields?.players?.length>6){
    return
  }
  setFields((prev) => {
    let players = [...prev.players];
    players.push({
      name: "",
      symbol: getIcons(fields).remainingIcons[0],
    });
    return { ...prev, players };
  });
};

const removePlayer = (setFields, index) => {
  setFields((prev) => {
    let players = [...prev.players];
    players.splice(index, 1);
    return { ...prev, players };
  });
};

const PreGame = () => {
  const navigate = useNavigate();

  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const [fields, setFields] = useState({ time: "", players: [] });
  const { mutateAsync: generateGame, isLoading: generateGameLoading } =
    useMutation(GENERATE_GAME);

  const { data: runningGame, isLoading: runningGameLoading } =
    useQuery(GET_GAME);

  useEffect(() => {
    if (runningGame?.game?.id) {
      navigate("/game");
    }
  }, [navigate, runningGame]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        justifyContent: "space-between",
        height: "100%",
        padding: "2rem",
        backgroundColor:'#D32027',
        minHeight:'inherit'
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <div style={{color:'white'}}>Time (In minutes)</div>
          <Input
            value={fields.time}
            onChange={(e) => {
              setFields((prev) => ({ ...prev, time: e.target.value }));
            }}
            extraStyle={{ color: "white",backgroundColor:'transparent', width: "100%",outline:'none', borderColor:'white' }}
            type={"number"}
            min={1}
            max={10}
          />
        </div>
        <div>
          <Button
            onClick={() => {
              addNewPlayer(setFields, fields);
            }}
            extraStyle={{marginBottom: "1rem",
      width: "100%",
      color: "black",
      backgroundColor: "white"}}
          >
            Add Player
          </Button>
          {fields.players?.map((zone, i) => {
            return (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{color:'white'}}>Player {i + 1}</div>
                  <div
                    style={{ color: "white", fontWeight: "700" }}
                    onClick={() => {
                      removePlayer(setFields, i);
                    }}
                  >
                    Remove
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: ".5rem",
                  }}
                >
                  <div>
                    <div
                      style={{
                        margin: "0.5rem 0px 2rem",
                        width: "300px",
                        fontSize: "1rem",
                        padding: ".5rem",
                        borderRadius: "0.5rem",
                        textAlign: "center",
                        border:'1px solid black',
                        backgroundColor:'white'
                      }}
                      onClick={() => {
                        setIsSelectOpen((prev) => {
                          if(prev !== false){
                            return false
                          }else{
                            return i
                          }
                        });
                      }}
                    >
                      <img
                        src={`http://${localStorage.getItem(
                          "localServerIp"
                        )}:8080/images/monopoly-symbol-${zone.symbol}.png`}
                        alt=""
                        style={{ objectFit: "contain", height: "26px" }}
                        
                      />
                    </div>
                    <div style={{ position: "relative" }}>
                      {isSelectOpen === i && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-32px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: "5",
                            width: "100%",
                            border:'1px solid black',
                            textAlign:'center',
                            borderRadius: "0.5rem",
                            backgroundColor:'white'
                          }}
                        >
                          {getIcons(fields).icons.map((icon) => {
                            if (
                              getIcons(fields).usedIcons.includes(icon) &&
                              zone.symbol !== icon
                            ) {
                              return <></>;
                            }
                            return (
                              <div onClick={() => {
                                handleChangePlayerSymbol(
                                  setFields,
                                  icon,
                                  i,
                                  setIsSelectOpen
                                );
                              }} style={{borderBottom:'1px solid rgba(0,0,0,.4)', padding:'.5rem', backgroundColor:'white'}}>
                                <img
                                  src={`http://${localStorage.getItem(
                                    "localServerIp"
                                  )}:8080/images/monopoly-symbol-${icon}.png`}
                                  alt=""
                                  style={{
                                    objectFit: "contain",
                                    height: "26px",
                                  }}
                                  
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <Input
                    value={zone.name}
                    onChange={(e) => {
                      handleChangePlayerName(setFields, e.target.value, i);
                    }}
                    extraStyle={{ color: "white",backgroundColor:'transparent', width: "100%", outline:'none', borderColor:'white' }}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
      <Button
      extraStyle={{marginBottom: "1rem",
      width: "100%",
      color: "black",
      backgroundColor: "white"}}
        onClick={async () => {
          if (runningGameLoading) return;
          if (generateGameLoading) return;
          if (
            !isNaN(+fields.time) &&
            +fields.time > 0 &&
            fields.players.length > 0 &&
            fields.players.filter((zone) => zone.name === "").length === 0
          ) {
            await generateGame({
              time: fields.time,
              players: fields.players.map((zone, i) => ({ ...zone, index: i })),
            });
            navigate("/game");
          } else {
            alert("Missing fields");
          }
        }}
      >
        Start
      </Button>
    </div>
  );
};

export default PreGame;
