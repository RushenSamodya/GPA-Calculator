import { ModuleContext } from "../context/ModuleContext";
import { useContext } from "react"; 

export const useModulesContext = () => {
    const context = useContext(ModuleContext);

    if(!context) throw new Error("useModulesContext must be used within a ModuleContextProvider");

    return context;
}