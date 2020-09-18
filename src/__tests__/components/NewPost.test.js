import React from 'react';
import faker from 'faker';
import { render, fireEvent, waitFor } from '@testing-library/react';
import NewPost from '@Components/NewPost';

describe('NewPost', () => {
  const props = {
    onSubmit: jest.fn(),
    users: [...Array(faker.random.number({ max: 20, min: 1 }))].map((_, index) => ({
      id: index,
      username: faker.internet.userName(),
    })),
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('has a user select', () => {
    const { getByLabelText } = render(<NewPost {...props} />);

    expect(getByLabelText(/user/i)).toBeInTheDocument();
  });

  test('user select has the list of users', () => {
    const { getByLabelText, getByText } = render(<NewPost {...props} />);

    const userSelect = getByLabelText(/user/i);
    fireEvent.mouseDown(userSelect);

    props.users.forEach(({ username }) => {
      expect(getByText(username)).toBeInTheDocument();
    });
  });

  test('has a tilte input', () => {
    const { getByLabelText } = render(<NewPost {...props} />);

    expect(getByLabelText(/title/i)).toBeInTheDocument();
  });

  test('has a content input', () => {
    const { getByLabelText } = render(<NewPost {...props} />);

    expect(getByLabelText(/content/i)).toBeInTheDocument();
  });

  test('has a create post button', () => {
    const { getByRole } = render(<NewPost {...props} />);

    expect(getByRole(/button/i))
      .toBeInTheDocument()
      .toHaveTextContent(/create post/i);
  });

  test('hitting the submit button should show errors', async () => {
    const { getByText, getByRole } = render(<NewPost {...props} />);

    fireEvent.click(getByRole(/button/i));

    await waitFor(() => {
      expect(getByText(/please select the owner of the post!/i)).toBeInTheDocument();
      expect(getByText(/please input the title of the post!/i)).toBeInTheDocument();
      expect(getByText(/please input the content of the post!/i)).toBeInTheDocument();
      expect(props.onSubmit).toHaveBeenCalledTimes(0);
    });
  });

  test('filling the form and hitting submit calls the onChange prop', async () => {
    const { getByText, getByLabelText, getByRole } = render(<NewPost {...props} />);

    const user = props.users[faker.random.number({ max: 20, min: 1 }) - 1];
    const title = faker.lorem.words();
    const content = faker.lorem.paragraph();

    // select user
    fireEvent.mouseDown(getByLabelText(/user/i));
    fireEvent.click(getByText(user.username));

    // change title and content
    fireEvent.change(getByLabelText(/title/i), { target: { value: title } });
    fireEvent.change(getByLabelText(/content/i), { target: { value: content } });

    // submit form
    fireEvent.click(getByRole(/button/i));

    await waitFor(() => {
      expect(props.onSubmit)
        .toHaveBeenCalledTimes(1)
        .toHaveBeenCalledWith(
          { userId: user.id, title, content },
          expect.any(Function),
        );
    });
  });
});
