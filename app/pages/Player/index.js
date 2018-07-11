import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Progress from '../../components/Progress'
import PubSub from 'pubsub-js'
import './player.less'

let duration = null
export default class Player extends Component {
  constructor (props) {
    super(props)
    this.state = {
      progress: 0,
      volume: 0,
      isPlay: true,
      leftTime: ''
    }
  }
  componentDidMount () {
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute,
        volume: e.jPlayer.options.volume * 100,
        leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
      })
    })
  }
  componentWillUnmount () {
    $('#player').unbind($.jPlayer.event.timeupdate)
  }
  handlePrevMusic () {
    PubSub.publish('PLAY_PREV')
  }
  formatTime (time) {
    time = Math.floor(time)
    let miniute = Math.floor(time / 60)
    let seconds = Math.floor(time % 60)

    return miniute + ':' + (seconds < 10 ? '0' + seconds : seconds)
  }
  handlePlay () {
    if (this.state.isPlay) {
      $('#player').jPlayer('pause')
    } else {
      $('#player').jPlayer('play')
    }
    this.setState({
      isPlay: !this.state.isPlay
    })
  }
  handleNextMusic () {
    PubSub.publish('PLAY_NEXT')
  }
  handleChangePlayType () {
    console.log(this)
    PubSub.publish('CHANAGE_PLAY_TYPE')
  }
  changeProgressHandler (progress) {
    $('#player').jPlayer('play', duration * progress)
    this.setState({
      isPlay: true
    })
  }
  render () {
    return (
      <div className="player-page">
        <div className="player-container">
          <h3 className="caption">
            <Link to="/list">我的私人音乐坊 &gt;</Link>
          </h3>
          <div className="player-music">
            <div className="music-info">
              <h2 className="title">{this.props.currentMusicItem.title}</h2>
              <div className="author">{this.props.currentMusicItem.artist}</div>
              <div className="player-info">
                <div className="time-voice">
                  <span className="time">{this.state.leftTime}</span>
                  <div className="voice"></div>
                </div>
                <Progress progress={this.state.progress}
                  onProgressChange={this.changeProgressHandler.bind(this)}></Progress>
              </div>
              <div className="player-btns">
                <div>
                  <span className="prev btn" onClick={this.handlePrevMusic}></span>
                  <span className={`btn ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.handlePlay.bind(this)}></span>
                  <span className="next btn" onClick={this.handleNextMusic}></span>
                </div>
                <div>
                  <span className={`btn play-${this.props.playType}`} onClick={this.handleChangePlayType.bind(this)}></span>
                </div>
              </div>
            </div>
            <img className="music-image" src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title} />
          </div>
        </div>
      </div>
    )
  }
}
