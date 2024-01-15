import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';
import ApiHelper from '../../helpers/ApiHelper';
import styles from './PostList.module.scss'

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchAndSetPosts = async () => {
      try {
        const response = await ApiHelper.fetchPosts(currentPage);
        setPosts(response);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchAndSetPosts();
  }, [currentPage]);

  const handlePostClick = async (uuid) => {
    try {
      const fullPost = await ApiHelper.fetchPost(uuid);
      setSelectedPost(fullPost);
    } catch (error) {
      console.error('Error fetching full post:', error);
    }
  };
  

  return (
    <div className={styles.postlist}>
      {posts.map(post => (
        <div className={styles.postlistitem} key={post.uuid} onClick={() => handlePostClick(post.uuid)}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <p>Comments: {post.comments_count}</p>
        </div>
      ))}
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
      <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>

      {selectedPost && (
        <div className="post-modal-background">
          <Post post={selectedPost} onClose={() => setSelectedPost(null)} />
        </div>
      )}
    </div>
  );
};

export default PostList;
