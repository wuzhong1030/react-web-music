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
    progressChangeHandler(progress) {
        console.log('parent', progress)
    }
    render() {
        return (
            <div className="app-container">
                <Header />
                <Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler}/>
            </div>
        )
    }
}

export default App
