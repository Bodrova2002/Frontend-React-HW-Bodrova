import { getComments } from './get-comments-by-article';

test('getComments returns comments for a specific article', async () => {
    const articleId = 1;
    const comments = await getComments(articleId);

    expect(comments).toHaveLength(3); // Предположим, что у статьи с идентификатором 1 есть 3 комментария
});
