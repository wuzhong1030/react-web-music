import React, { Component } from 'react'

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
                    xxx
                </div>
            </div>
        )
    }
}