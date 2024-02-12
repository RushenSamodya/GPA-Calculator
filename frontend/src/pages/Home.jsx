import React, { useEffect } from "react";
import ModuleDetails from "../components/ModuleDetails";
import ModuleForm from "../components/ModuleForm";
import { useModulesContext } from "../hooks/useModulesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { modules, dispatch } = useModulesContext();
  const { user } = useAuthContext();

  const groupModulesByLevel = (modules) => {
    const groupedModules = {};

    if (!modules) {
      return groupedModules;
    }

    modules.forEach((module) => {
      const semester = module.semester;
      const level = Math.ceil(semester / 2); // Calculate level

      if (!groupedModules[level]) {
        groupedModules[level] = {
          levelNumber: level,
          semesters: {},
        };
      }

      const semesterInLevel = semester % 2 === 0 ? 2 : 1; // Calculate semester within level

      if (!groupedModules[level].semesters[semesterInLevel]) {
        groupedModules[level].semesters[semesterInLevel] = [];
      }

      groupedModules[level].semesters[semesterInLevel].push(module);
    });

    return groupedModules;
  };

  const groupedModules = groupModulesByLevel(modules);

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

  return (
    <div className="home">
      <div>
        {Object.values(groupedModules).map((level) => (
          <div key={level.levelNumber} className="level">
            <h2>Level {level.levelNumber}</h2>
            <div className="semesters">
              {Object.entries(level.semesters).map(
                ([semesterNumber, modules]) => (
                  <div key={semesterNumber} className="semester">
                    <h3>Semester {semesterNumber}</h3>
                    <div className="modules">
                      {modules.map((module) => (
                        <ModuleDetails key={module._id} module={module} />
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      <div>
        <ModuleForm />
      </div>
    </div>
  );
};

export default Home;
