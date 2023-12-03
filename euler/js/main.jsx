import React from 'react';
import { createRoot } from 'react-dom/client';
import { MathJaxContext } from 'better-react-mathjax';
// import Feed from './feed';
// import Inf from './inf';
import App from './App';

const root = createRoot(document.getElementById('reactEntry'));

// Use the root instance to render your main component
root.render(
  <React.StrictMode>
    <MathJaxContext>
        <App />
    </MathJaxContext>
  </React.StrictMode>
);

// // This method is only called once
// ReactDOM.render(
//   // Insert the post component into the DOM
//   // <Feed />,
//   <App />,
//   // <Inf />,
//   document.getElementById('reactEntry'),
// );
