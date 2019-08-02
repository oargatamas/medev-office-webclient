import React from 'react';
import ReactDOM from 'react-dom';
import App from './application/core/App';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from "redux";
import {appReducer} from "./application/core/reducer/appReducer";
import {Provider} from "react-redux";
import {ThemeProvider} from "@material-ui/styles";
import {theme} from "./application/core/theme/appTheme";

const store = createStore(appReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </Provider>
    , document.getElementById('root')
);


registerServiceWorker();
