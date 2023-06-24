import { Routes, Route } from 'react-router-dom';
import FormsWrapper from './components/Forms/FormsWrapper';

const App = () => {
  return (
    <Routes>
      <Route exact path='/' element={<FormsWrapper />} />
    </Routes>
  );
};

export default App;
