import { render, screen } from '@testing-library/react';
import SyncProgress from '../components/SyncProgress';

describe('SyncProgress Component', () => {
  test('renders correctly with initial state', () => {
    render(<SyncProgress progress={0} />);
    expect(screen.getByText(/syncing/i)).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  test('displays correct progress percentage', () => {
    render(<SyncProgress progress={50} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
    expect(screen.getByText(/50%/i)).toBeInTheDocument();
  });

  test('displays complete message when progress is 100%', () => {
    render(<SyncProgress progress={100} />);
    expect(screen.getByText(/sync complete/i)).toBeInTheDocument();
  });

  test('does not display complete message when progress is less than 100%', () => {
    render(<SyncProgress progress={99} />);
    expect(screen.queryByText(/sync complete/i)).not.toBeInTheDocument();
  });
});