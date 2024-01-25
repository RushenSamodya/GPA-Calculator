// GpaCalculatorPage.jsx

import { useEffect, useState } from "react";
import GpaWithModuleDetials from "../components/GpaWithModuleDetails";
import { useModulesContext } from "../hooks/useModulesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const GpaCalculatorPage = () => {
  const { modules, dispatch } = useModulesContext();
  const { user } = useAuthContext();
  const [resultInputs, setResultInputs] = useState({});

  const groupModulesBySemester = (modules) => {
    const groupedModules = {};

    if (!modules) {
      return groupedModules;
    }

    modules.forEach((module) => {
      const semester = module.semester;

      if (!groupedModules[semester]) {
        groupedModules[semester] = [];
      }

      groupedModules[semester].push(module);
    });

    return groupedModules;
  };

  const groupedModules = groupModulesBySemester(modules);

  useEffect(() => {
    const fetchModules = async () => {
      const response = await fetch("http://localhost:8000/api/v1/module", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_MODULES", payload: json.modules });
      }
    };

    if (user) {
      fetchModules();
    }
  }, [dispatch, user]);

  const handleInputChange = (moduleId, value) => {
    setResultInputs((prevInputs) => ({
      ...prevInputs,
      [moduleId]: value,
    }));
  };

  const handleUpdateResult = async (moduleId) => {
    const result = resultInputs[moduleId];

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/module/${moduleId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ result }),
        }
      );

      const json = await response.json();

      if (response.ok) {
        console.log(`Result for module ${moduleId} updated to:`, result);
        // Reset the input for the module
        setResultInputs((prevInputs) => ({
          ...prevInputs,
          [moduleId]: "",
        }));
      } else {
        console.error("Error updating result:", json.error);
      }
    } catch (error) {
      console.error("Error updating result:", error.message);
    }
  };

  return (
    <div className="gpa-calculator">
      {Object.entries(groupedModules).map(([semester, semesterModules]) => (
        <div key={semester} className="semester">
          <h2>Semester {semester}</h2>
          <div className="modules">
            {semesterModules.map((module) => (
              <div key={module._id}>
                <GpaWithModuleDetials module={module} />
                {/* Input to enter the result for the module */}
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <input
                    type="text"
                    placeholder="Enter Result"
                    value={resultInputs[module._id] || ""}
                    onChange={(e) => handleInputChange(module._id, e.target.value)}
                    style={{width:"50%"}}
                  />
                  {/* Button to update the result for the module */}
                  <button onClick={() => handleUpdateResult(module._id)} className="button" style={{height: "40px"}}>
                    Update Result
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GpaCalculatorPage;
