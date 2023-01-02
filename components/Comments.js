import { useState } from 'react';
import styled from 'styled-components';

import data from '../public/data.json';
import MainCard from './MainCard';
import Replies from './Replies';

export default function Comments() {
  const [comments, setComments] = useState(data.comments);
  return (
    <>
      {comments.map((comment) => (
        <>
          <MainCard
            key={comment.id}
            content={comment.content}
            score={comment.score}
            username={comment.user.username}
            avatar={comment.user.image.png}
            createdAt={comment.createdAt}
          />

          {comment.replies.length > 0 && <Replies replies={comment.replies} />}
        </>
      ))}
    </>
  );
}