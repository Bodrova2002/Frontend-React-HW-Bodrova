import { render, fireEvent } from '@testing-library/react';
import AddCard from '/components/AddCard';

test('handleTitleChange updates the cardTitle in state', () => {
    const { getByRole } = render(<AddCard />);
    const input = getByRole('textbox', { name: /card title/i });

    fireEvent.change(input, { target: { value: 'New Card Title' } });

    expect(input.value).toBe('New Card Title');
});