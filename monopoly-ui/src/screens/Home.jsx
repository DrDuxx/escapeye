import { useQuery } from "react-query";
import { GET_CHANCE, GET_GAME, GET_TRIVIA } from "../services/sharedQueries";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CountdownContext from "../context/CountdownContext";
import moment from "moment";
import TypeWriter from "../components/TypeWriter";
import { triviaCategories } from "../categories";

const getGroupedData = (data, player) => {
  return data
    .filter((zone) => zone.player === player)
    .reduce((groups, item) => {
      const { hex } = item;
      if (!groups[hex]) {
        groups[hex] = [];
      }
      groups[hex].push(item);
      return groups;
    }, {});
};

const getFlexBasis = (players) => {
  if (players === 1) {
    return "100%";
  }
  if (players === 2 || players === 4) {
    return "49%";
  }
  if (players === 7) {
    return "23%";
  }
  return "30%";
};

const formatAmount = (amount, toFixed) => {
  if (!amount && amount !== 0) return "";
  amount = toFixed ? amount.toFixed(toFixed) : amount;
  const parts = amount.toString().split(".");
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  let formattedNumber = integerPart;

  if (parts.length > 1) {
    formattedNumber += "." + parts[1];
  }

  return formattedNumber;
};

const getMoneyForPlayer = (player, game) => {
  let total = 0;
  game?.game?.transactions
    ?.filter((zone) => zone.player === player)
    .map((zone) => {
      if (zone.sign === "Credit") {
        total += zone?.amount;
      } else {
        total -= zone?.amount;
      }
    });
  return formatAmount(total);
};

const renderColorCard = (color, isMortage, isFirst = false) => {
  if (color === "jail") {
    return (
      <div
        style={{
          width: "70px",
          height: "70px",
          border: "2px solid black",
          position: "relative",
          marginLeft: isFirst ? 0 : "-20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <img
          src={`http://${localStorage.getItem(
            "localServerIp"
          )}:8080/images/jail-icon.png`}
          alt=""
          style={{ width: "66px", height: "44px" }}
        />
      </div>
    );
  }
  if (color === "edl") {
    return (
      <div
        style={{
          width: "70px",
          height: "70px",
          border: "2px solid black",
          position: "relative",
          marginLeft: isFirst ? 0 : "-20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <img
          src={`http://${localStorage.getItem(
            "localServerIp"
          )}:8080/images/electricity.png`}
          alt=""
          style={{ width: "46px", height: "60px" }}
        />
      </div>
    );
  }
  return (
    <div
      style={{
        width: "70px",
        height: "70px",
        border: "2px solid black",
        position: "relative",
        marginLeft: isFirst ? 0 : "-20px",
      }}
    >
      {isMortage && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <img
            src={`http://${localStorage.getItem(
              "localServerIp"
            )}:8080/images/mortage-icon.png`}
            alt=""
            style={{ width: "30px", height: "30px" }}
          />
        </div>
      )}
      <div
        style={{ backgroundColor: color, height: "50%", width: "100%" }}
      ></div>
      <div
        style={{ backgroundColor: "white", height: "50%", width: "100%" }}
      ></div>
    </div>
  );
};

const getColorsForPlayer = (player, game) => {
  return (
    game?.game?.colors &&
    Object.entries(getGroupedData(game?.game?.colors, player))?.map(
      ([key, value], i) => {
        return (
          <div style={{ display: "flex" }}>
            {value?.map((zone, l) => {
              return renderColorCard(key, zone.isMortage, l === 0);
            })}
          </div>
        );
      }
    )
  );
};

const getPlayerCardStyle = (players) => {
  if (players > 3) {
    return {
      fontScale: players > 5 ? 1 : 2,
      container: {
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        rowGap: "3rem",
      },
      symbol: {
        position: "absolute",
        right: 0,
        top: 0,
      },
    };
  }
  return {
    fontScale: 2,
    container: {
      flexBasis: "100%",
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      rowGap: "3rem",
    },
    symbol: {
      flexBasis: "100%",
      display: "flex",
      justifyContent: "flex-end",
    },
  };
};

const Home = () => {
  const [chanceId, setChanceId] = useState("");
  const [triviaId, setTriviaId] = useState("");
  const [isChanceActive, setIsChanceActive] = useState(false);
  const [limitTrivia, setLimitTrivia] = useState(0);
  const [remainingTrivia, setRemainingTrivia] = useState(0);
  const [isTriviaCategory, setIsTriviaCategory] = useState(false);
  const [isTriviaActive, setIsTriviaActive] = useState(false);
  const [isTriviaAnswered, setIsTriviaAnswered] = useState(false);
  const [isBostaMode, setIsBostaMode] = useState(false);
  const [triviaCategoryColor, setTriviaCategoryColor] = useState("");
  const [newLocationValue, setNewLocationValue] = useState("");
  const { resetCountdown, timeLeft } = useContext(CountdownContext);
  const navigate = useNavigate();

  const { data: chanceData, refetch: getChanceData } = useQuery(
    [GET_CHANCE, { chanceId }],
    {
      enabled: false,
      staleTime: 0,
      cacheTime: 0,
      onSuccess: (data) => {
        setIsChanceActive(true);
      },
    }
  );

  const { data: triviaData, refetch: getTriviaData } = useQuery(
    [GET_TRIVIA, { triviaId }],
    {
      enabled: false,
      staleTime: 0,
      cacheTime: 0,
      onSuccess: (data) => {
        setIsTriviaActive(true);
      },
    }
  );

  const { data: runningGame } = useQuery(GET_GAME, {
    refetchInterval: 500,
    cacheTime: 0,
    staleTime: 0,
    onSuccess: (data) => {
      if (data?.game?.winner) {
        const winner = data?.game?.players[data?.game?.winner].name;
        navigate(`/winner/${winner}`);
        return;
      }
      if (data?.game?.bostaMode) {
        if (!isBostaMode) {
          let random = Math.floor(
            Math.random() *
              data?.settings
                ?.filter((zone) => zone.option_name === "locations")
                ?.pop()?.option_value?.data.length
          );
          setNewLocationValue(
            data?.settings
              ?.filter((zone) => zone.option_name === "locations")
              ?.pop()?.option_value?.data[random]
          );
        }
        setIsBostaMode(true);
      } else {
        setIsBostaMode(false);
        setNewLocationValue("");
      }
      if (data?.game?.triviaCategoryMode) {
        setIsTriviaCategory(true);
      } else {
        setIsTriviaCategory(false);
      }
      const limit = data?.settings
        ?.filter((zone) => zone.option_name === "trivia_questions")
        ?.pop()?.option_value?.data;
      setLimitTrivia(limit);
      if (
        data?.game?.triviaSessions?.filter((zone) => zone.isOpen).length > 0
      ) {
        setTriviaCategoryColor(triviaCategories.filter((zone)=>zone.name===data?.game?.triviaSessions[data?.game?.triviaSessions.length - 1].category).pop().hex);
        setRemainingTrivia(
          data?.game?.triviaSessions[data?.game?.triviaSessions.length - 1]
            .questions
        );
      } else {
        setRemainingTrivia(0);
      }
      let chances = [...data?.game?.chances];
      let trivias = [...data?.game?.trivias];
      if (chances.length > 0) {
        if (!chances[chances.length - 1].isDismissed) {
          setChanceId(chances[chances.length - 1].id);
        } else {
          setIsChanceActive(false);
          setChanceId("");
        }
      }
      if (trivias.length > 0) {
        if (!trivias[trivias.length - 1].isDismissed) {
          if (trivias[trivias.length - 1].isAnswered) {
            setIsTriviaAnswered(true);
          } else {
            setIsTriviaAnswered(false);
            setTriviaId(trivias[trivias.length - 1].id);
          }
        } else {
          setIsTriviaAnswered(false);
          setIsTriviaActive(false);
          setTriviaId("");
          setTriviaCategoryColor("");
        }
      }
    },
  });

  useEffect(() => {
    if (chanceId) {
      getChanceData();
    }
  }, [chanceId, getChanceData]);

  useEffect(() => {
    if (triviaId) {
      getTriviaData();
    }
  }, [getTriviaData, triviaId]);

  // Convert seconds to  hours, minutes, and seconds
  const hours = Math.floor((timeLeft % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  
  useEffect(() => {
    if (runningGame?.game) {
      const diff = moment().diff(runningGame?.game?.startedAt, "seconds");
      const secToBeSet = runningGame?.game?.time - diff
      resetCountdown(secToBeSet>0?secToBeSet:0);
    }
  }, [resetCountdown, runningGame]);

  if (isBostaMode) {
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
          backgroundColor: "#F78621",
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
          }}
        >
          <div
            style={{
              fontSize: "80px",
              color: "white",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            BOSTA
          </div>
          <div>
            <img
              src={`http://${localStorage.getItem(
                "localServerIp"
              )}:8080/images/bosta.png`}
              alt=""
              style={{ width: "100%", objectFit: "contain" }}
            />
          </div>
          <div
            style={{
              fontSize: "120px",
              color: "white",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            <TypeWriter text={newLocationValue} delay={200} />
          </div>
        </div>
      </div>
    );
  }

  if (isTriviaCategory) {
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
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            margin: "2rem",
            width: "100%",
            border: "6px solid black",
            display: "flex",
            flexDirection: "column",
            rowGap: "6rem",
            alignItems: "center",
            padding: "4rem",
          }}
        >
          <div
            style={{
              fontSize: "80px",
              color: "black",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            TRIVIA CATEGORIES
          </div>
          <div
            style={{
              display: "flex",
              columnGap: "2rem",
              rowGap: "2rem",
              width: "100%",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {triviaCategories.map((zone) => {
              return (
                <div style={{ flexBasis: "30%" }}>
                  <div
                    style={{ backgroundColor: zone.hex, borderRadius: "2rem" }}
                  >
                    <img
                      src={`http://${localStorage.getItem(
                        "localServerIp"
                      )}:8080/images/${zone.name}.png`}
                      alt=""
                      style={{ width: "100%", objectFit: "contain" }}
                    />
                    <div
                      style={{
                        padding: "1rem 2rem",
                        color: "white",
                        textAlign: "center",
                        fontSize: "24px",
                        textTransform:'capitalize'
                      }}
                    >
                      {zone.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (isChanceActive) {
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
          backgroundColor: "#D32F8D",
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
          }}
        >
          <div
            style={{
              fontSize: "80px",
              color: "white",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            CHANCE
          </div>
          <div style={{ fontSize: "40px", color: "white", fontWeight: 700 }}>
            {chanceData?.chance?.title}
          </div>
          <div
            style={{
              fontSize: "27px",
              color: "white",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            {chanceData?.chance?.action}
          </div>
        </div>
      </div>
    );
  }

  if (isTriviaActive) {
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
          backgroundColor: triviaCategoryColor,
          // backgroundColor: "#121939",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            borderTopLeftRadius: "1rem",
            padding: "2rem 4rem",
            fontSize: "24px",
            backgroundColor: "white",
            color: "black",
          }}
        >
          {remainingTrivia} of {limitTrivia}
        </div>
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
          }}
        >
          <div style={{ fontSize: "80px", color: "white", fontWeight: 700 }}>
            TRIVIA
          </div>
          <div
            style={{
              fontSize: "40px",
              color: "white",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            {triviaData?.trivia?.question}
          </div>
          {isTriviaAnswered && (
            <div>
              <div
                style={{
                  fontSize: "27px",
                  color: "white",
                  fontWeight: 700,
                  textAlign: "center",
                  marginTop: "2rem",
                  marginBottom: "2rem",
                }}
              >
                Answer
              </div>
              <div
                style={{
                  fontSize: "60px",
                  color: "white",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {triviaData?.trivia?.answer}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        columnGap: ".5rem",
        rowGap: ".5rem",
        flexWrap: "wrap-reverse",
        justifyContent: "center",
        backgroundColor: "black",
        border: ".5rem solid black",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "400px",
          padding: "2rem",
          backgroundColor: "black",
          color: "white",
          fontSize: "2rem",
          textAlign: "center",
          zIndex: 5,
        }}
      >
        {`${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
      </div>
      {runningGame?.game?.players?.map((zone, i) => {
        return (
          <div
            style={{
              flexBasis: getFlexBasis(runningGame?.game?.players?.length),
              flexGrow: "2",
              backgroundColor: "#D32027",
              display: "flex",
              position: "relative",
              flexWrap: "wrap",
              minHeight: "50%",
            }}
          >
            <div
              style={
                getPlayerCardStyle(runningGame?.game?.players?.length).container
              }
            >
              <div
                style={{
                  fontSize: `${
                    46 *
                    getPlayerCardStyle(runningGame?.game?.players?.length)
                      .fontScale
                  }px`,
                  color: "white",
                  fontFamily: "Kabel",
                }}
              >
                {zone.name}
              </div>
              <div
                style={{
                  fontSize: `${
                    36 *
                    getPlayerCardStyle(runningGame?.game?.players?.length)
                      .fontScale
                  }px`,
                  color: "white",
                  fontFamily: "Kabel",
                }}
              >
                <span style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "35%",
                      width: "50px",
                      height: `${
                        3 *
                        getPlayerCardStyle(runningGame?.game?.players?.length)
                          .fontScale
                      }px`,
                      backgroundColor: "white",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      width: "50px",
                      height: `${
                        3 *
                        getPlayerCardStyle(runningGame?.game?.players?.length)
                          .fontScale
                      }px`,
                      backgroundColor: "white",
                    }}
                  ></div>
                  LP{" "}
                </span>
                {getMoneyForPlayer(zone.index, runningGame)}
              </div>
              <div
                style={{
                  display: "flex",
                  columnGap: "1rem",
                  flexWrap: "wrap",
                  rowGap: "1rem",
                }}
              >
                {getColorsForPlayer(zone.index, runningGame)}
              </div>
            </div>
            <div
              style={
                getPlayerCardStyle(runningGame?.game?.players?.length).symbol
              }
            >
              <img
                src={`http://${localStorage.getItem(
                  "localServerIp"
                )}:8080/images/monopoly-symbol-${zone.symbol}-crop.png`}
                style={{
                  objectFit: "contain",
                  width: `${
                    250 *
                    getPlayerCardStyle(runningGame?.game?.players?.length)
                      .fontScale
                  }px`,
                }}
                alt=""
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
