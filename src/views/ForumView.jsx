import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostList from '../components/forum/PostList';
class ForumView extends React.Component {

  render() {
    return (
      <div>
        <PostList />
      </div>
    );
  }
}

export default ForumView;
