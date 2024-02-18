import React, { useEffect, useState } from "react";
import { useModulesContext } from "../hooks/useModulesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import ModuleDetails from "../components/ModuleDetails";

const RepeatModulesPage = () => {
  const { modules } = useModulesContext();
  const { user } = useAuthContext();
  const [repeatModules, setRepeatModules] = useState([]);

  useEffect(() => {
    if (modules) {
      const repeatModulesList = modules.filter(module => {
        // Assuming grades "D", "F", and "I" represent repeat modules
        return module.result === "D" || module.result === "F" || module.result === "I"|| module.result === "C-";
      });
      setRepeatModules(repeatModulesList);
    }
  }, [modules]);

  return (
    <div className="repeat-modules">
      <h2>Repeat Modules</h2>
      {repeatModules.length > 0 ? (
        repeatModules.map(module => (
          <ModuleDetails key={module._id} module={module} />
        ))
      ) : (
        <p>No repeat modules found.</p>
      )}
    </div>
  );
};

export default RepeatModulesPage;
