import { useState } from 'react';
import styled from 'styled-components';

import data from '../public/data.json';
import MainCard from './MainCard';

export default function Comments() {
  const [comments, setComments] = useState(data.comments);
  return (
    <>
      {comments.map((comment) => (
        <MainCard
          content={comment.content}
          score={comment.score}
          username={comment.user.username}
          avatar={comment.user.image.png}
          createdAt={comment.createdAt}
        />
      ))}
    </>
  );
}
