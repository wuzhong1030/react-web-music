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
            currentMusitItem: MUSIC_LIST[0],
            musicList: MUSIC_LIST,
			playType: 'cycle'
        }
    }
    componentDidMount() {
        $("#player").jPlayer({
            supplied: "mp3",
            wmode: "window",
            useStateClassSkin: true
        });

        this.playMusic(this.state.currentMusitItem);

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
            this.playNext('prev')
        });
        let playTypeList = [
            'cycle',
            'once',
            'random'
        ];
        PubSub.subscribe('CHANAGE_PLAY_TYPE', () => {
            let index = playTypeList.indexOf(this.state.playType)
            index = (index + 1) % playTypeList.length
            this.setState({
                playType: playTypeList[index]
            });
        });
    }
    componentWillUnmount() {
		PubSub.unsubscribe('PLAY_MUSIC')
		PubSub.unsubscribe('DEL_MUSIC')
		PubSub.unsubscribe('CHANAGE_PLAY_TYPE')
		PubSub.unsubscribe('PLAY_NEXT')
		PubSub.unsubscribe('PLAY_PREV')
	}
    progressChangeHandler(progress) {
        console.log('parent', progress)
    }
    playNext(type = 'next') {
		let index = this.findMusicIndex(this.state.currentMusitItem)
		if (type === 'next') {		
			index = (index + 1) % this.state.musicList.length
		} else {
			index = (index + this.state.musicList.length - 1) % this.state.musicList.length
		}
		let musicItem = this.state.musicList[index]
		this.setState({
			currentMusitItem: musicItem
		});
		this.playMusic(musicItem)
    }
    findMusicIndex(music) {
		let index = this.state.musicList.indexOf(music)
		return Math.max(0, index);
	}
    playMusic(item) {
		$("#player").jPlayer("setMedia", {
			mp3: item.file
		}).jPlayer('play')
		this.setState({
			currentMusitItem: item
		});
	}
    render() {
        return (
            <PlayerPage currentMusitItem={this.state.currentMusitItem} playType={this.state.playType}/>
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

