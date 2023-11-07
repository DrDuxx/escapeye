import { useMutation, useQuery } from "react-query";
import Button from "../components/Button";
import { GENERATE_TRANSACTION, GET_GAME, SET_BOSTA_MODE } from "../services/sharedQueries";
import { useNavigate } from "react-router";
import { useState } from "react";

const Bosta = () => {
  const [fields, setFields] = useState({
    amount: "",
    player: 0,
  });
  const [isBostaModeActive, setIsBostaModeActive] = useState();
  const navigate = useNavigate();

  const { data: runningGame, refetch:refetchGameData, isLoading: runningGameLoading } = useQuery(
    GET_GAME,
    {
      cacheTime: 0,
      staleTime: 0,
      onSuccess:(data)=>{
        setFields((prev)=>({...prev,amount:data?.settings?.filter((zone)=>zone.option_name==='bosta_fee')?.pop()?.option_value?.data}))
        if(data?.game?.bostaMode){
            setIsBostaModeActive(true)
        }else{
            setIsBostaModeActive(false)
        }
      }
    }
  );

  const {
    mutateAsync: generateTransaction,
    isLoading: generateTransactionLoading,
  } = useMutation(GENERATE_TRANSACTION);
  
  const {
    mutateAsync: setBostaMode,
    isLoading: setBostaModeLoading,
  } = useMutation(SET_BOSTA_MODE, {onSuccess:()=>{
    refetchGameData()
  }});

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
        Bosta
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
      
        {isBostaModeActive?<>
            <div
        style={{
          color: "white",
          fontSize: "20px",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        bosta has been used, do you want to dismiss?
      </div>
        <Button
        extraStyle={{
          marginBottom: "1rem",
          width: "100%",
          color: "black",
          backgroundColor: "white",
        }}
        onClick={async () => {
          if (runningGameLoading || setBostaModeLoading ) return;

          try {
            await setBostaMode({mode:false})
            navigate('/game')
          } catch (error) {
            alert("error:", error);
          }
        }}
      >
        Dismiss
      </Button></>
        :<><div><div style={{ marginBottom: ".5rem", color: "white" }}>Player:</div>
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
            setFields((prev) => ({ ...prev, player: e.target.value }));
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
      <Button
        extraStyle={{
          marginBottom: "1rem",
          width: "100%",
          color: "black",
          backgroundColor: "white",
        }}
        onClick={async () => {
          if (runningGameLoading || generateTransactionLoading ) return;

          try {
            await setBostaMode({mode:true})
            await generateTransaction({
              sign: "Debit",
              player: fields.player,
              amount: fields.amount,
            });
          } catch (error) {
            alert("error:", error);
          }
        }}
      >
        Use Bosta
      </Button></>}
    </div>
  );
};

export default Bosta;
