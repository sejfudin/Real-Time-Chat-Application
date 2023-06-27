import { Routes, Route } from 'react-router-dom';
import FormsWrapper from './components/Forms/FormsWrapper';
import ChatPage from './components/Chat/ChatPage';

const App = () => {
  return (
    <Routes>
      <Route exact path='/' element={<FormsWrapper />} />
      <Route path='/chats' element={<ChatPage />} />
    </Routes>
  );
};

export default App;
