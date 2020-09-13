import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Avatar,
  Button,
  Col,
  Row,
  Typography,
} from 'antd';
import usersService from '@Api/users.service';
import Loader from '@Components/Loader';
import UsersList from '@Components/UsersList';
import { ROUTES } from '@Data/constants';
import './index.scss';

const UserShow = () => {
  const { id: userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await Promise.all([
          usersService.show(userId),
          usersService.followers(userId),
          usersService.followees(userId),
        ]);

        setUser({ ...res[0], followers: res[1], followees: res[2] });
      } catch (error) {
        console.error('error: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <Loader />;

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={16} offset={4}>
          <Row className="user-show__header">
            <Avatar src={`https://robohash.org/${user.username}`} size={200} />
            <Typography.Title>
              {user.username}
            </Typography.Title>
            <Link to={ROUTES.userPosts.replace(':id', userId)}>
              <Button type="primary">
                Posts
              </Button>
            </Link>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={9} offset={2}>
          <Typography.Title level={3}>
            Followers
          </Typography.Title>
          <UsersList listName="followers" users={user.followers} />
        </Col>
        <Col span={9} offset={2}>
          <Typography.Title level={3}>
            Followees
          </Typography.Title>
          <UsersList listName="followees" users={user.followees} />
        </Col>
      </Row>
    </>
  );
};

export default UserShow;
