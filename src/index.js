import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/store';
import reportWebVitals from "./reportWebVitals";
import SimpleReactLightbox from "simple-react-lightbox";
import  ThemeContext  from "./context/ThemeContext"; 
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.render(
	<GoogleOAuthProvider clientId="101008384453-kvvtt6668hctnnofcc5q2cd7rnjma8cl.apps.googleusercontent.com" >
        <React.StrictMode>
            <Provider store = {store}>
                <SimpleReactLightbox>
                    <BrowserRouter>
                        <ThemeContext>
                            <App />
                        </ThemeContext>  
                    </BrowserRouter>    
                </SimpleReactLightbox>
            </Provider>	
	    </React.StrictMode>,
    </GoogleOAuthProvider>,
    document.getElementById("root")
);
reportWebVitals();
