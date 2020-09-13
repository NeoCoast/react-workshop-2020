import React from 'react';
import faker from 'faker';
import { render } from '@testing-library/react';
import Post from '@Components/Post';

describe('Post', () => {
  const props = {
    content: faker.lorem.paragraph(),
    title: faker.random.words(),
    username: faker.internet.userName(),
  };

  test('shows the title', () => {
    const { getByText } = render(<Post {...props} />);

    expect(getByText(props.title)).toBeInTheDocument();
  });

  test('shows the username', () => {
    const { getByText } = render(<Post {...props} />);

    expect(getByText(props.username)).toBeInTheDocument();
  });

  test('shows the content', () => {
    const { getByText } = render(<Post {...props} />);

    expect(getByText(props.content)).toBeInTheDocument();
  });

  test('show the correct avatar', () => {
    const { getByRole } = render(<Post {...props} />);

    const avatar = getByRole(/img/i);
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', `https://robohash.org/${props.username}`);
  });
});
