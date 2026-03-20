import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import * as ramadanPostService from '../../services/ramadanPostService';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await ramadanPostService.index();
      if (data) {
        const sorted = [...data].sort((a, b) => a.day - b.day);
        setPosts(sorted);
      }
    };

    if (user) fetchPosts();
  }, [user]);

  return (
    <main className={styles.background}>
      {/* 🌙 Crescent Overlay */}
      <div className={styles.overlay}></div>

      {/* 🌙 Crescent Moons */}
      <div className={styles.crescentMoon1}></div>
      <div className={styles.crescentMoon2}></div>
      <div className={styles.crescentMoon3}></div>
      <div className={styles.crescentMoon4}></div>

      <div className={styles.container}>
        <h1>Welcome back, {user.username} 🌙</h1>

        <div className={styles.grid}>
          {posts.map((post) => (
            <button
              key={post._id}
              onClick={() => navigate(`/ramadanPost/${post._id}`)}
              className={styles.dayButton}
            >
              Day {post.day}
            </button>
          ))}
        </div>

        {posts.length === 0 && <p>No entries yet.</p>}
      </div>
    </main>
  );
};

export default Dashboard;