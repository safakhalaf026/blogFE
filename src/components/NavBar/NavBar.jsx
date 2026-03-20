import { Link } from 'react-router';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import styles from './NavBar.module.css';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.leftSection}>
        <div className={styles.logo}></div>
        <h1 className={styles.title}>The Ramadan Diaries</h1>
      </div>

      {user ? (
        <ul className={styles.navLinks}>
          {user.role === 'admin' && (
            <li><Link to='/ramadanPost/new'>Post New Blog</Link></li>
          )}
          <li><Link  to='/'>Home Page</Link></li>
          <li><Link onClick={handleSignOut} to='/'>Sign Out</Link></li>
        </ul>
      ) : (
        <ul className={styles.navLinks}>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/sign-in'>Sign In</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
