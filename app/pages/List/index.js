import React, { Component } from 'react'
import { MUSIC_LIST } from '../../mock'
import './list.less'

export default class Player extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const items = MUSIC_LIST.map(item => {
            return (
                <li className="item" key={item.id}>{item.title} - {item.artist}</li>
            )
        })
        return (
            <ul className="list">
                {items}
            </ul>
        )
    }
}