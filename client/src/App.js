import React from "react";
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import Layout from './components/layout-component/layout-component';
import LandingPage from "./pages/landing-page/landing-page";
import Login from "./pages/login-page/login-page";

export default function App() {
  return (
    <div>
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </Layout>
    </div>
  );
}