import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Upload from "./Pages/Upload";
import EducationalHub from "./Pages/EducationalHub";
import Dashboard from "./Pages/Dashboard";
import APIDocumentation from "./Pages/APIDocumentation"
import UserAccountSystem from "./Pages/UserAccountSystem"
import PageWrapper from './Pages/PageWrapper';


function App() {
  return (
    <Router>
      <div className="App">
        <PageWrapper>
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="/EducationalHub" element={<EducationalHub />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/APIDocumentation" element={<APIDocumentation />} />
          <Route path="/UserAccountSystem" element={<UserAccountSystem />} />
        </Routes>
        </PageWrapper>
      </div>
    </Router>
  );
}

export default App;
