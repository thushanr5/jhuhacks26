import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaDumbbell, FaUtensils, FaChartLine } from 'react-icons/fa';

const SidebarContainer = styled.div`
  width: 240px;
  height: 100vh;
  background: #1a1a1a;
  padding: 2rem 1rem;
  position: fixed;
  left: 0;
  top: 0;
`;

const Logo = styled.div`
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li`
  margin-bottom: 1rem;
`;

const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  transition: background 0.3s;

  &:hover {
    background: #2d2d2d;
  }

  svg {
    margin-right: 0.8rem;
    font-size: 1.2rem;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Logo>FitTrack</Logo>
      <MenuList>
        <MenuItem>
          <MenuLink to="/">
            <FaHome /> Dashboard
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/workouts">
            <FaDumbbell /> Workouts
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/nutrition">
            <FaUtensils /> Nutrition
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/progress">
            <FaChartLine /> Progress
          </MenuLink>
        </MenuItem>
      </MenuList>
    </SidebarContainer>
  );
};

export default Sidebar;