import React, { Component } from 'react';
import Header from "./components/Header"
import Progress from './components/Progress'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: '-'
        }
    }
    componentDidMount() {
        $("#player").jPlayer({
            ready: function () {

            }
        })
    }
    render() {
        return (
            <div className="app-container">
                <Header />
                <Progress progress={this.state.progress} />
            </div>
        )
    }
}

export default App
