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
