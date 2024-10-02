import React, { useEffect } from "react";
import { PageNavigation } from "./PageNavigation"; 
import { NavBar,Home, Login, CompanyPage,StudentPage,RegisterCompany,RegisterStudent } from "@miwgu/lia_components";
import { MockLoginProvider, useMockLogin } from "@miwgu/lia_components";

const App = () => {
  return (
    // Wrap everything inside MockLoginProvider first
    <MockLoginProvider>
      <AppContent />
    </MockLoginProvider>
  );
};

const AppContent = () => {
  const { currentPage, navToPage } = PageNavigation();
  const { user, setUser, loggedIn, setLoggedIn, mockLoginFunc } = useMockLogin(); // Access MockLogin context

  // Role-based navigation logic in useEffect
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUserData'));
     const currentPath = window.location.pathname;
     console.log("currentPath: ", currentPath)
    if (currentPath) {
      navToPage(currentPath.replace("/", ""));
    } 
    /**
     * loggedInUser-> the app found in user from localStrage
     * !loggedIn -> not yet merked the user as loggedIn
     * -->Update the login state this prevent unnecessary update
     * to the state if the user is already logged in.
     */

    if (loggedInUser && !loggedIn) {
      setUser(loggedInUser);
      setLoggedIn(true);

      if (loggedInUser.role === 'student') {
        navToPage('companyPage');
        
      } else if (loggedInUser.role === 'company') {
        navToPage('studentPage');
      
      }  
    } else if(!loggedInUser) {
      navToPage('login');
    } 
  }, [loggedIn,navToPage, setUser, setLoggedIn]);

  return (
    <>
      <NavBarWrapper navToPage={navToPage} />
      <MainAppContent currentPage={currentPage} navToPage={navToPage} />
    </>
  );
};

const NavBarWrapper = ({ navToPage }) => {
  const { loggedIn } = useMockLogin();
  return <NavBar loggedIn={loggedIn} navToPage={navToPage} />;
};

const MainAppContent = ({ currentPage }) => {
  const { mockLoginFunc, navToPage } = useMockLogin(); // Access the login function

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "companyPage":
        return <CompanyPage />;
      case "studentPage":
        return <StudentPage />;
      case "registerStudent":
        return <RegisterStudent />;
      case "registerCompany":
        return <RegisterCompany />;
      case "login":
        return (
        <Login 
          loginFunction={(email, password)=> mockLoginFunc(email, password, navToPage)} 
          navToPage={navToPage} 
        />
      );
      case "home":
      default:
        return <Home />;
    }
  };

  return <div>{renderCurrentPage()}</div>;
};

export default App;