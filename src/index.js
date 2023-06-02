import App from "./App";
import { render } from '@wordpress/element';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import ReactDOM from 'react-dom/client';

   /**
     * Admin page
     */
    let current_page = window.location.search;
    /**
     * Get front page
     */
     let url=window.location.href
     let lastPart = url.split("/");
     let path = lastPart[lastPart.length-2];


if(current_page === '?page=dashboard_status'){
    render(
        <AuthContextProvider> 
            <ChatContextProvider>
                <App />
            </ChatContextProvider>
        </AuthContextProvider>
    , document.getElementById('wcs_dashboard'));
}
else if(current_page === '?page=wcs_setting'){
    render(<App />, document.getElementById('wcs_setting'));
}
else if(current_page === '?page=wcs_documentation'){
    render(<App />, document.getElementById('wcs_documentation'));
}
else if(path === 'get-support'){
    render(
        <AuthContextProvider> 
            <ChatContextProvider>
                <App />
            </ChatContextProvider>
        </AuthContextProvider>
        , document.getElementById('wcs_dashboard'));
}

// else{
//     render(<App />, document.getElementById('wcs_dashboard'));
// }
