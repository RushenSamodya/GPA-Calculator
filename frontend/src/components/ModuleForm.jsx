import { useState } from "react"
import { useModulesContext } from "../hooks/useModulesContext";
import { useAuthContext } from "../hooks/useAuthContext";


const ModuleForm = () => {
    const { dispatch } = useModulesContext();
    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");
    const [semester, setSemester] = useState("");
    const [weight, setWeight] = useState();
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user){
          setError("You must be logged in to add a module");
          return;
        }
        
        const module = { title, code, semester, weight };

        const response = await fetch("http://localhost:8000/api/v1/module", {
            method: "POST",
            body: JSON.stringify(module),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            },
            
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if(response.ok){
            setTitle("");
            setCode("");
            setSemester("");
            setWeight();
            setError(null);
            setEmptyFields([]);
            console.log("Module added successfully");
            dispatch({type: 'CREATE_MODULE', payload:json.module});

        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}> 
          <h3>Add a New Module</h3>
    
          <label>Module Title:</label>
          <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)} 
            value={title}
            className={emptyFields.includes("title") ? "empty" : ""}
          />
    
          <label>Module Code:</label>
          <input 
            type="text" 
            onChange={(e) => setCode(e.target.value)} 
            value={code}
            className={emptyFields.includes("code") ? "empty" : ""}
          />
    
          <label>Semester:</label>
          <input 
            type="text" 
            onChange={(e) => setSemester(e.target.value)} 
            value={semester}
            className={emptyFields.includes("reps") ? "empty" : ""}
          />

          <label>Weight:</label>
          <input 
            type="number" 
            onChange={(e) => setWeight(e.target.value)} 
            value={weight}
            className={emptyFields.includes("reps") ? "empty" : ""}
          />    
          <button>Add Module</button>
          {error && <div className="error">{error}</div>}
        </form>
      )
}

export default ModuleForm
