import { useEffect } from "react"
import ModuleDetails from "../components/ModuleDetails";
import ModuleForm from "../components/ModuleForm";
import { useModulesContext } from "../hooks/useModulesContext";
import { useAuthContext } from "../hooks/useAuthContext";


const Home = () => {

  const {modules, dispatch} = useModulesContext();
  const {user} = useAuthContext();

  useEffect(() => {
    const fetchModules = async () => {
      const response = await fetch("http://localhost:8000/api/v1/module", {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if(response.ok){
        dispatch({type: 'SET_MODULES', payload:json.modules});
      }
    }

    if(user){
      fetchModules();
    }
  }, [dispatch, user])

  return (
    <div className="home">
        <div className="modules">
          {modules && modules.map((module)=>(
            <ModuleDetails key={module._id} module={module}/>
          ))}
        </div>
        <ModuleForm/>
    </div>
  )
}

export default Home
