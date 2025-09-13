import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: #fff;
  height: 60px;
  padding: 0 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  right: 0;
  left: 240px;
  z-index: 100;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #4a5568;
`;

const UserName = styled.span`
  font-weight: 500;
  color: #2d3748;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Dashboard</h1>
      <UserSection>
        <UserName>John Doe</UserName>
        <UserAvatar>JD</UserAvatar>
      </UserSection>
    </HeaderContainer>
  );
};

export default Header;