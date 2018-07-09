import React, { Component } from 'react'
import { MUSIC_LIST } from '../../mock'
import PubSub from 'pubsub-js'
import './list.less'

export default class Player extends Component {
    constructor(props) {
        super(props)
    }
    handleSelectMusic(item) {
        PubSub.publish('PLAY_MUSIC', item)
    }
    render() {
        const items = MUSIC_LIST.map(item => {
            return (
                <li onClick={() => this.handlePlayMusic(item)} className="item" key={item.id}>{item.title} - {item.artist}</li>
            )
        })
        return (
            <ul className="list">
                {items}
            </ul>
        )
    }
}