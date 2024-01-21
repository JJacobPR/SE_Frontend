import React, { useState } from 'react';
import axios from "axios";
import styles from './Post.module.scss';
import ApiHelper from '../../helpers/ApiHelper';


const Post = ({ post, onClose }) => {
  const [commentContent, setCommentContent] = useState('');

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    const csrfToken = await ApiHelper.fetchCsrfToken();

    try {
      const response = await axios.post('/api/comments', {
        content: commentContent,
        post_uuid: post.uuid
      }, {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': csrfToken,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Comment created successfully:', response.data);
      setCommentContent('');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <div className={styles.postModalBackground}>
      <div className={styles.postmodal}>
        <button onClick={onClose} className={styles.closeButton}>Close</button>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        <div className={styles.postUserInfo}>
          <h3>Author</h3>
          <img src={post.user.avatar} alt={post.user.name} />
          <p>{post.user.name}</p>
          <p>Email: {post.user.email}</p>
        </div>
        <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Write a comment..."
            required
          />
          <button type="submit" className={styles.submitButton}>Submit Comment</button>
        </form>
        <div className={styles.postComments}>
          <h3>Comments:</h3>
          {post.comments.map(comment => (
            <div key={comment.uuid} className={styles.comment}>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
