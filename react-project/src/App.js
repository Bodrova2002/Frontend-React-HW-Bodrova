import React, { useState } from 'react';
import data from './assets/mock-data.json';
import './App.css';

function App() {
  const [likes, setLikes] = useState(data.map((item) => item.currentLikes));

  const handleLike = (index) => {
    const updatedLikes = [...likes];
    const currentItem = data[index];

    if (updatedLikes[index] === currentItem.currentLikes) {
      updatedLikes[index] += 1;
    } else {
      updatedLikes[index] = currentItem.currentLikes;
    }

    setLikes(updatedLikes);
  };

  const handleUnlike = (index) => {
    const updatedLikes = [...likes];
    const currentItem = data[index];

    if (updatedLikes[index] === currentItem.currentLikes) {
      updatedLikes[index] -= 1;
    } else {
      updatedLikes[index] = currentItem.currentLikes;
    }

    setLikes(updatedLikes);
  };

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <p>Likes: {likes[index]}</p>
          {likes[index] > item.currentLikes ? (
            <button onClick={() => handleUnlike(index)}>Unlike</button>
          ) : (
            <button onClick={() => handleLike(index)}>Like</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;


