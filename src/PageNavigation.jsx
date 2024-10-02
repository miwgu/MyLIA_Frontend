import {useState} from "react";

export const PageNavigation = () =>{
    const [currentPage, setCurrentPage] = useState('home');

    const navToPage = (page) =>{
        setCurrentPage(page)
        window.history.pushState(null, '', `/${page}`);// update browser URL
    
        switch(page){
          case 'companyPage':
            window.history.pushState(null,'','/companyPage');
            break;
          case 'studentPage':
            window.history.pushState(null,'','/studentPage');
            break;
          case 'registerStudent':
            window.history.pushState(null,'', '/registerStudent');
            break;
          case 'registerCompany':
            window.history.pushState(null,'','/registerCompany');
            break;
          case 'login':
            window.history.pushState(null,'','/login');
            break;
         case 'home':
            default:
            window.history.pushState(null, '', '/');
        }
    };
        

    return { currentPage, navToPage };
}