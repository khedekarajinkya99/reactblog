import React from 'react';
import { render } from '@testing-library/react';
import EditBlog from './EditBlog';

test('EditBlog renders learn react link', () => {
  const { getByText } = render(<EditBlog />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
