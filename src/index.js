import React from 'react';
import "./index.css";
import ReactDOM from 'react-dom';
import App from './application/core/App';
import registerServiceWorker from './registerServiceWorker';
import {applyMiddleware, compose, createStore} from "redux";
import {appReducer} from "./application/core/reducer/appReducer";
import {Provider} from "react-redux";
import {ThemeProvider} from "@material-ui/styles";
import {theme} from "./application/core/theme/appTheme";
import thunk from "redux-thunk";
import {SnackbarProvider} from "notistack";

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
            <SnackbarProvider maxSnack={5}>
                <App/>
            </SnackbarProvider>
        </ThemeProvider>
    </Provider>
    , document.getElementById('root')
);


registerServiceWorker();
