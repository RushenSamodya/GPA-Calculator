import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ModuleDetails from "../components/ModuleDetails";
import GPAInfoCard from "../components/GPAInfocard";

const GpaPredictor = () => {
  const { user } = useAuthContext();
  const [totalWeight, setTotalWeight] = useState(null);
  const [currentGPA, setCurrentGPA] = useState(null);
  const [currentSemester, setCurrentSemester] = useState(null);
  const [specialModules, setSpecialModules] = useState([]);
  const [generalModules, setGeneralModules] = useState([]);
  const [currentSemesterInput, setCurrentSemesterInput] = useState("");
  const [remainingSemesters, setRemainingSemesters] = useState(null);
  const [firstClassGPA, setFirstClassGPA] = useState(null);
  const [secondUpperGPA, setSecondUpperGPA] = useState(null);
  const [secondLowerGPA, setSecondLowerGPA] = useState(null);
  const [generalPassGPA, setGeneralPassGPA] = useState(null);
  const [canTakeFirstClass, setCanTakeFirstClass] = useState(null);

  const handleInputChange = (e) => {
    setCurrentSemesterInput(e.target.value);
  };

  const calculateRemainingSemesters = () => {
    // Assuming there are 8 semesters in total
    const totalSemesters = 8;

    // Validate if the input is a number between 1 and totalSemesters
    const currentSemester = parseInt(currentSemesterInput);
    if (
      isNaN(currentSemester) ||
      currentSemester < 1 ||
      currentSemester > totalSemesters
    ) {
      // Handle invalid input
      console.error("Invalid current semester input");
      return;
    }

    // Calculate remaining semesters
    const remaining = totalSemesters - currentSemester;
    setRemainingSemesters(remaining);

    // Calculate required GPAs for different classes
    const firstClassGPA = 3.8; // Adjust this value as needed
    const secondUpperGPA = 3.5; // Adjust this value as needed
    const secondLowerGPA = 2.8; // Adjust this value as needed
    const generalPassGPA = 2.0; // Adjust this value as needed

    setFirstClassGPA(firstClassGPA);
    setSecondUpperGPA(secondUpperGPA);
    setSecondLowerGPA(secondLowerGPA);
    setGeneralPassGPA(generalPassGPA);

    // Calculate user's current GPA (replace this with the actual current GPA calculation)
    const currentGPA = 3.0; // Replace with the actual current GPA

    // Check if user can take a first class
    setCanTakeFirstClass(currentGPA >= firstClassGPA);
  };

  useEffect(() => {
    // Function to fetch semester GPA and selective modules
    const fetchData = async () => {
      try {
        // Fetch semester GPA
        const response = await fetch(
          `http://localhost:8000/api/v1/module/calculate-semester-gpa/4`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.ok) {
          const json = await response.json();
          setTotalWeight(json.totalWeightAll);
          setCurrentGPA(json.totalGPA);
          setCurrentSemester(json.numberOfSemesters);
        } else {
          console.error("Error fetching total Weight");
        }

        // Fetch selective modules
        const modulesResponse = await fetch(
          "http://localhost:8000/api/v1/selective",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (modulesResponse.ok) {
          const modulesJson = await modulesResponse.json();
          // Separate special and general modules
          const special = modulesJson.selectiveModules.filter(
            (module) => module.isSpecial
          );
          const general = modulesJson.selectiveModules.filter(
            (module) => !module.isSpecial
          );

          setSpecialModules(special);
          setGeneralModules(general);
        } else {
          console.error("Error fetching selective modules");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [user.token]);

  return (
    <div>
      <h2 style={{ color: "#1aac83" }}>
        Total Credits Upto Now: {totalWeight}
      </h2>

      <Tabs>
        <TabList>
          <Tab style={{ color: "#1aac83" }}>General Degree</Tab>
          <Tab style={{ color: "#1aac83" }}>Special Degree</Tab>
          <Tab style={{ color: "#1aac83" }}>Joint Major</Tab>
        </TabList>

        <TabPanel>
          <h3>Total Credits Required: {90 - totalWeight}</h3>
          <p>Current GPA: {currentGPA}</p>
          <h4 style={{ fontWeight: "bold" }}>General Modules</h4>

          <Tabs>
            <TabList>
              <Tab style={{ color: "#000000" }}>Combination 1</Tab>
              <Tab style={{ color: "#000000" }}>Combination 2</Tab>
              <Tab style={{ color: "#000000" }}>Combination 3</Tab>
            </TabList>

            {/* General Combination 1 */}
            <TabPanel>
            <div>
              {generalModules
                .filter((module) => module.combinationType === "1")
                .map((module) => (
                  <ModuleDetails key={module._id} module={module} />
                ))}
            </div>

            </TabPanel>  

            {/* General Combination 2 */}
            <TabPanel>
            <div>
              {generalModules
                .filter((module) => module.combinationType === "2")
                .map((module) => (
                  <ModuleDetails key={module._id} module={module} />
                ))}
            </div>
              
            </TabPanel> 
              {/* General Combination 3 */}
            <TabPanel>
            <div>
              {generalModules
                .filter((module) => module.combinationType === "3")
                .map((module) => (
                  <ModuleDetails key={module._id} module={module} />
                ))}
            </div>
              
            </TabPanel> 

          </Tabs>
        </TabPanel>

        <TabPanel>
          <h3>Total Credits Required: {120 - totalWeight}</h3>
          <p>Current GPA: {currentGPA}</p>
          <h4 style={{ fontWeight: "bold" }}>Special Modules</h4>

          <Tabs>
            <TabList>
              <Tab style={{ color: "#000000" }}>IMGT</Tab>
              <Tab style={{ color: "#000000" }}>CMIS</Tab>
              <Tab style={{ color: "#000000" }}>ELTN</Tab>
              <Tab style={{ color: "#000000" }}>MATH</Tab>
            </TabList>

            {/* Special Combination 1 */}
            <TabPanel>
            <div>
              
              {generalModules
                .filter((module) => module.combinationType === "1")
                .map((module) => (
                  <ModuleDetails key={module._id} module={module} />
                ))}
            </div>
            </TabPanel>  

            {/* Speical Combination 2 */}
            <TabPanel>
            <div>
              {generalModules
                .filter((module) => module.combinationType === "2")
                .map((module) => (
                  <ModuleDetails key={module._id} module={module} />
                ))}
            </div>
            </TabPanel> 

            {/* Special Combination 3 */}
            <TabPanel>
            <div>
              {generalModules
                .filter((module) => module.combinationType === "4")
                .map((module) => (
                  <ModuleDetails key={module._id} module={module} />
                ))}
            </div>
            </TabPanel> 

            {/* Special Combination 4 */}
            <TabPanel>
            <div>
              {generalModules
                .filter((module) => module.combinationType === "4")
                .map((module) => (
                  <ModuleDetails key={module._id} module={module} />
                ))}
            </div>
            </TabPanel> 

          </Tabs>

    
        </TabPanel>

        <TabPanel>
          <h3>Total Credits Required: {90 - totalWeight}</h3>
          <p>Current GPA: {currentGPA}</p>
          <h4 style={{ fontWeight: "bold" }}>General Modules</h4>

          <Tabs>
            <TabList>
              <Tab style={{ color: "#000000" }}>Combination 1</Tab>
              <Tab style={{ color: "#000000" }}>Combination 2</Tab>
              <Tab style={{ color: "#000000" }}>Combination 3</Tab>
              <Tab style={{ color: "#000000" }}>Combination 4</Tab>
            </TabList>

            {/* Joint Major Combination 1 */}
            <TabPanel>
            <div>
              {generalModules
                .filter((module) => module.combinationType === "1")
                .map((module) => (
                  <ModuleDetails key={module._id} module={module} />
                ))}
            </div>

            </TabPanel>  

            {/* Joint Major Combination 2 */}
            <TabPanel>
            <div>
              {generalModules
                .filter((module) => module.combinationType === "2")
                .map((module) => (
                  <ModuleDetails key={module._id} module={module} />
                ))}
            </div>
              
            </TabPanel> 

          </Tabs>
        </TabPanel>
      </Tabs>

      <hr />

      <h2 style={{ color: "#1aac83" }}>Required GPA</h2>

      <div>
        <div style={{ alignItems: "center" }}>
          <input
            type="text"
            placeholder="Enter the current semester"
            value={currentSemesterInput}
            onChange={handleInputChange}
            style={{ width: "50%" }}
          />

          <button
            className="button"
            style={{ height: "40px" }}
            onClick={calculateRemainingSemesters}
          >
            Calculate Remaining GPA
          </button>
        </div>

        {remainingSemesters !== null && (
          <div>
            <h3>Remaining Semesters: {remainingSemesters}</h3>
      
            <GPAInfoCard title="Required Average GPA for First Class" value={firstClassGPA} />
            <GPAInfoCard title="Required Average GPA for Second Upper" value={secondUpperGPA} />
            <GPAInfoCard title="Required Average GPA for Second Lower" value={secondLowerGPA} />
            <GPAInfoCard title="Required Average GPA for General Pass" value={generalPassGPA} />

            {canTakeFirstClass !== null && (
              <h5 style={{color: "#e7195a"}}>
                {canTakeFirstClass
                  ? "With the current GPA, you can take a First Class."
                  : `With the current GPA, you cannot take a First Class.`}
              </h5>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GpaPredictor;
