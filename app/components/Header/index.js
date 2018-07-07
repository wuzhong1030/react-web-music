import React, { Component } from 'react';
import './header.less'
import music from './assets/music.png';

class Header extends Component {
    render() {
        return (
            <div className="header-component">
                <img src={music} alt="" className="logo" />
                <h1 className="caption">React Music</h1>
            </div>
        )
    }
}

export default Header