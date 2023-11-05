import { SessionContext } from ".";
import { SessionContextProps } from "./types";
import { useContext } from "react";

const useSession = () => {
  return <SessionContextProps>useContext(SessionContext);
};

export default useSession;
