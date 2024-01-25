import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const SemesterPage = ({ semester, modules }) => {
  const [semesterGPA, setSemesterGPA] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    // Function to fetch semester GPA
    const fetchSemesterGPA = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/module/calculate-semester-gpa/${semester}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const json = await response.json();
          setSemesterGPA(json.semesterGPA);
        } else {
          console.error("Error fetching semester GPA");
        }
      } catch (error) {
        console.error("Error fetching semester GPA:", error.message);
      }
    };

    fetchSemesterGPA();
  }, [user, semester]);

  return (
    <div className="semester-container" style={{marginBottom: "80px"}}>
      <h2>Semester {semester}</h2>
      <div className="module-list">
        {modules.map((module) => (
          <div key={module._id} className="module-row" style={{display:"flex", gap: "40px"}}>
            <p>{module.title}</p>
            <p>Code: {module.code}</p>
            <p>Result: {module.result}</p>
          </div>
        ))}
      </div>
      <h3 style={{color:"#1aac83"}}>Semester GPA: {semesterGPA}</h3>
    </div>
  );
};

const ModulesListPage = () => {
  const { user } = useAuthContext();
  const [groupedModules, setGroupedModules] = useState({});

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/module", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const json = await response.json();
          const modules = json.modules;

          // Group modules by semester
          const grouped = {};
          modules.forEach((module) => {
            const semester = module.semester;
            if (!grouped[semester]) {
              grouped[semester] = [];
            }
            grouped[semester].push(module);
          });

          setGroupedModules(grouped);
        }
      } catch (error) {
        console.error("Error fetching modules:", error.message);
      }
    };

    if (user) {
      fetchModules();
    }
  }, [user]);

  const calculateTotalGPA = () => {
    const semesterGPAs = [];
    //write a function to get each semester GPAs numbers to the semesterGPAs array
    Object.entries(groupedModules).forEach(([semester, modules]) => {
      const semesterGPA = modules[0].semesterGPA; // Assuming semesterGPA is available in each module
      semesterGPAs.push(semesterGPA);
    });
    //get the total no of semesters to a const
    const totalSemesters = semesterGPAs.length;
    //add each semester gpa and divide by total no of semesters
    let totalGPA = 0;
    for (let i = 0; i < totalSemesters; i++) {
      totalGPA += semesterGPAs[i];
      console.log(totalGPA);
    }
    totalGPA = totalGPA / totalSemesters;
    console.log(totalGPA);
    return totalGPA;
  };

  return (
    <div className="modules-list-page">
      {Object.entries(groupedModules).map(([semester, modules]) => (
        <SemesterPage key={semester} semester={semester} modules={modules} />
      ))}
      <h3 style={{color:"#e7195a"}}>Total GPA:{calculateTotalGPA()}</h3>
    </div>
  );
};

export default ModulesListPage;
