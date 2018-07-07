import React, { Component } from 'react'

class Progress extends Component {
    render() {
        return (
            <div className="progress-component">
                { this.props.progress }
            </div>
        )
    }
}

export default Progress