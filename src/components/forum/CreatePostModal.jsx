import React, { useState } from 'react';
import axios from "axios";
import styles from './CreatePostModal.module.scss';
import ApiHelper from '../../helpers/ApiHelper';

const CreatePostModal = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const csrfToken = await ApiHelper.fetchCsrfToken();

    try {
      const response = await axios.post('/api/posts', {
        title,
        description: content,
        image: "notnull"
      }, {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': csrfToken,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Post created successfully:', response.data);
      onClose();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className={styles.createPostModalBackground}>
      <div className={styles.createPostModal}>
        <button onClick={onClose} className={styles.closeButton}>Close</button>
        <form onSubmit={handleSubmit}>
          <h2>Create New Post</h2>
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Content
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </label>
          <button type="submit" className={styles.submitButton}>Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
