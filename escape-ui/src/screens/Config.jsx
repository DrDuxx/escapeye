import { Navigate, useParams } from "react-router";
import { useQuery } from "react-query";
import { GET_ROOM_BY_ROOM_NUMBER } from "../services/sharedQueries";
import { updateIpAddress } from "../services/axios";
import { useEffect } from "react";

const Config = () => {
  const { roomNumber } = useParams();

  const {
    data: roomData,
    refetch: getRoomData,
    isFetching: isRoomDataLoading,
  } = useQuery([GET_ROOM_BY_ROOM_NUMBER, { roomNumber }], { enabled: false });

  
  useEffect(() => {
    if (roomNumber) {
      updateIpAddress(window.location.hostname);
      getRoomData();
    }
    
  }, [getRoomData, roomNumber])
  
  if (roomData && !isRoomDataLoading) {
    localStorage.setItem("roomNumber", roomNumber);
    localStorage.setItem("roomId", roomData?.id);
    return <Navigate to="/home" />;
  }

  return <></>;
};

export default Config;
