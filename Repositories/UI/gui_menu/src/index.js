import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AdminHome from './OnlinePosts/AdminHome';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Status from './Scripts/Status'
import OrderSummary from'./Scripts/OrderSummary';
import My_order from './Scripts/my_order'


// ReactDOM.render(<App />, document.getElementById('root'));

const routing = (
        <Router>
            <div>
                <Route exact path="/admin" component={AdminHome} />
                <Route exact  path="/OrderSummary" component={OrderSummary} />
                <Route  exact path="/" component={App} />
                <Route  exact path="/status" component={Status} />
                <Route  exact path="/my_order" component={My_order} />
            </div>
        </Router>
    )

    ReactDOM.render(routing, document.getElementById('root'))

    serviceWorker.unregister();