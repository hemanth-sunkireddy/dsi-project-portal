import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: ${({ isOpen }) => (isOpen ? '250px' : '0')};
  height: 100vh;
  background-color: #333;
  color: white;
  padding: ${({ isOpen }) => (isOpen ? '20px' : '0')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  transition: width 0.3s ease, padding 0.3s ease;
`;

const SidebarHeader = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;

const SidebarItem = styled.div`
  padding: 10px 0;
  cursor: pointer;
  &:hover {
    background-color: #444;
  }
`;

const Sidebar = ({ isOpen, onParticipantInfoClick, onTestSelect }) => (
  <SidebarContainer isOpen={isOpen}>
    <div>
      <SidebarHeader>Menu</SidebarHeader>
      <SidebarItem onClick={onParticipantInfoClick}>Participant Info</SidebarItem>
      <SidebarItem onClick={() => onTestSelect('test1')}>Test 1</SidebarItem>
      <SidebarItem onClick={() => onTestSelect('test2')}>Test 2</SidebarItem>
      <SidebarItem onClick={() => onTestSelect('test3')}>Test 3</SidebarItem>
      <SidebarItem>Help</SidebarItem>
    </div>
  </SidebarContainer>
);

export default Sidebar;
