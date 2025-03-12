import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import NavigationComponent from "./components/NavigationComponent";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { QuestionProvider } from "./context/questionContext";
import IndividualQuestionPage from "./pages/IndividualQuestionPage";

function App() {
  return (
    <Router>
      <QuestionProvider>
      <NavigationWithVisibility />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/question/:questionId" element={<IndividualQuestionPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
      </QuestionProvider>
    </Router>
  );
}

const NavigationWithVisibility = () => {
  const location = useLocation();

  const shouldHideNavbar =
    location.pathname === "/register" || location.pathname === "/login";

  return <>{!shouldHideNavbar && <NavigationComponent />}</>;
};

export default App;