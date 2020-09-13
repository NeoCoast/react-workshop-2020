import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ROUTES } from '@Data/constants';
import {
  Avatar,
  Card,
} from 'antd';

const UserCard = ({ id, username }) => (
  <Card
    bordered={false}
    size="large"
  >
    <Link to={ROUTES.user.replace(':id', id)}>
      <Card.Meta
        avatar={<Avatar src={`https://robohash.org/${username}`} />}
        title={username}
      />
    </Link>
  </Card>
);

UserCard.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
};

export default UserCard;
