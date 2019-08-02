import React from 'react';
import ReactDOM from 'react-dom';
import App from './application/core/App';
import registerServiceWorker from './registerServiceWorker';
import {applyMiddleware, compose, createStore} from "redux";
import {appReducer} from "./application/core/reducer/appReducer";
import {Provider} from "react-redux";
import {ThemeProvider} from "@material-ui/styles";
import {theme} from "./application/core/theme/appTheme";
import thunk from "redux-thunk";

const store = createStore(
    appReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </Provider>
    , document.getElementById('root')
);


registerServiceWorker();
