import { useMutation, useQuery } from "react-query";
import Button from "../components/Button";
import {
  ASSIGN_COLOR,
  DISMISS_CHANCE,
  EXCHANGE_COLOR,
  GENERATE_TRANSACTION,
  GET_CHANCE,
  GET_GAME,
  USE_CHANCE,
} from "../services/sharedQueries";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { ReactComponent as BackIcon } from "../assets/icons/back-icon.svg";

const getGroupedData = (data, fields) => {
  return data
    .filter((zone) => zone.player === +fields.fromPlayer)
    .reduce((groups, item) => {
      const { hex } = item;
      if (!groups[hex]) {
        groups[hex] = [];
      }
      groups[hex].push(item);
      return groups;
    }, {});
};

const Chance = () => {
  const navigate = useNavigate();
  const [isLastChanceActive, setIsLastChanceActive] = useState(false);
  const [fields, setFields] = useState({
    fromPlayer: 0,
    toPlayer: 1,
    color: "",
  });
  const {
    refetch: getRunningGame,
    data: runningGame,
    isLoading: runningGameLoading,
  } = useQuery(GET_GAME, {
    cacheTime: 0,
    staleTime: 0,
    onSuccess: (data) => {
      let chances = data?.game?.chances;
      if (chances.length > 0) {
        let lastChance = chances[chances.length - 1];
        if (lastChance.isDismissed) {
          setIsLastChanceActive(false);
        } else {
          setIsLastChanceActive(lastChance?.id);
        }
      } else {
        setIsLastChanceActive(false);
      }
    },
  });

  const {
    mutateAsync: exchangeColorPlayerPlayer,
    isLoading: exchangeColorPlayerPlayerLoading,
  } = useMutation(EXCHANGE_COLOR);

  const {
    mutateAsync: generateTransaction,
    isLoading: generateTransactionLoading,
  } = useMutation(GENERATE_TRANSACTION);

  const { refetch: executeChance, isLoading: executeChanceLoading } = useQuery(
    USE_CHANCE,
    { enabled: false, staleTime: 0, cacheTime: 0 }
  );

  const { mutateAsync: assignColor, isLoading: assignColorLoading } =
    useMutation(ASSIGN_COLOR);

  const { mutateAsync: dismissChance, isLoading: dismissChanceLoading } =
    useMutation(DISMISS_CHANCE);

  const {
    data: chanceData,
    refetch: getChanceData,
    isLoading: chanceDataLoading,
  } = useQuery([GET_CHANCE, { chanceId: isLastChanceActive }], {
    enabled: false,
    staleTime: 0,
    cacheTime: 0,
  });

  useEffect(() => {
    if (isLastChanceActive) {
      getChanceData();
    }
  }, [getChanceData, isLastChanceActive]);

  const renderChanceBasedOnActionType = (data) => {
    switch (data?.actionType) {
      case "money": {
        const direction = data?.direction;
        const amount = data?.amount;
        return (
          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}
          >
            <div>
              <div style={{ marginBottom: ".5rem", color: "white" }}>
                {direction === "pp" ? "From " : ""}Player:
              </div>
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
                  setFields((prev) => ({
                    ...prev,
                    fromPlayer: e.target.value,
                  }));
                }}
                value={fields.fromPlayer}
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
            {direction === "pp" && (
              <div>
                <div style={{ marginBottom: ".5rem", color: "white" }}>
                  To Player:
                </div>
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
                    setFields((prev) => ({
                      ...prev,
                      toPlayer: e.target.value,
                    }));
                  }}
                  value={fields.toPlayer}
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
            )}
            <Button
              extraStyle={{
                marginTop: "4rem",
                marginBottom: "1rem",
                width: "100%",
                color: "black",
                backgroundColor: "white",
              }}
              onClick={async () => {
                if (runningGameLoading || generateTransactionLoading) return;
                if (
                  +fields.fromPlayer === +fields.toPlayer &&
                  direction === "pp"
                ) {
                  alert("Cannot send from to same player");
                  return;
                }
                try {
                  await generateTransaction({
                    amount,
                    sign: direction === "bp" ? "Credit" : "Debit",
                    player: +fields.fromPlayer,
                  });
                  if (direction === "pp") {
                    await generateTransaction({
                      amount,
                      sign: "Credit",
                      player: +fields.toPlayer,
                    });
                  }
                  await dismissChance({ chanceId: isLastChanceActive });
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
      }
      case "color": {
        const direction = data?.direction;
        return (
          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}
          >
            <div>
              <div style={{ marginBottom: ".5rem", color: "white" }}>
                {direction === "pp" ? "From " : ""}Player:
              </div>
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
                  setFields((prev) => ({
                    ...prev,
                    fromPlayer: e.target.value,
                  }));
                }}
                value={fields.fromPlayer}
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
            {direction === "pp" && (
              <div>
                <div style={{ marginBottom: ".5rem", color: "white" }}>
                  To Player:
                </div>
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
                    setFields((prev) => ({
                      ...prev,
                      toPlayer: e.target.value,
                    }));
                  }}
                  value={fields.toPlayer}
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
            )}
            <div>
              <div style={{ margin: ".5rem 0", color: "white" }}>Color:</div>
              {direction === "pp" || direction === "pb" ? (
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
                      return (
                        <div
                          onClick={() => {
                            if (
                              value.filter((zone) => !zone.isMortage).length ===
                              0
                            )
                              return;
                            setFields((prev) => ({ ...prev, color: key }));
                          }}
                          style={{
                            backgroundColor: key,
                            opacity:
                              value.filter((zone) => !zone.isMortage).length ===
                              0
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
                          <div
                            style={{ position: "absolute", top: 5, right: 5 }}
                          >
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
              ) : (
                <div
                  style={{
                    display: "flex",
                    columnGap: "1rem",
                    rowGap: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  {runningGame?.colors &&
                    Object.entries(runningGame?.colors)?.map(
                      ([key, value], i) => {
                        return (
                          <div
                            onClick={() => {
                              if (value === 0) return;
                              setFields((prev) => ({ ...prev, color: key }));
                            }}
                            style={{
                              backgroundColor: key,
                              opacity: value > 0 ? "1" : ".5",
                              width: "100px",
                              height: "100px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{ position: "absolute", top: 5, right: 5 }}
                            >
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
                                      <rect
                                        width="20"
                                        height="20"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              )}
                            </div>
                            <div
                              style={{ fontSize: "18px", fontWeight: "700" }}
                            >
                              {value}
                            </div>
                          </div>
                        );
                      }
                    )}
                </div>
              )}
              {direction === "pp" ? (
                <Button
                  extraStyle={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    width: "100%",
                    color: "black",
                    backgroundColor: "white",
                  }}
                  onClick={async () => {
                    if (runningGameLoading || exchangeColorPlayerPlayerLoading)
                      return;
                    if (!fields.color) {
                      alert("Select a color");
                      return;
                    }
                    if (
                      +fields.fromPlayer === +fields.toPlayer &&
                      direction === "pp"
                    ) {
                      alert("Cannot send color to the same player");
                      return;
                    }
                    try {
                      await exchangeColorPlayerPlayer({
                        hex: fields.color,
                        fromPlayer: +fields.fromPlayer,
                        toPlayer: +fields.toPlayer,
                      });
                      await dismissChance({ chanceId: isLastChanceActive });
                      navigate("/game");
                    } catch (error) {
                      alert("error:", error);
                    }
                  }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  extraStyle={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    width: "100%",
                    color: "black",
                    backgroundColor: "white",
                  }}
                  onClick={async () => {
                    if (runningGameLoading || assignColorLoading) return;
                    if (!fields.color) {
                      alert("Select a color");
                      return;
                    }
                    try {
                      await assignColor({
                        direction: direction === "pb" ? "delete" : "add",
                        hex: fields.color,
                        player: +fields.fromPlayer,
                      });
                      await dismissChance({ chanceId: isLastChanceActive });
                      navigate("/game");
                    } catch (error) {
                      alert("error:", error);
                    }
                  }}
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        );
      }

      default: {
        return (
          <Button
            extraStyle={{
              marginBottom: "1rem",
              width: "100%",
              color: "black",
              backgroundColor: "white",
            }}
            onClick={async () => {
              if (
                runningGameLoading ||
                dismissChanceLoading ||
                executeChanceLoading ||
                chanceDataLoading
              )
                return;
              try {
                await dismissChance({ chanceId: isLastChanceActive });
                navigate("/game");
              } catch (error) {
                alert("error:", error);
              }
            }}
          >
            Dismiss
          </Button>
        );
      }
    }
  };

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
        position: "relative",
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
        Chance
      </div>

      <BackIcon
        style={{
          position: "absolute",
          width: 25,
          height: 25,
        }}
        onClick={() => {
          navigate("/game");
        }}
      />

      {!isLastChanceActive ? (
        <Button
          extraStyle={{
            marginBottom: "1rem",
            width: "100%",
            color: "black",
            backgroundColor: "white",
          }}
          onClick={async () => {
            if (
              runningGameLoading ||
              dismissChanceLoading ||
              executeChanceLoading ||
              chanceDataLoading
            )
              return;
            try {
              await executeChance();
              await getRunningGame();
            } catch (error) {
              alert("error:", error);
            }
          }}
        >
          Get Chance
        </Button>
      ) : (
        <>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
              textAlign: "center",
              color: "white",
            }}
          >
            <div>Title: {chanceData?.chance?.title}</div>
            <div>Action: {chanceData?.chance?.action}</div>
          </div>
          <div>{renderChanceBasedOnActionType(chanceData?.chance)}</div>
        </>
      )}
    </div>
  );
};

export default Chance;
