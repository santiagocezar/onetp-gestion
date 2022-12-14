import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'

import "@unocss/reset/tailwind.css";
import "./assets/Samo.css";
import "./assets/index.css";
import "uno.css";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
