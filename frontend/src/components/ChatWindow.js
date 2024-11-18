import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
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
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [chatbotSettings, setChatbotSettings] = useState(null);
  const [responses, setResponses] = useState([]);
  const navigate = useNavigate();

  // Retrieve stored IDs
  const studentId = localStorage.getItem('student-id');
  const volunteerId = localStorage.getItem('name');
  const campId = localStorage.getItem('camp-id');

  // Fetch only chatbot settings on component mount
  useEffect(() => {
    const initializeChat = async () => {
      try {
        // Fetch chatbot settings for test1
        const settingsResponse = await axios.get('/api/auth/chatbotSettings/test1');
        setChatbotSettings(settingsResponse.data);
        console.log(settingsResponse.data);

        // Display first prompt
        if (settingsResponse.data.prompts.length > 0) {
          setMessages([{
            text: settingsResponse.data.prompts[0].promptText,
            isUser: false
          }]);
        }
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };

    initializeChat();
  }, []);

  const handleFileUpload = async (file) => {
    try {
      // Upload file to your server/storage
      const formData = new FormData();
      formData.append('file', file);
      const uploadResponse = await axios.post('/api/upload', formData);
      const fileUrl = uploadResponse.data.url;

      // Store response
      const newResponse = {
        text: `Uploaded: ${file.name}`,
        fileUrl: fileUrl,
        mediaType: chatbotSettings.prompts[currentPromptIndex].requiredMediaType,
        responseOrder: currentPromptIndex + 1
      };
      setResponses(prev => [...prev, newResponse]);

      // Update messages state
      setMessages(prev => [...prev, { 
        text: `Uploaded: ${file.name}`, 
        isUser: true 
      }]);

      // Move to next prompt
      moveToNextPrompt();
    } catch (error) {
      console.error('Error handling file upload:', error);
    }
  };

  const handleSend = async (text) => {
    try {
      // Store response
      const newResponse = {
        text: text,
        mediaType: chatbotSettings.prompts[currentPromptIndex].requiredMediaType,
        responseOrder: currentPromptIndex + 1
      };
      setResponses(prev => [...prev, newResponse]);

      // Update messages state
      setMessages(prev => [...prev, { text, isUser: true }]);

      // Move to next prompt
      moveToNextPrompt();
    } catch (error) {
      console.error('Error handling send:', error);
    }
  };

  const moveToNextPrompt = () => {
    const nextIndex = currentPromptIndex + 1;
    if (nextIndex < chatbotSettings.prompts.length) {
      setCurrentPromptIndex(nextIndex);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: chatbotSettings.prompts[nextIndex].promptText,
          isUser: false
        }]);
      }, 1000);
    } else {
      // All prompts completed, show generate report button
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: (
            <div>
              <span>Assessment complete. Click below to generate the report.</span>
              <button onClick={handleGenerateReport}>Generate Report</button>
            </div>
          ),
          isUser: false
        }]);
      }, 1000);
    }
  };

  const handleGenerateReport = async () => {
    try {
      // Create the report object
      const report = {
        diagnosis: "Screened Negative", // Example diagnosis
        dateTime: new Date().toISOString(),
        additionalDetails: responses.map((response, index) => ({
          question: chatbotSettings.prompts[index]?.promptText,
          response: response.text,
        })),
      };
  
      // First, create the screening
      const screeningResponse = await axios.post('/api/auth/addScreening', {
        student: studentId,
        volunteer: volunteerId,
        camp: campId,
        report, // Add the report object here
      });
  
      // Handle successful screening creation
      console.log("Screening created:", screeningResponse.data);
  
      // Navigate back after everything is saved
      navigate(-1);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };
  
  

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const handleParticipantInfoClick = () => {
    navigate('/student-profile');
    setSidebarOpen(false);
  };

  return (
    <ChatContainer>
      <Sidebar
        isOpen={isSidebarOpen}
        onParticipantInfoClick={handleParticipantInfoClick}
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
          mediaType={chatbotSettings?.prompts[currentPromptIndex]?.requiredMediaType}
        />
      </ChatContent>
    </ChatContainer>
  );
};

export default ChatWindow;