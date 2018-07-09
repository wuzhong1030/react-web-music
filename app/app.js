import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { MUSIC_LIST } from './mock'
import Header from "./components/Header"
import PlayerPage from './pages/Player'
import List from './pages/List'

class App extends Component {
    constructor(props) {
        super(props);
        console.log(MUSIC_LIST)
        this.state = {
            progress: '-',
            musicItem: MUSIC_LIST[0]
        }
    }
    componentDidMount() {
        $("#player").jPlayer({
            supplied: "mp3",
            wmode: "window",
            useStateClassSkin: true
        });

        this.playMusic(this.state.musicList[0]);

        $("#player").bind($.jPlayer.event.ended, (e) => {
            this.playWhenEnd();
        });
        PubSub.subscribe('PLAY_MUSIC', (msg, item) => {
            this.playMusic(item);
        });
        PubSub.subscribe('DEL_MUSIC', (msg, item) => {
            this.setState({
                musicList: this.state.musicList.filter((music) => {
                    return music !== item;
                })
            });
        });
        PubSub.subscribe('PLAY_NEXT', () => {
            this.playNext();
        });
        PubSub.subscribe('PLAY_PREV', () => {
            this.playNext('prev');
        });
        let repeatList = [
            'cycle',
            'once',
            'random'
        ];
        PubSub.subscribe('CHANAGE_REPEAT', () => {
            let index = repeatList.indexOf(this.state.repeatType);
            index = (index + 1) % repeatList.length;
            this.setState({
                repeatType: repeatList[index]
            });
        });
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
            <PlayerPage currentMusitItem={this.state.musicItem}/>
        )
    }
}

export default class Root extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="app-container">
                    <Header />
                    <Route exact path="/" component={App} />
                    <Route path="/list" component={List} />
                </div>
            </BrowserRouter>
        );
    }
}

