import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadDevTools } from 'jira-dev-tool'
import {AppProvider} from './context'

loadDevTools(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProvider>
        {/* App代表了有所有的鉴权 */}
        <App />
      </AppProvider>
    </React.StrictMode>,
    document.getElementById('root')
  )
}
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
