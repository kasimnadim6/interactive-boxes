import './App.css';
import Box from './components/Box';

function App() {
  const BOX_DATA = [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
  ];
  return (
    <>
      <p>
        <a href="https://www.devtools.tech/questions/s/how-to-create-an-interactive-shape-based-ui-uber-frontend-interview-question-or-javascript-or-react-js---qid---6FVH1ZMWMXd4uZ8WAGEi?utm_source=social-share">
          How to create an interactive shape based UI? Uber Frontend Interview
          Question | JavaScript | React.js
        </a>
      </p>
      <Box shape={BOX_DATA} />
    </>
  );
}

export default App;
