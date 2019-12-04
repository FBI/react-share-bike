import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import GlobalRouter from './router'
//import RouterDemo from './pages/router-demo4.0/router'

ReactDOM.render(<Provider store={store}><GlobalRouter /></Provider>, document.getElementById('root'));
