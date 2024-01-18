import { useModulesContext } from '../hooks/useModulesContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../hooks/useAuthContext';

const ModuleDetails = ({ module }) => {

  const { dispatch } = useModulesContext();
  const { user } = useAuthContext();

  const handleCLick = async () => {

    if(!user){
      console.log("You must be logged in to delete a module");
      return;
    }

    const response = await fetch(`http://localhost:4000/api/v1/module/${module._id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if(response.ok){
      console.log("module deleted successfully");
      dispatch({type: 'DELETE_MODULE', payload:json.module});
    }
  }

  return (
    <div className="module-details">
      <h4>{module.title}</h4>
      <p>
        <strong>Code: </strong> {module.code}
      </p>
      <p>
        <strong>Semester: </strong> {module.semester}
      </p>
      <p>
        <strong>Weight: </strong> {module.weight}
      </p>
      <p>{module.createdAt}</p>
      <div>
      <span onClick={handleCLick}><FontAwesomeIcon icon={faTrash} color='#e7195a'/></span>
      </div>
    </div>
  );
};

export default ModuleDetails;
