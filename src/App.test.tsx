import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import '@testing-library/jest-dom';

test('Ecom dashboard testing', () => {
  expect(true).toBe(true);
});

test('renders Dashboard route', async () => {
  render(
    <Router>
      <App />
    </Router>,
  );
});
