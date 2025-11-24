import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import * as pdfjsLib from 'pdfjs-dist'
import App from './App'
import './index.css'

// Configure PDF.js worker - use local copy
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
