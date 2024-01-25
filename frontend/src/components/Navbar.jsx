import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext'; 

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  }

  return (
    <header>
    <div className='container'>
      {user && <div className='nav-container'>
      <Link to="/">
        <h3>Module List</h3>
      </Link>
      <Link to="/calculator">
        <h3>Add Results</h3>
      </Link>
      <Link to="/module-list">
        <h3>GPA Calculator</h3>
      </Link>
      </div>}
      {!user && <h3>GPA Calculator</h3>}
      <nav >
        { user && (<div>
          <span>{user.email}</span>
          <button onClick={handleClick}>Logout</button>
        </div>)}
        {!user && (<div>
          <Link to="/login"> <button>Login</button></Link>
          <Link to="/signup"><button>Sign Up</button></Link>
        </div>)}
      </nav>
    </div>
    </header>
  )
}

export default Navbar
