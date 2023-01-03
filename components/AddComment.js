import styled from 'styled-components';
import Avatar from './Avatar';

export default function AddComment() {
  return (
    <AddCommentStyled>
      <Avatar size="medium" avatar={'./images/avatars/image-juliusomo.png'} />
      <CommentTextareaStyled
        name="comment"
        id="comment"
        rows="5"
        placeholder="Add a Comment..."
      ></CommentTextareaStyled>
      <CommentSubmitStyled type="submit">Submit</CommentSubmitStyled>
    </AddCommentStyled>
  );
}

const AddCommentStyled = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.2rem;
  border-radius: 0.5rem;
  background-color: white;
  width: 100%;
`;

const CommentSubmitStyled = styled.button`
  background-color: hsl(238, 40%, 52%);
  color: #fff;
  border: 0;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const CommentTextareaStyled = styled.textarea`
  flex: 1;
  border-radius: 0.5rem;
  padding: 1rem;
`;
