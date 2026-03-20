import React, { useState } from "react";
import { create } from "../../services/ramadanPostService";
import styles from "./RamadanPostForm.module.css";

const RamadanPostForm = () => {
  const [form, setForm] = useState({
    day: "",
    title: "",
    content: "",
    feelings: "",
    suhoorName: "",
    futoorName: "",
    micellName: "",
  });

  const [suhoorImage, setSuhoorImage] = useState(null);
  const [futoorImage, setFutoorImage] = useState(null);
  const [micellImage, setMicellImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      setMessage("Please fill in required fields.");
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    if (suhoorImage) formData.append("suhoorImage", suhoorImage);
    if (futoorImage) formData.append("futoorImage", futoorImage);
    if (micellImage) formData.append("micellImage", micellImage);

    try {
      setLoading(true);
      await create(formData);
      setMessage("Post uploaded successfully 🌙");

      setForm({
        day: "",
        title: "",
        content: "",
        feelings: "",
        suhoorName: "",
        futoorName: "",
        micellName: "",
      });

      setSuhoorImage(null);
      setFutoorImage(null);
      setMicellImage(null);
    } catch (err) {
      console.error(err);
      setMessage("Failed to upload post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.background}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create Ramadan Entry</h2>
        {message && <p className={styles.message}>{message}</p>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">

          <div className={styles.group}>
            <input
              type="text"
              name="day"
              placeholder="Day"
              value={form.day}
              onChange={handleChange}
            />
          </div>

          <div className={styles.group}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.group}>
            <textarea
              name="content"
              placeholder="Write your reflections..."
              value={form.content}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.group}>
            <input
              type="text"
              name="feelings"
              placeholder="How did today feel?"
              value={form.feelings}
              onChange={handleChange}
            />
          </div>

          <div className={styles.sectionTitle}>Suhoor</div>
          <div className={styles.groupRow}>
            <input
              type="text"
              name="suhoorName"
              placeholder="Suhoor Name"
              value={form.suhoorName}
              onChange={handleChange}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSuhoorImage(e.target.files[0])}
            />
          </div>

          <div className={styles.sectionTitle}>Futoor</div>
          <div className={styles.groupRow}>
            <input
              type="text"
              name="futoorName"
              placeholder="Futoor Name"
              value={form.futoorName}
              onChange={handleChange}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFutoorImage(e.target.files[0])}
            />
          </div>

          <div className={styles.sectionTitle}>Miscellaneous</div>
          <div className={styles.groupRow}>
            <input
              type="text"
              name="micellName"
              placeholder="Miscellaneous Name"
              value={form.micellName}
              onChange={handleChange}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setMicellImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.button}
          >
            {loading ? "Uploading..." : "Save Entry"}
          </button>

        </form>
      </div>
    </main>
  );
};

export default RamadanPostForm;
