import { useMutation, useQuery } from "react-query";
import Button from "../components/Button";
import Input from "../components/Input";
import { GENERATE_TRANSACTION, GET_GAME } from "../services/sharedQueries";
import { useNavigate } from "react-router";
import { useState } from "react";

const PlayerPlayer = () => {
  const [fields, setFields] = useState({
    amount: "",
    fromPlayer: 0,
    toPlayer:1,
  });
  const navigate = useNavigate();

  const { data: runningGame, isLoading: runningGameLoading } = useQuery(
    GET_GAME,
    {
      cacheTime: 0,
      staleTime: 0,
    }
  );

  const {
    mutateAsync: generateTransaction,
    isLoading: generateTransactionLoading,
  } = useMutation(GENERATE_TRANSACTION);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        rowGap: "2rem",
        height:'100%',
        padding: "2rem",
        backgroundColor:'#D32027'
      }}
    >
      <div style={{ fontSize: "20px", textAlign: "center", fontWeight: "700", color:'white' }}>
        Player -&gt; Player
      </div>
      <Button
      extraStyle={{marginBottom: "1rem",
      width: "100%",
      color: "black",
      backgroundColor: "white"}}
        onClick={() => {
          navigate("/game");
        }}
      >
        BACK
      </Button>
      <div>
        <div style={{ marginBottom: ".5rem" ,color:'white'}}>From Player:</div>
        <select
          style={{
            fontSize: "1rem",
            padding: "1rem",
            borderRadius: "0.5rem",
            width: "100%",
            outline:'none',
            backgroundColor:'transparent',
            color:'white',
            borderColor:'white'
          }}
          onChange={(e) => {
            setFields((prev) => ({ ...prev, fromPlayer: +e.target.value }));
          }}
          value={fields.fromPlayer}
          
        >
          {runningGame?.game?.players?.map((zone) => {
            return <option value={zone.index} style={{backgroundColor:'white', color:'black'}}>{zone.name}</option>;
          })}
        </select>
      </div>
      <div>
        <div style={{ marginBottom: ".5rem", color:'white' }}>To Player:</div>
        <select
          style={{
            fontSize: "1rem",
            padding: "1rem",
            borderRadius: "0.5rem",
            width: "100%",
            outline:'none',
            backgroundColor:'transparent',
            color:'white',
            borderColor:'white'
          }}
          onChange={(e) => {
            setFields((prev) => ({ ...prev, toPlayer: +e.target.value }));
          }}
          value={fields.toPlayer}

        >
          {runningGame?.game?.players?.map((zone) => {
            return <option value={zone.index} style={{backgroundColor:'white', color:'black'}}>{zone.name}</option>;
          })}
        </select>
      </div>
      <div>
        <div style={{color:'white'}}>Amount:</div>
        <Input
          value={fields.amount}
          onChange={(e) => {
            setFields((prev) => ({ ...prev, amount: e.target.value }));
          }}
          type={"number"}
          extraStyle={{ color: "white",backgroundColor:'transparent', width: "100%", outline:'none', borderColor:'white' }}
        />
      </div>
      <div style={{display:'flex', flexWrap:"wrap", columnGap:'1.5rem', rowGap:'1.5rem', alignItems:'center', justifyContent:'center'}}>
      <div onClick={()=>{
                    setFields((prev) => ({ ...prev, amount: 50 }));
      }} style={{padding:'1.5rem', borderRadius:'4rem',minWidth:'150px',textAlign:'center',fontSize:'24px', backgroundColor:'transparent', color:'white',border:'1px solid white'}}>50</div>
      <div onClick={()=>{
                    setFields((prev) => ({ ...prev, amount: 100 }));
      }} style={{padding:'1.5rem', borderRadius:'4rem',minWidth:'150px',textAlign:'center',fontSize:'24px', backgroundColor:'transparent', color:'white',border:'1px solid white'}}>100</div>
      <div onClick={()=>{
                    setFields((prev) => ({ ...prev, amount: 150 }));
      }} style={{padding:'1.5rem', borderRadius:'4rem',minWidth:'150px',textAlign:'center',fontSize:'24px', backgroundColor:'transparent', color:'white',border:'1px solid white'}}>150</div>
      <div onClick={()=>{
                    setFields((prev) => ({ ...prev, amount: 200 }));
      }} style={{padding:'1.5rem', borderRadius:'4rem',minWidth:'150px',textAlign:'center',fontSize:'24px', backgroundColor:'transparent', color:'white',border:'1px solid white'}}>200</div>
      <div onClick={()=>{
                    setFields((prev) => ({ ...prev, amount: 250 }));
      }} style={{padding:'1.5rem', borderRadius:'4rem',minWidth:'150px',textAlign:'center',fontSize:'24px', backgroundColor:'transparent', color:'white',border:'1px solid white'}}>250</div>
      <div onClick={()=>{
                    setFields((prev) => ({ ...prev, amount: 300 }));
      }} style={{padding:'1.5rem', borderRadius:'4rem',minWidth:'150px',textAlign:'center',fontSize:'24px', backgroundColor:'transparent', color:'white',border:'1px solid white'}}>300</div>

      </div>
      <Button
      extraStyle={{marginBottom: "1rem",
      width: "100%",
      color: "black",
      backgroundColor: "white"}}
        onClick={async () => {
            
          if (isNaN(+fields.amount) || +fields.amount <= 0) return;
          if (runningGameLoading || generateTransactionLoading) return;
          if(fields.fromPlayer === fields.toPlayer){
            alert('Cannot send from to same player');
            return;
          }
          try {
            await generateTransaction({
              sign: "Debit",
              player: fields.fromPlayer,
              amount: fields.amount,
            });
            await generateTransaction({
              sign: "Credit",
              player: fields.toPlayer,
              amount: fields.amount,
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

export default PlayerPlayer;
