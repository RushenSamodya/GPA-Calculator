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
    <div className="semester-container" style={{ marginBottom: "80px" }}>
      <h2>Semester {semester}</h2>
      <table className="modules-table">
        <thead>
          <tr>
            <th>Module</th>
            <th>Code</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((module) => (
            <tr key={module._id}>
              <td>{module.title}</td>
              <td>{module.code}</td>
              <td>{module.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 style={{ color: "#1aac83" }}>Semester GPA: {semesterGPA}</h3>
    </div>
  );
};


const ModulesListPage = () => {
  const { user } = useAuthContext();
  const [groupedModules, setGroupedModules] = useState({});
  const [totalGPA, setTotalGPA] = useState(null);

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

  useEffect(() => {
    // Function to fetch total GPA
    const fetchTotalGPA = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/module/calculate-semester-gpa/1", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const json = await response.json();
          setTotalGPA(json.totalGPA);
        } else {
          console.error("Error fetching total GPA");
        }
      } catch (error) {
        console.error("Error fetching total GPA:", error.message);
      }
    };

    fetchTotalGPA();
  }, []);

  return (
    <div className="modules-list-page">
      {Object.entries(groupedModules).map(([semester, modules]) => (
        <SemesterPage key={semester} semester={semester} modules={modules} semesterGPA={modules[0].semesterGPA} />
      ))}
      <h3 style={{ color: "#e7195a" }}>Total GPA: {totalGPA}</h3>
    </div>
  );
};

export default ModulesListPage;
