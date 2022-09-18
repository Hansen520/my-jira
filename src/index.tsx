import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DevTools, loadServer } from 'jira-dev-tool'
// 务必在jira-dev-tool后面引入
import "antd/dist/antd.less";
import {AppProvider} from './context'

loadServer(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProvider>
        {/* App代表了有所有的鉴权 */}
        <DevTools />
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
