import { createContext } from "react";
import { assets_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    
    const contextValue = {
        assets_list
    }
  return (
    <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
  )
}

export default StoreContextProvider;