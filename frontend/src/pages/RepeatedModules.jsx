import { useEffect, useState } from "react";
import RepeatModuleForm from "../components/RepeatModuleForm";
import { useModulesContext } from "../hooks/useModulesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import RemovedModuleDetails from "../components/RemovedModuleDetails";
import { background } from '@chakra-ui/react';


const Home = () => {

  const {modules, dispatch} = useModulesContext();
  const {user} = useAuthContext();

  const [totalWeight, setTotalWeight] = useState(0);

  useEffect(() => {
    const fetchModules = async () => {
      const response = await fetch("http://localhost:8000/api/v1/repeated", {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if(response.ok){
        dispatch({type: 'SET_MODULES', payload:json.repeatedModules
    });
      }
    }

    if(user){
      fetchModules();
    }
  }, [dispatch, user])

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
        } else {
          console.error("Error fetching total Weight");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [user.token]);



  return (
    <div className="home">
      <div className="moduleList">
      {modules && modules.map((module) => (
          <RemovedModuleDetails key={module._id} module={module} bgColour={totalWeight < 90 ? "#e7195a" : "#1aac83"}/>
        ))}
            
    </div>
        <RepeatModuleForm/>
    </div>
  )
}

export default Home

