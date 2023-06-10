import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '@store/store';
import { createRoot } from 'react-dom/client';
import reportWebVitals from "./reportWebVitals";
import SimpleReactLightbox from "simple-react-lightbox";
import  ThemeContext  from "./context/ThemeContext"; 
import { AuthProvider } from "./auth/AuthContext";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(

    <Provider store = {store}>
        <SimpleReactLightbox>
            <AuthProvider>
                <BrowserRouter basename=''>
                    <ThemeContext>
                        <App />
                    </ThemeContext>  
                </BrowserRouter>   
            </AuthProvider>
        </SimpleReactLightbox>
    </Provider>	

);
reportWebVitals();
