import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RouterConfig from "./routes/route";

function App() {
  return (
    <Router>
      <RouterConfig/>
    </Router>
  );
}

export default App;
