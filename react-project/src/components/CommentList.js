const CommentList = ({ article, comments, onDeleteComment }) => {
    const handleDeleteComment = (commentId) => {
        onDeleteComment(article.articleId, commentId);
    };

    return (
        <div>
            {article.showComments &&
                comments.map((comment) => (
                    <div key={comment.id}>
                        <p>{comment.text}</p>
                        <button onClick={() => handleDeleteComment(comment.id)}>
                            Удалить комментарий
                        </button>
                    </div>
                ))}
        </div>
    );
};

export default CommentList;