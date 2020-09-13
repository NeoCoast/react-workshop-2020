import React, { useEffect, useState } from 'react';
import Loader from '@Components/Loader';
import NewPost from '@Components/NewPost';
import postsService from '@Api/posts.service';
import usersService from '@Api/users.service';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await usersService.index();
        setUsers(res);
      } catch (error) {
        /* handle error */
        console.error('error: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const createPost = async (postData, cb) => {
    try {
      await postsService.create(postData);
    } catch (error) {
      /* handle error */
      console.error('error: ', error);
    } finally {
      cb();
    }
  };

  if (loading) return <Loader />;

  return (
    <NewPost users={users} onSubmit={createPost} />
  );
};

export default Home;
