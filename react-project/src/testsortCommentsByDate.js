import {render, fireEvent, queryAllByText} from '@testing-library/react';
import CommentList from 'components/CommentList';

test('sorting comments by date should update the displayed comments accordingly', () => {
    const comments = [
        { id: 1, text: 'First comment', createdAt: '2023-11-01' },
        { id: 2, text: 'Second comment', createdAt: '2023-10-15' },
        { id: 3, text: 'Third comment', createdAt: '2023-12-20' }
    ];

    const { getByText, queryByText } = render(<CommentList comments={comments} />);

    fireEvent.click(getByText('Сортировать по дате'));

    const commentTexts = Array.from(queryAllByText('First comment', { exact: false }));
    const orderOfComments = commentTexts.map(node => node.textContent); // Собираем тексты комментариев в массив

    expect(orderOfComments).toEqual(['Second comment', 'First comment', 'Third comment']);
});