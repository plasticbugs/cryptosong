import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();