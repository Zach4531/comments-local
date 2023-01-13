import styled from 'styled-components';

import Reply from '../public/images/icon-reply.svg';
import Delete from '../public/images/icon-delete.svg';
import Edit from '../public/images/icon-edit.svg';
import Plus from '../public/images/icon-plus.svg';
import Minus from '../public/images/icon-minus.svg';

export default function Icon({ text, icon }) {
  let component = null;

  switch (icon) {
    case 'delete':
      component = <Delete />;
      break;
    case 'edit':
      component = <Edit />;
      break;
    case 'reply':
      component = <Reply />;
      break;
    case 'minus':
      component = <Minus />;
      break;
    case 'plus':
      component = <Plus />;
  }

  return (
    <>
      {component}
      {text}
    </>
  );
}

const AlertStyled = styled.p`
  position: fixed;
  bottom: 1rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  background: green;
  color: white;
  font-weight: bold;
  width: 100%;
  max-width: 600px;
  border-radius: 0.5rem;
`;
