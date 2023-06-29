import { isSameSenderMargin } from '../../utils/helpers/chatLogics';
import { useChatState } from '../../Context/ChatProvider';
import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const ScrollableChat = ({ messages }) => {
  const { user } = useChatState();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    scrollChatToBottom();
  }, [messages]);

  const scrollChatToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <Box
      ref={chatContainerRef}
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        maxHeight: '75vh',
        marginBottom: '10px',
        scrollBehavior: 'smooth',
      }}>
      {messages.map((m, i) => (
        <div style={{ display: 'flex' }} key={m._id}>
          <span
            style={{
              backgroundColor: `${m.sender?._id === user._id ? '#BEE3F8' : '#B9F5D0'}`,
              borderRadius: '20px',
              padding: '5px 15px',
              maxWidth: '75%',
              marginLeft: isSameSenderMargin(messages, m, i, user._id),
              marginTop: '3px',
            }}>
            {m.content}
          </span>
        </div>
      ))}
    </Box>
  );
};
export default ScrollableChat;
