// src/components/ChatWindow.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import Sidebar from './Sidebar';

const ChatContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const ChatContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
`;

const Header = styled.div`
  background-color: #0078d4;
  color: white;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    color: #a0c4ff;
  }
`;

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const assistantMessages = [
    { text: "Hello, are you ready to begin the test?", isUser: false },
    { text: "Can you confirm the participant information? (Name, Age, and Sex)", isUser: false },
    { text: "Please upload a video of the participant walking in a straight path for analysis.", isUser: false },
    {
      text: (
        <div>
          <span>Analysis complete. Click below to generate the report.</span>
          <button onClick={() => handleGenerateReport()}>Generate Report</button>
        </div>
      ),
      isUser: false
    }
  ];

  const handleGenerateReport = () => {
    console.log('Generating report...');
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleFileUpload = (file) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: `Uploaded: ${file.name}`, isUser: true }
    ]);

    setCurrentStep(currentStep + 1);
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, assistantMessages[3]]);
    }, 1000);
  };

  const handleSend = (text) => {
    setMessages((prevMessages) => [...prevMessages, { text, isUser: true }]);

    setCurrentStep(currentStep + 1);
    if (currentStep + 1 < assistantMessages.length) {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          assistantMessages[currentStep + 1]
        ]);
      }, 1000);
    }
  };

  React.useEffect(() => {
    if (messages.length === 0) {
      setMessages([assistantMessages[0]]);
    }
  }, []);

  const handleParticipantInfoClick = () => {
    navigate('/student-profile'); // Navigate to the endpoint
    setSidebarOpen(false); // Optionally close the sidebar
  };

  return (
    <ChatContainer>
      <Sidebar
        isOpen={isSidebarOpen}
        onParticipantInfoClick={handleParticipantInfoClick} // Pass the handler to the sidebar
      />
      <ChatContent>
        <Header>
          <MenuButton onClick={toggleSidebar}>☰</MenuButton>
          Assessment Chat
        </Header>
        <MessageList messages={messages} />
        <ChatInput
          onSend={handleSend}
          onFileUpload={handleFileUpload}
          sidebarWidth={isSidebarOpen ? '250px' : '0px'}
        />
      </ChatContent>
    </ChatContainer>
  );
};

export default ChatWindow;
