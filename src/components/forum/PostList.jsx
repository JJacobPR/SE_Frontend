import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';
import CreatePostModal from './CreatePostModal';
import ApiHelper from '../../helpers/ApiHelper';
import styles from './PostList.module.scss';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

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

  const applyBlur = (selectedPost !== null || showCreatePostModal) ? styles.blurred : '';

  return (
    <div className={styles.postlist}>
      <div className={applyBlur}>
      <div className={styles.createPostButton}>
        <button onClick={() => setShowCreatePostModal(true)}>Create New Post</button>
      </div>
      {posts.map(post => (
        <div className={styles.postlistitem} key={post.uuid} onClick={() => handlePostClick(post.uuid)}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <p>Comments: {post.comments_count}</p>
        </div>
      ))}
      
      <div className={styles.paginationbuttons}>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
      </div>

      {showCreatePostModal && (
        <CreatePostModal onClose={() => setShowCreatePostModal(false)} />
      )}

      {selectedPost && (
        <div>
          <Post post={selectedPost} onClose={() => setSelectedPost(null)} />
        </div>
      )}
    </div>
  );
};

export default PostList;
