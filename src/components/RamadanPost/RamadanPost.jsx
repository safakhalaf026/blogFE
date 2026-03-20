import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { show, getPostIds } from "../../services/ramadanPostService";
import styles from "./RamadanPost.module.css";

function RamadanPost() {
  const { ramadanPostId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [allPostIds, setAllPostIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [revealed, setRevealed] = useState({
    futoor: false,
    suhoor: false,
    micell: false,
  });

  // Fetch all post IDs (sorted by day)
  useEffect(() => {
const fetchAllPostIds = async () => {
  try {
    const ids = await getPostIds(); // getPostIds already returns an array
    if (ids && ids.length > 0) {
      setAllPostIds(ids.map((id) => id.toString()));
    }
  } catch (err) {
    console.error("Failed to fetch post IDs", err);
    setError("Failed to load posts.");
  }
};
    fetchAllPostIds();
  }, []);

  // Fetch current post whenever ID changes
  useEffect(() => {
    const fetchPost = async () => {
      if (!ramadanPostId || allPostIds.length === 0) return; // wait for IDs

      try {
        setLoading(true);
        const data = await show(ramadanPostId);
        setPost(data);
        setRevealed({ futoor: false, suhoor: false, micell: false });
      } catch (err) {
        console.error("Failed to load post", err);
        setError("Failed to load Ramadan post.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [ramadanPostId, allPostIds]);

  const reveal = (type) => {
    setRevealed((prev) => ({ ...prev, [type]: true }));
  };

  if (loading) return <p className={styles.loading}>Loading post...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!post) return <p className={styles.error}>Post not found.</p>;

  // Prev/Next logic
  const currentIndex =
    allPostIds.length > 0 ? allPostIds.indexOf(ramadanPostId.toString()) : -1;

  const prevId = currentIndex > 0 ? allPostIds[currentIndex - 1] : null;
  const nextId =
    currentIndex >= 0 && currentIndex < allPostIds.length - 1
      ? allPostIds[currentIndex + 1]
      : null;

      console.log({ currentIndex, prevId, nextId });

  const goPrev = () => prevId && navigate(`/ramadan/${prevId}`);
  const goNext = () => nextId && navigate(`/ramadan/${nextId}`);

  return (
    <div className={styles.background}>
      <div className={styles.overlay}></div>
      <div className={styles.crescentMoon1}></div>
      <div className={styles.crescentMoon2}></div>
      <div className={styles.crescentMoon3}></div>
      <div className={styles.crescentMoon4}></div>

      <div className={styles.card}>
        <h1 className={styles.title}>{post.title}</h1>

        <div className={styles.meta}>
          <span>Day {post.day}</span>
          <span>Today I'm feeling {post.feelings}</span>
        </div>

        <p className={styles.content}>{post.content}</p>

        {/* Images row */}
        <div className={styles.imagesRow}>
          {post.futoorImage && (
            <div className={styles.foodSection}>
              {post.futoorName && (
                <h3 className={styles.sectionTitle}>
                  Today's futoor is {post.futoorName}
                </h3>
              )}
              <div className={styles.imageWrapper}>
                <img
                  src={post.futoorImage}
                  alt={post.futoorName}
                  className={`${styles.foodImage} ${
                    !revealed.futoor ? styles.hiddenImage : ""
                  }`}
                />
                {!revealed.futoor && (
                  <button
                    className={styles.revealButton}
                    onClick={() => reveal("futoor")}
                  >
                    Tap here to view
                  </button>
                )}
              </div>
            </div>
          )}

          {post.suhoorImage && (
            <div className={styles.foodSection}>
              {post.suhoorName && (
                <h3 className={styles.sectionTitle}>
                  Today's suhoor is {post.suhoorName}
                </h3>
              )}
              <div className={styles.imageWrapper}>
                <img
                  src={post.suhoorImage}
                  alt={post.suhoorName}
                  className={`${styles.foodImage} ${
                    !revealed.suhoor ? styles.hiddenImage : ""
                  }`}
                />
                {!revealed.suhoor && (
                  <button
                    className={styles.revealButton}
                    onClick={() => reveal("suhoor")}
                  >
                    Tap here to view
                  </button>
                )}
              </div>
            </div>
          )}

          {post.micellImage && (
            <div className={styles.foodSection}>
              {post.micellName && (
                <h3 className={styles.sectionTitle}>
                  Today's random photo is {post.micellName}
                </h3>
              )}
              <div className={styles.imageWrapper}>
                <img
                  src={post.micellImage}
                  alt={post.micellName}
                  className={`${styles.foodImage} ${
                    !revealed.micell ? styles.hiddenImage : ""
                  }`}
                />
                {!revealed.micell && (
                  <button
                    className={styles.revealButton}
                    onClick={() => reveal("micell")}
                  >
                    Tap here to view
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className={styles.navigation}>
          <button
            onClick={goPrev}
            className={styles.navButton}
            disabled={!prevId}
          >
            ← Previous
          </button>
          <button
            onClick={goNext}
            className={styles.navButton}
            disabled={!nextId}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default RamadanPost;