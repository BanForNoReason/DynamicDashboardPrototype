import { render, screen, fireEvent } from '@testing-library/react';
import Analytics from './Analytics';
import apiClient from '../utils/api';

jest.mock('../utils/api'); // mock the API client

test('renders Analytics component', () => {
    render(<Analytics />);
    expect(screen.getByText('Insights')).toBeInTheDocument();
    expect(screen.getByText('Assessment Legend')).toBeInTheDocument();
});

test('fetches and displays analytics data', async () => {
    apiClient.get.mockResolvedValueOnce({
        data: [
            { id: 'course1', name: 'History' },
            { id: 'course2', name: 'Science' },
        ],
    });

    render(<Analytics />);
    fireEvent.change(screen.getByRole('combobox', { name: /courses/i }), { target: { value: 'course1' } });

    // Simulate fetching analytics
    apiClient.get.mockResolvedValueOnce({
        data: {
            attempted_count: 20,
            not_attempted_count: 5,
            correct_percentage: 80,
            incorrect_percentage: 20,
        },
    });

    fireEvent.click(screen.getByText('Fetch Analytics'));
    expect(await screen.findByText('Attempted: 20')).toBeInTheDocument();
});

