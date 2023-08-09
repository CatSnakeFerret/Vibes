import React from 'react';
// import reactDom from "react-dom";
import App from './client/components/App.jsx'; // added file format at the end
import { createRoot } from 'react-dom/client';
import './css/styles.css';
import './css/tailwind.css';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);
