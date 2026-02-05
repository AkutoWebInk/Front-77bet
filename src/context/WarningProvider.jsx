import { createContext, useContext, useState, useEffect } from "react";

const WarningContext = createContext();

export default function WarningProvider({children}){
   
    const[warning, setWarning] = useState(null);

    const push = (msg, type='info') => {
        setWarning({msg, type});
        setTimeout(() => {setWarning(null)}, 3000);
    };
    
    return(
        <WarningContext.Provider value={{warning, push}}>
            {children}
        </WarningContext.Provider>
    );
}

export const useWarning = () => useContext(WarningContext)