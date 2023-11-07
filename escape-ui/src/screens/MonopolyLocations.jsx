import React from "react";
import Title from "../components/Title";
import {
  EDIT_MONOPOLY_LOCATIONS,
  GET_MONOPOLY_SETTINGS,
} from "../services/sharedQueries";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router";
import Input from "../components/Input";
import Button from "../components/Button";

const MonopolyLocations = () => {
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);

  const { mutateAsync: editLocations, isLoading: editLocationsLoading } = useMutation(
    EDIT_MONOPOLY_LOCATIONS,
    {
      onSuccess: (data) => {
        navigate(`/admin/monopoly`);
      },
    }
  );
    const handleChange = (value,index)=>{
        let newLocations = [...locations];
        newLocations = newLocations.map((zone,i)=>{
            if(i===index){
                return value
            }
            return zone
        })
        setLocations(newLocations)
    }
  useQuery(GET_MONOPOLY_SETTINGS, {
    onSuccess: (data) => {
      const locations = data?.settings
        ?.filter((zone) => zone.option_name === "locations")
        .pop().option_value?.data;
      setLocations(locations);
    },
    staleTime: 0,
    cacheTime: 0,
  });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        margin: "1rem 30%",
        color: "white",
      }}
    >
      <Title>Monopoly Locations</Title>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem",
        }}
      >
      <Button
       extraStyle={{marginBottom:'2rem'}}
        onClick={async () => {
            setLocations((prev)=>([...prev,""]))
        }}
      >
        Add location
      </Button>
      {
        locations?.map((zone,i)=>{
            return <><div style={{color:'white',fontWeight:'700', textAlign:'end'}} onClick={()=>{
                setLocations((prev)=>{
                    let newLocations = [...prev];
                    newLocations.splice(i,1);
                    return newLocations;
                })
            }}>Remove</div><Input
            value={zone}
            onChange={(e) => {
                handleChange(e.target.value, i);
            }}
          /></>
        })
      }
      </div>
      <Button
        onClick={async () => {
          if (editLocationsLoading) return;
          await editLocations(locations);
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default MonopolyLocations;
