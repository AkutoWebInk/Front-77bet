import { createContext, useContext, useState } from "react";

const DepositContext = createContext();

export default function DepositProvider({children}){
   
    const[isVisible, setIsVisible] = useState(false);
    
    return(
        <DepositContext.Provider value={{isVisible, setIsVisible}}>
            {children}
        </DepositContext.Provider>
    );
}

export const useDeposit = () => useContext(DepositContext);
