import { NavLink, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './styles/app.scss';

function App() {
  const getClassName = ({ isActive }) => (isActive ? 'nav-item active' : 'nav-item');

  return (
    <div className='app'>
      <header className='header'>
        <div className='left'>
          <span className='brand'>Purrfect Pals</span>
        </div>
        <div className='right'>
          <nav className='topnav'>
            <NavLink className={getClassName} to='/home'>
              Home
            </NavLink>
            <NavLink className={getClassName} to='/pets'>
              Pets
            </NavLink>
            <NavLink className={getClassName} to='/about'>
              About Us
            </NavLink>
            <NavLink className={getClassName} to='/contact'>
              Contact
            </NavLink>
          </nav>
        </div>
      </header>
      <Outlet />
      <ToastContainer
        position='top-right'
        theme='colored'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
