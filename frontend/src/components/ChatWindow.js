

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import axios from 'axios';
// import MessageList from './MessageList';
// import ChatInput from './ChatInput';
// import Sidebar from './Sidebar';

// const ChatContainer = styled.div`
//   display: flex;
//   height: 100vh;
//   width: 100%;
// `;

// const ChatContent = styled.div`
//   flex-grow: 1;
//   display: flex;
//   flex-direction: column;
//   padding-bottom: 60px;
// `;

// const Header = styled.div`
//   background-color: #0078d4;
//   color: white;
//   padding: 15px;
//   font-size: 18px;
//   font-weight: bold;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

// const MenuButton = styled.button`
//   background: none;
//   border: none;
//   color: white;
//   font-size: 20px;
//   cursor: pointer;
//   margin-right: 10px;
//   &:hover {
//     color: #a0c4ff;
//   }
// `;


// // ... (keep all your styled components the same)

// const ChatWindow = () => {
//   const [messages, setMessages] = useState([]);
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
//   const [chatbotSettings, setChatbotSettings] = useState(null);
//   const [screeningId, setScreeningId] = useState(null);
//   const [currentInteraction, setCurrentInteraction] = useState(null);
//   const navigate = useNavigate();



//   // Retrieve stored IDs
//   const studentId = localStorage.getItem('student-id');
//   const volunteerId = localStorage.getItem('name');
//   const campId = localStorage.getItem('camp-id');

//   // Fetch chatbot settings and create screening on component mount
//   useEffect(() => {
//     const initializeChat = async () => {
//       try {
//         // Fetch chatbot settings for test1
//         const settingsResponse = await axios.get('/api/auth/chatbotSettings/test1');
//         setChatbotSettings(settingsResponse.data);
//         console.log(settingsResponse.data);

//         // Create new screening
//         const screeningResponse = await axios.post('/api/auth/addScreening', {
//           student: studentId,
//           volunteer: volunteerId,
//           camp: campId,
//         });
//         setScreeningId(screeningResponse.data.screening.screeningId);
//         console.log(screeningResponse.data.screening.screeningId);

//         // Create new chatbot interaction
//         const interactionResponse = await axios.post('/api/auth/createChatbotInteraction', {
//           screeningId: screeningResponse.data.screening.screeningId,
//           promptId: settingsResponse.data._id,
//           status: 'pending',
//           responses: []
//         });
//         setCurrentInteraction(interactionResponse.data.interaction);
//         // console.log(interactionResponse.data);

//         // Display first prompt
//         if (settingsResponse.data.prompts.length > 0) {
//           setMessages([{
//             text: settingsResponse.data.prompts[0].promptText,
//             isUser: false
//           }]);
//         }
//       } catch (error) {
//         console.error('Error initializing chat:', error);
//       }
//     };

//     initializeChat();
//   }, []);

//   const saveResponse = async (response) => {
//     try {
//       const currentPrompt = chatbotSettings.prompts[currentPromptIndex];
//       console.log(currentPrompt);
      
//       await axios.put(`/api/auth/updateChatbotInteraction/${currentInteraction._id}`, {
//         $push: {
//           responses: {
//             text: response.text || null,
//             audioUrl: response.audioUrl || null,
//             videoUrl: response.videoUrl || null,
//             userResponse: response.userResponse || null,
//             mediaType: currentPrompt.requiredMediaType,
//             responseOrder: currentInteraction.responses.length + 1
//           }
//         }
//       });
//     } catch (error) {
//       console.error('Error saving response:', error);
//     }
//   };

//   const handleFileUpload = async (file) => {
//     try {
//       // Upload file to your server/storage
//       const formData = new FormData();
//       formData.append('file', file);
//       const uploadResponse = await axios.post('/api/upload', formData);
//       const fileUrl = uploadResponse.data.url;

//       // Save response with file URL
//       await saveResponse({
//         [chatbotSettings.prompts[currentPromptIndex].requiredMediaType === 'video' ? 'videoUrl' : 'audioUrl']: fileUrl,
//         userResponse: `Uploaded: ${file.name}`,
//       });

//       // Update messages state
//       setMessages(prev => [...prev, { 
//         text: `Uploaded: ${file.name}`, 
//         isUser: true 
//       }]);

//       // Move to next prompt
//       moveToNextPrompt();
//     } catch (error) {
//       console.error('Error handling file upload:', error);
//     }
//   };

//   const handleSend = async (text) => {
//     try {
//       // Save text response
//       await saveResponse({
//         text: text,
//         userResponse: text,
//       });

//       // Update messages state
//       setMessages(prev => [...prev, { text, isUser: true }]);

//       // Move to next prompt
//       moveToNextPrompt();
//     } catch (error) {
//       console.error('Error handling send:', error);
//     }
//   };

//   const moveToNextPrompt = () => {
//     const nextIndex = currentPromptIndex + 1;
//     if (nextIndex < chatbotSettings.prompts.length) {
//       setCurrentPromptIndex(nextIndex);
//       setTimeout(() => {
//         setMessages(prev => [...prev, {
//           text: chatbotSettings.prompts[nextIndex].promptText,
//           isUser: false
//         }]);
//       }, 1000);
//     } else {
//       // All prompts completed, show generate report button
//       setTimeout(() => {
//         setMessages(prev => [...prev, {
//           text: (
//             <div>
//               <span>Assessment complete. Click below to generate the report.</span>
//               <button onClick={handleGenerateReport}>Generate Report</button>
//             </div>
//           ),
//           isUser: false
//         }]);
//       }, 1000);
//     }
//   };

//   const handleGenerateReport = async () => {
//     try {
//       // Update interaction status to completed
//       await axios.put(`/api/auth/updateChatbotInteraction/${currentInteraction._id}`, {
//         status: 'completed'
//       });

//       // Navigate back
//       navigate(-1);
//     } catch (error) {
//       console.error('Error generating report:', error);
//     }
//   };

//   const toggleSidebar = () => setSidebarOpen(prev => !prev);

//   const handleParticipantInfoClick = () => {
//     navigate('/student-profile');
//     setSidebarOpen(false);
//   };

//   return (
//     <ChatContainer>
//       <Sidebar
//         isOpen={isSidebarOpen}
//         onParticipantInfoClick={handleParticipantInfoClick}
//       />
//       <ChatContent>
//         <Header>
//           <MenuButton onClick={toggleSidebar}>☰</MenuButton>
//           Assessment Chat
//         </Header>
//         <MessageList messages={messages} />
//         <ChatInput
//           onSend={handleSend}
//           onFileUpload={handleFileUpload}
//           sidebarWidth={isSidebarOpen ? '250px' : '0px'}
//           mediaType={chatbotSettings?.prompts[currentPromptIndex]?.requiredMediaType}
//         />
//       </ChatContent>
//     </ChatContainer>
//   );
// };

// export default ChatWindow;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import axios from 'axios';
// import MessageList from './MessageList';
// import ChatInput from './ChatInput';
// import Sidebar from './Sidebar';

// const ChatContainer = styled.div`
//   display: flex;
//   height: 100vh;
//   width: 100%;
// `;

// const ChatContent = styled.div`
//   flex-grow: 1;
//   display: flex;
//   flex-direction: column;
//   padding-bottom: 60px;
// `;

// const Header = styled.div`
//   background-color: #0078d4;
//   color: white;
//   padding: 15px;
//   font-size: 18px;
//   font-weight: bold;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

// const MenuButton = styled.button`
//   background: none;
//   border: none;
//   color: white;
//   font-size: 20px;
//   cursor: pointer;
//   margin-right: 10px;
//   &:hover {
//     color: #a0c4ff;
//   }
// `;

// const ChatWindow = () => {
//   const [messages, setMessages] = useState([]);
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
//   const [chatbotSettings, setChatbotSettings] = useState(null);
//   const [screeningId, setScreeningId] = useState(null);
//   const [currentInteraction, setCurrentInteraction] = useState(null);
//   const navigate = useNavigate();

//   // Retrieve stored IDs
//   const studentId = localStorage.getItem('student-id');
//   const volunteerId = localStorage.getItem('name');
//   const campId = localStorage.getItem('camp-id');

//   // Fetch chatbot settings and create screening on component mount
//   // useEffect(() => {
//   //   const initializeChat = async () => {
//   //     try {
//   //       // Fetch chatbot settings for test1
//   //       const settingsResponse = await axios.get('/api/auth/chatbotSettings/test1');
//   //       setChatbotSettings(settingsResponse.data);
//   //       console.log(settingsResponse.data);

//   //       // Create new screening
//   //       const screeningResponse = await axios.post('/api/auth/addScreening', {
//   //         student: studentId,
//   //         volunteer: volunteerId,
//   //         camp: campId,
//   //       });
//   //       setScreeningId(screeningResponse.data.screening.screeningId);
//   //       console.log(screeningResponse.data.screening.screeningId);

//   //       // Create new chatbot interaction
//   //       const interactionResponse = await axios.post('/api/auth/createChatbotInteraction', {
//   //         screeningId: screeningResponse.data.screening.screeningId,
//   //         promptId: settingsResponse.data._id,
//   //         status: 'pending',
//   //         responses: []
//   //       });
//   //       setCurrentInteraction(interactionResponse.data.interaction);
//   //       // console.log(interactionResponse.data);

//   //       // Display first prompt
//   //       if (settingsResponse.data.prompts.length > 0) {
//   //         setMessages([{
//   //           text: settingsResponse.data.prompts[0].promptText,
//   //           isUser: false
//   //         }]);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error initializing chat:', error);
//   //     }
//   //   };

//   //   initializeChat();
//   // }, []);

//   useEffect(() => {
//     const initializeChat = async () => {
//       try {
//         // Fetch chatbot settings for test1
//         const settingsResponse = await axios.get('/api/auth/chatbotSettings/test1');
//         setChatbotSettings(settingsResponse.data);
//         console.log(settingsResponse.data);
  
//         // Create new screening
//         const screeningResponse = await axios.post('/api/auth/addScreening', {
//           student: studentId,
//           volunteer: volunteerId,
//           camp: campId,
//         });
//         setScreeningId(screeningResponse.data.screening.screeningId);
//         console.log(screeningResponse.data.screening.screeningId);
  
//         // Create new chatbot interaction
//         const interactionResponse = await axios.post('/api/auth/createChatbotInteraction', {
//           screeningId: screeningResponse.data.screening.screeningId,
//           promptId: settingsResponse.data._id,
//           status: 'pending',
//           responses: []
//         });
//         setCurrentInteraction(interactionResponse.data.interaction);
//         // console.log(interactionResponse.data);
  
//         // Display first prompt
//         if (settingsResponse.data.prompts.length > 0) {
//           setMessages([{
//             text: settingsResponse.data.prompts[0].promptText,
//             isUser: false
//           }]);
//         }
//       } catch (error) {
//         console.error('Error initializing chat:', error);
//       }
//     };
  
//     initializeChat();
//   }, []);  // Empty dependency array ensures this effect runs only once.
  
//   const handleFileUpload = async (file) => {
//     try {
//       // Upload file to your server/storage
//       const formData = new FormData();
//       formData.append('file', file);
//       const uploadResponse = await axios.post('/api/upload', formData);
//       const fileUrl = uploadResponse.data.url;

//       // Update messages state
//       setMessages(prev => [...prev, { 
//         text: `Uploaded: ${file.name}`, 
//         isUser: true 
//       }]);

//       // Move to next prompt
//       moveToNextPrompt();
//     } catch (error) {
//       console.error('Error handling file upload:', error);
//     }
//   };

//   const handleSend = async (text) => {
//     try {
//       // Update messages state
//       setMessages(prev => [...prev, { text, isUser: true }]);

//       // Move to next prompt
//       moveToNextPrompt();
//     } catch (error) {
//       console.error('Error handling send:', error);
//     }
//   };

//   const moveToNextPrompt = () => {
//     const nextIndex = currentPromptIndex + 1;
//     if (nextIndex < chatbotSettings.prompts.length) {
//       setCurrentPromptIndex(nextIndex);
//       setTimeout(() => {
//         setMessages(prev => [...prev, {
//           text: chatbotSettings.prompts[nextIndex].promptText,
//           isUser: false
//         }]);
//       }, 1000);
//     } else {
//       // All prompts completed, show generate report button
//       setTimeout(() => {
//         setMessages(prev => [...prev, {
//           text: (
//             <div>
//               <span>Assessment complete. Click below to generate the report.</span>
//               <button onClick={handleGenerateReport}>Generate Report</button>
//             </div>
//           ),
//           isUser: false
//         }]);
//       }, 1000);
//     }
//   };

//   const handleGenerateReport = async () => {
//     try {
//       // Save all responses before generating the report
//       const responses = chatbotSettings.prompts.map((prompt, index) => ({
//         text: messages[index]?.text || null,
//         userResponse: messages[index]?.text || null,  // Or any other logic for capturing responses
//         mediaType: prompt.requiredMediaType,
//         responseOrder: index + 1
//       }));

//       // Update interaction status and responses
//       await axios.put(`/api/auth/updateChatbotInteraction/${currentInteraction._id}`, {
//         status: 'completed',
//         responses: responses
//       });

//       // Navigate back
//       navigate(-1);
//     } catch (error) {
//       console.error('Error generating report:', error);
//     }
//   };

//   const toggleSidebar = () => setSidebarOpen(prev => !prev);

//   const handleParticipantInfoClick = () => {
//     navigate('/student-profile');
//     setSidebarOpen(false);
//   };

//   return (
//     <ChatContainer>
//       <Sidebar
//         isOpen={isSidebarOpen}
//         onParticipantInfoClick={handleParticipantInfoClick}
//       />
//       <ChatContent>
//         <Header>
//           <MenuButton onClick={toggleSidebar}>☰</MenuButton>
//           Assessment Chat
//         </Header>
//         <MessageList messages={messages} />
//         <ChatInput
//           onSend={handleSend}
//           onFileUpload={handleFileUpload}
//           sidebarWidth={isSidebarOpen ? '250px' : '0px'}
//           mediaType={chatbotSettings?.prompts[currentPromptIndex]?.requiredMediaType}
//         />
//       </ChatContent>
//     </ChatContainer>
//   );
// };

// export default ChatWindow;
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
      // First create the screening
      const screeningResponse = await axios.post('/api/auth/addScreening', {
        student: studentId,
        volunteer: volunteerId,
        camp: campId,
      });
      const screeningId = screeningResponse.data.screening.screeningId;

      // Then create chatbot interaction with all collected responses
      const interactionResponse = await axios.post('/api/auth/createChatbotInteraction', {
        screeningId: screeningId,
        promptId: chatbotSettings._id,
        status: 'completed',
        responses: responses  // Using the collected responses
      });

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