import { useQuery } from "react-query";
import { GET_ROOMS } from "../services/sharedQueries";

const Games = () => {
  const { data: roomsData } = useQuery(GET_ROOMS);

  return (
    <div>{roomsData.map(()=>{
      return <div>Hello</div>
    })}</div>
  )
}

export default Games