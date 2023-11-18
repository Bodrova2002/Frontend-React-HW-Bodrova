import React, { useEffect, useState } from 'react';
import { getArticles } from './get-articles';
import CommentList from './components/CommentList';
import AddComment from './components/AddComment';
import AddCard from './components/AddCard';
import { getComments } from './get-comments-by-article';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [comments, setComments] = useState([]);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      // Здесь должен быть ваш реальный код для получения списка статей
      // Предположим, что вы получаете данные в формате { articleId, title }
      const data = await getArticles();
      const articlesWithShowComments = data.map((article) => ({
        ...article,
        showComments: false,
      }));
      setArticles(articlesWithShowComments);
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true);
      // Fetch cards data here
      setIsLoading(false);
    };
    fetchCards();
  }, []);

  useEffect(() => {
    const fetchCardComments = async () => {
      setIsLoading(true);
      const promises = cards.map((card) => getComments(card.cardId));
      const fetchedComments = await Promise.all(promises);
      const updatedCards = cards.map((card, index) => ({
        ...card,
        comments: fetchedComments[index],
        commentsCount: fetchedComments[index].length,
      }));
      setCards(updatedCards);
      setIsLoading(false);
    };
    fetchCardComments();
  }, [cards]);

  const handleCommentClicked = async (articleId) => {
    const updatedArticles = articles.map((article) => {
      if (article.articleId === articleId) {
        return {
          ...article,
          showComments: !article.showComments,
        };
      }
      return article;
    });

    setArticles(updatedArticles);

    const articleComments = await getComments(articleId);
    setComments(articleComments);
  };

  const handleCommentAdded = (articleId, newComment) => {
    const updatedArticles = articles.map((article) => {
      if (article.articleId === articleId) {
        return {
          ...article,
          comments: [...article.comments, newComment],
          commentsCount: article.commentsCount + 1,
        };
      }
      return article;
    });
    setArticles(updatedArticles);

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
  };

  const handleCommentDeleted = (articleId, commentId) => {
    const updatedArticles = articles.map((article) => {
      if (article.articleId === articleId) {
        const updatedComments = article.comments.filter(
            (comment) => comment.id !== commentId
        );
        return {
          ...article,
          comments: updatedComments,
          commentsCount: updatedComments.length,
        };
      }
      return article;
    });
    setArticles(updatedArticles);
  };

  const handleAddCard = (cardTitle) => {
    const newCard = {
      cardId: Math.random().toString(),
      title: cardTitle,
      creationDate: new Date(),  // Добавляем дату создания карточки
      comments: [],
      commentsCount: 0,
      likes: 0,  // Предположим, что у карточек есть поле для числа лайков
    };

    setCards([...cards, newCard]);
  };

  const sortCardsByCreationDate = () => {
    const sortedCards = [...cards].sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
    setCards(sortedCards);
  }

  const sortCardsByLikes = () => {
    const sortedCards = [...cards].sort((a, b) => b.likes - a.likes);
    setCards(sortedCards);
  }

  return (
      <div>
        <h1>Статьи</h1>
        {articles.map((article) => (
            <div key={article.articleId}>
              <h2>{article.title}</h2>
              <p>Комментарии: {article.commentsCount}</p>
              <button onClick={() => handleCommentClicked(article.articleId)}>
                {article.showComments ? 'Скрыть комментарии' : 'Открыть комментарии'}
              </button>
              {article.showComments && (
                  <>
                    <CommentList
                        article={article}
                        comments={comments}
                        onDeleteComment={(commentId) =>
                            handleCommentDeleted(article.articleId, commentId)
                        }
                    />
                    <AddComment
                        articleId={article.articleId}
                        onAddComment={(newComment) =>
                            handleCommentAdded(article.articleId, newComment)
                        }
                    />
                  </>
              )}
            </div>
        ))}
        <h1>Карточки</h1>
        <button onClick={sortCardsByCreationDate}>Сортировать по дате создания</button>
        <button onClick={sortCardsByLikes}>Сортировать по числу лайков</button>
        <AddCard onAddCard={handleAddCard} />
        {cards.map((card) => (
            <div key={card.cardId}>
              {/* Отображение карточки с учетом даты создания, лайков и всего остального */}
              <h2>{card.title}</h2>
              <p>Дата создания: {card.creationDate.toISOString()}</p>
              <p>Комментарии: {card.commentsCount}</p>
              <CommentList
                  article={card}
                  comments={card.comments}
                  onDeleteComment={(commentId) =>
                      handleCommentDeleted(card.cardId, commentId)
                  }
              />
              <AddComment
                  articleId={card.cardId}
                  onAddComment={(newComment) =>
                      handleCommentAdded(card.cardId, newComment)
                  }
              />
            </div>
        ))}
      </div>
  );
};

export default App;

