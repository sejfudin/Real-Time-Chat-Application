import ScrollableFeed from 'react-scrollable-feed';
import { isSameSenderMargin } from '../../utils/helpers.js/chatLogics';
import { useChatState } from '../../Context/ChatProvider';

const ScrollableChat = ({ messages }) => {
  const { user } = useChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => {
          return (
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
          );
        })}
    </ScrollableFeed>
  );
};
export default ScrollableChat;
