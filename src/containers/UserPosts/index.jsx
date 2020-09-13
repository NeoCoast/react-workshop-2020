import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostsList from '@Components/PostsList';
import postsService from '@Api/posts.service';
import './index.scss';

const Home = () => {
  const { id: userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await postsService.index(userId);
        setPosts(res);
      } catch (error) {
        /* handle error */
        console.error('error: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <PostsList loading={loading} posts={posts} />
  );
};

export default Home;
