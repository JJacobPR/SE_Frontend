import React from 'react';
import styles from './Post.module.scss';

const Post = ({ post, onClose }) => {
  return (
    <div className={styles.postmodal}>
      <button onClick={onClose}>Close</button>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <div className="post-user-info">
        <img src={post.user.avatar} alt={post.user.name} />
        <p>{post.user.name}</p>
        <p>Email: {post.user.email}</p>
      </div>
      <div className="post-comments">
        <h3>Comments:</h3>
        {post.comments.map(comment => (
          <div key={comment.uuid}>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
