import React from 'react';
import { render } from '@testing-library/react';
import AddBlog from './AddBlog';

test('AddBlog renders learn react link', () => {
  const { getByText } = render(<AddBlog />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
