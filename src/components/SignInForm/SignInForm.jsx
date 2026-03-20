import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import styles from './SignInForm.module.css';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className={styles.background}>
      {/* 🌙 Crescent Overlay */}
      <div className={styles.overlay}></div>

      {/* 🌙 Crescent Moons */}
      <div className={styles.crescentMoon1}></div>
      <div className={styles.crescentMoon2}></div>
      <div className={styles.crescentMoon3}></div>
      <div className={styles.crescentMoon4}></div>

      <div className={styles.card}>
        <h1 className={styles.title}>Sign In</h1>
        <p className={styles.message}>{message}</p>

        <form autoComplete='off' onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Username</label>
            <input
              type='text'
              value={formData.username}
              name='username'
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type='password'
              value={formData.password}
              name='password'
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.primaryBtn}>
              Sign In
            </button>
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignInForm;
