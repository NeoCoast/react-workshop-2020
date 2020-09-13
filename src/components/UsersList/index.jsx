import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Empty,
  Row,
} from 'antd';
import UserCard from '@Components/UserCard';

const UsersList = ({ listName, users }) => {
  if (users.length === 0) return <Empty description={`No ${listName} yet`} />;

  return (
    <>
      {
        users.map(({ id, username }) => (
          <Row key={id} gutter={[16, 16]}>
            <Col span={24}>
              <UserCard
                key={id}
                id={id}
                username={username}
              />
            </Col>
          </Row>
        ))
      }
    </>
  );
};

UsersList.propTypes = {
  listName: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape(({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    })),
  ).isRequired,
};

export default UsersList;
