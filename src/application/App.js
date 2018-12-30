import React, {Component} from 'react';
import logo from '../logo.svg';
import './App.css';

class App extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            is_logged_in : false
        };
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>

                <p>
                    {this.state.is_logged_in}
                </p>
            </div>
        );
    }



    requestAccess(){
        console.log();
    }
}

export default App;
