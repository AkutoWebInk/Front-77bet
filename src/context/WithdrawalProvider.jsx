import { createContext, useContext, useState } from "react";

const WithdrawalContext = createContext();

export default function WithdrawalProvider({children}){
   
    const[isVisible, setIsVisible] = useState(false);
    
    return(
        <WithdrawalContext.Provider value={{isVisible, setIsVisible}}>
            {children}
        </WithdrawalContext.Provider>
    );
}

export const useWithdrawal = () => useContext(WithdrawalContext);
