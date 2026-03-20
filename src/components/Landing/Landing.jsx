import { useNavigate } from 'react-router';
import styles from './Landing.module.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.background}>
      <div className={styles.content}>
        
        <div className={styles.logo}></div>
        <h1 className={styles.title}>The Ramadan Diaries</h1>

        <p className={styles.message}>
          I made this space just for you.  
          A quiet little corner of the night where thoughts, reflections,
          and moments from this Ramadan can live gently.  
          I hope when you read through these entries, you feel the care,
          intention, and warmth behind every word. 
        </p>

        <button
          className={styles.button}
          onClick={() => navigate('/sign-in')}
        >
          Enter
        </button>

      </div>
    </main>
  );
};

export default Landing;
