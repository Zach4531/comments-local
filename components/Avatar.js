import styled from 'styled-components';

export default function Avatar({ size, user }) {
  const users = {
    ar: 'amyrobson',
    ju: 'juliusomo',
    mb: 'maxblagun',
    rs: 'ramsesmiron',
  };

  const sizes = {
    small: '45px',
    medium: '55px',
  };

  return (
    <>
      <AvatarStyled
        src={`/images/avatars/image-${users[user]}.png`}
        alt="avatar"
        size={sizes[size]}
      />
    </>
  );
}

const AvatarStyled = styled.img`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
`;
