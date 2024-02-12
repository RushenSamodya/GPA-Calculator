import { useEffect, useState } from "react";
import GpaWithModuleDetials from "../components/GpaWithModuleDetails";
import { useModulesContext } from "../hooks/useModulesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const GpaCalculatorPage = () => {
  const { modules, dispatch } = useModulesContext();
  const { user } = useAuthContext();
  const [resultInputs, setResultInputs] = useState({});
  const [groupedModules, setGroupedModules] = useState({});

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/module", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_MODULES", payload: json.modules });
        }
      } catch (error) {
        console.error("Error fetching modules:", error.message);
      }
    };

    if (user) {
      fetchModules();
    }
  }, [dispatch, user]);

  useEffect(() => {
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

    setGroupedModules(groupModulesBySemester(modules));
  }, [modules]);

  const handleSelectChange = async (moduleId, value) => {
    setResultInputs((prevInputs) => ({
      ...prevInputs,
      [moduleId]: value,
    }));

    await handleUpdateResult(moduleId, value);
  };

  const handleUpdateResult = async (moduleId, result) => {
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
        // Trigger re-render by updating the state of groupedModules
        setGroupedModules((prevModules) => {
          const updatedModules = { ...prevModules };
          const semester = modules.find((module) => module._id === moduleId).semester;
          updatedModules[semester] = updatedModules[semester].map((module) =>
            module._id === moduleId ? { ...module, result } : module
          );
          return updatedModules;
        });
      } else {
        console.error("Error updating result:", json.error);
      }
    } catch (error) {
      console.error("Error updating result:", error.message);
    }
  };

  return (
    <div className="gpa-calculator">
      {Object.keys(groupedModules).map((semester) => (
        <div key={semester} className="semester">
          <h2>Semester {semester}</h2>
          <div className="modules">
            {groupedModules[semester].map((module) => (
              <div key={module._id}>
                <GpaWithModuleDetials module={module} />
                {/* Styled dropdown to select the result for the module */}
                <div className="dropdown-container">
                  <select
                    className="dropdown"
                    value={resultInputs[module._id] || ""}
                    onChange={(e) => handleSelectChange(module._id, e.target.value)}
                  >
                    <option value="">Select Result</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="B-">B-</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="C-">C-</option>
                    <option value="D">D</option>
                    <option value="I">I</option>
                    <option value="F">F</option>
                  </select>
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
