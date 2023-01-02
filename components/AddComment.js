import styled from 'styled-components';
import Avatar from './Avatar';

export default function AddComment() {
  return (
    <AddCommentStyled>
      <Avatar size="xsmall" avatar={'./images/avatars/image-juliusomo.png'} />
      <textarea name="" id="" cols="30" rows="10"></textarea>
      <button type="submit">Submit</button>
    </AddCommentStyled>
  );
}

const AddCommentStyled = styled.div`
  padding: 1.2rem;
  border-radius: 0.5rem;
  background-color: white;
  width: 100%;
`;
