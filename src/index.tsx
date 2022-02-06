import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './routers';
import reportWebVitals from './reportWebVitals';

if (window.self === window.top) {
  document.body.style.display = 'block';
} else {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.top.location = window.self.location;
}

// for fixing back button in firefox to not cache the dom and return the old page after back button
// eslint-disable-next-line @typescript-eslint/no-empty-function
window.addEventListener('unload', () => {});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
