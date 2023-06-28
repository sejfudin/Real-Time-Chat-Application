import React, { createContext, useEffect, useState } from 'react';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
        error,
        setError,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatState = () => {
  return React.useContext(ChatContext);
};

export default ChatProvider;
