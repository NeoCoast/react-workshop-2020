import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Empty,
  Row,
} from 'antd';
import Loader from '@Components/Loader';
import Post from '@Components/Post';

const PostsList = ({ loading, posts }) => {
  if (loading) return <Loader />;

  if (posts.length === 0) return <Empty description="No posts yet" />;

  return (
    <>
      {
        posts.map(({
          title,
          id,
          username,
          content,
        }) => (
          <Row key={id} gutter={[16, 16]}>
            <Col span={16} offset={4}>
              <Post
                title={title}
                content={content}
                username={username}
              />
            </Col>
          </Row>
        ))
      }
    </>
  );
};

PostsList.propTypes = {
  loading: PropTypes.bool,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      content: PropTypes.string,
    }),
  ).isRequired,
};

PostsList.defaultProps = {
  loading: false,
};

export default PostsList;
