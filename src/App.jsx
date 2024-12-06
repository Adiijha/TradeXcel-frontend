import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from './redux/store';
import Home from "./components/landingPage/Home";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Dashboard from "./components/dashboard/Dashboard";
import MainLayout from "./components/layout/HeaderFooterLayout";
import NoHeaderFooterLayout from "./components/layout/NoHeaderFooterLayout";
import AuthRoute from "./components/routes/AuthRoute";
import Cookies from "js-cookie";
import NotFound from "./components/error/NotFound";
import EnterOTP from "./components/auth/EnterOTP";
import Alerts from "./components/alerts/Alerts";
import Contest from "./components/contest/Contest";
import Faq from "./components/faq/Faq";
import Wallet from "./components/wallet/Wallet";
import Portfolio from "./components/portfolio/Portfolio";
import Market from "./components/market/Market";
import Leaderboard from "./components/leaderboard/Leaderboard";
import EditProfile from "./components/dashboard/EditProfile";


// ScrollToTop Component
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the location changes
  }, [location]);

  return null;
};

// Redirect logic for the home route
const RedirectToDashboard = ({footerBgColor}) => {
  const token = Cookies.get("accessToken");
  return token ? <Navigate to="/dashboard" /> : (
    <MainLayout footerBgColor={footerBgColor}>
      <Home />
    </MainLayout>
  );
};

// Handles conditional redirection or rendering for SignUp and SignIn
const RedirectIfLoggedIn = ({ component: Component }) => {
  const token = Cookies.get("accessToken");
  return token ? <Navigate to="/dashboard" /> : (
    <MainLayout>
      <Component />
    </MainLayout>
  );
};

// App Component
function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* Ensure the page scrolls to the top on route change */}
        <ScrollToTop />
        <Routes>
          {/* Redirect to /dashboard if logged in, else show Home */}
          <Route path="/" element={<RedirectToDashboard footerBgColor="bg-grey" />} />

          {/* Show SignUp or SignIn unless logged in */}
          <Route path="/signup" element={<RedirectIfLoggedIn component={SignUp} />} />
          <Route path="/signin" element={<RedirectIfLoggedIn component={SignIn} />} />

          {/*OTP Route*/}
          <Route path="/signup/otp" element={<EnterOTP />} />

          {/* Protected Routes for logged-in users */}
          <Route
            path="/dashboard"
            element={
              <AuthRoute>
                <NoHeaderFooterLayout>
                  <Dashboard />
                </NoHeaderFooterLayout>
              </AuthRoute>
            }
          />
          <Route
            path="/alerts"
            element={
              <AuthRoute>
                <NoHeaderFooterLayout>
                  <Alerts />
                </NoHeaderFooterLayout>
              </AuthRoute>
            }
          />
          <Route
            path="/contest"
            element={
              <AuthRoute>
                <NoHeaderFooterLayout>
                  <Contest />
                </NoHeaderFooterLayout>
              </AuthRoute>
            }
          />
          <Route
            path="/faq"
            element={
              <AuthRoute>
                <NoHeaderFooterLayout>
                  <Faq />
                </NoHeaderFooterLayout>
              </AuthRoute>
            }
          />
          <Route
            path="/wallet"
            element={
              <AuthRoute>
                <NoHeaderFooterLayout>
                  <Wallet />
                </NoHeaderFooterLayout>
              </AuthRoute>
            }
          />
          <Route
            path="/portfolio"
            element={
              <AuthRoute>
                <NoHeaderFooterLayout>
                  <Portfolio />
                </NoHeaderFooterLayout>
              </AuthRoute>
            }
          />
          <Route
            path="/market"
            element={
              <AuthRoute>
                <NoHeaderFooterLayout>
                  <Market />
                </NoHeaderFooterLayout>
              </AuthRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <AuthRoute>
                <NoHeaderFooterLayout>
                  <Leaderboard />
                </NoHeaderFooterLayout>
              </AuthRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <AuthRoute>
                <NoHeaderFooterLayout>
                  <EditProfile />
                </NoHeaderFooterLayout>
              </AuthRoute>
            }
          />


          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
