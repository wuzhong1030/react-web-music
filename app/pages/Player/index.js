import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { MUSIC_LIST } from '../../mock'
import './player.less'

export default class Player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            progress: 0,
            volume: 0,
            isPlay: true,
            leftTime: ''
        }
    }
    componentDidMount() {
        $("#player").bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute,
                volume: e.jPlayer.options.volume * 100,
                leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
            });
        });
    }
    componentWillUnmount() {
        $("#player").unbind($.jPlayer.event.timeupdate);
    }
    render() {
        return (
            <div className="player-page">
                <div className="player-container">
                    <h3 className="caption">
                        <Link to="/list">我的私人音乐坊 &gt;</Link>
                    </h3>
                    <div className="player-music">
                        <div className="music-info">
                            <h2 className="title">{this.props.currentMusitItem.title}</h2>
                            <div className="author">{this.props.currentMusitItem.artist}</div>
                        </div>
                        <img className="music-image" src={this.props.currentMusitItem.cover} alt={this.props.currentMusitItem.title} />
                    </div>
                </div>
            </div>
        )
    }
}