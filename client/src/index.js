import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';

if (process.env.NODE_ENV !== 'production') {
    localStorage.setItem('debug', 'sad-world:*');
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();