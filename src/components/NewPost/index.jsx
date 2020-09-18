import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
} from 'antd';

const NewPost = ({ users, onSubmit }) => {
  const [form] = Form.useForm();

  return (
    <Row gutter={[16, 16]}>
      <Col span={16} offset={4}>
        <Card bordered={false}>
          <Form
            layout="vertical"
            name="newPost"
            form={form}
            onFinish={(values) => {
              onSubmit(values, () => form.resetFields());
            }}
          >
            <Form.Item
              label="User"
              name="userId"
              rules={[
                { required: true, message: 'Please select the owner of the post!' },
              ]}
            >
              <Select
                style={{ width: 200 }}
                placeholder="Select an user"
                virtual={false}
              >
                {
                  users.map(({ id, username }) => (
                    <Select.Option key={id} value={id}>
                      {username}
                    </Select.Option>
                  ))
                }
              </Select>
            </Form.Item>

            <Form.Item
              label="Title"
              name="title"
              rules={[
                { required: true, message: 'Please input the title of the post!' },
              ]}
            >
              <Input placeholder="Title" />
            </Form.Item>

            <Form.Item
              label="Content"
              name="content"
              rules={[
                { required: true, message: 'Please input the content of the post!' },
              ]}
            >
              <Input.TextArea placeholder="Content" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Post
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

NewPost.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
    }),
  ),
  onSubmit: PropTypes.func.isRequired,
};

NewPost.defaultProps = {
  users: [],
};

export default NewPost;
