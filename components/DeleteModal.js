import styled from 'styled-components';

export default function DeleteModal({ deleteConfirmation }) {
  return (
    <ModalContainer>
      <ModalStyled>
        <h3>Delete Comment</h3>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone;
        </p>
        <div>
          <ButtonStyled
            btn_type="cancel"
            type="button"
            onClick={() => deleteConfirmation(false)}
          >
            no, cancel
          </ButtonStyled>
          <ButtonStyled
            btn_type="delete"
            type="button"
            onClick={() => deleteConfirmation(true)}
          >
            yes, delete
          </ButtonStyled>
        </div>
      </ModalStyled>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  background: hsl(0, 0%, 0%, 0.8);
  position: fixed;
  z-index: 100;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalStyled = styled.div`
  width: 300px;
  height: fit-content;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background: white;
  p {
    opacity: 0.7;
    font-size: 0.9rem;
    margin: 1rem 0rem;
  }
  div {
    display: flex;
    gap: 0.5rem;
  }
`;

const ButtonStyled = styled.button`
  border: 0;
  border-radius: 0.5rem;
  padding: 0.8rem 1rem;
  color: white;
  background: ${(props) =>
    props.btn_type === 'delete' ? 'hsl(358, 79%, 66%)' : 'hsl(211, 10%, 45%)'};
  width: 100%;
  text-transform: uppercase;
  font-weight: bold;
  transition: background 0.2s ease;
  &:hover {
    background: ${(props) =>
      props.btn_type === 'delete'
        ? 'hsl(358, 79%, 76%)'
        : 'hsl(211, 10%, 55%)'};
  }
`;
