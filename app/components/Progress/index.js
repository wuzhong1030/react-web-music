import React, { Component } from 'react'
import './progress.less'

class Progress extends Component {
    constructor(props) {
        super(props)
        this.progressBarRef = React.createRef()
        this.handleChangeProgress = this.handleChangeProgress.bind(this)
    }
    handleChangeProgress(e) {
        let progressBar = this.progressBarRef.current
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth
        this.props.onProgressChange && this.props.onProgressChange(progress)
    }
    render() {
        return (
            <div ref={this.progressBarRef} className="progress-component" onClick={this.handleChangeProgress}>
                <div className="progress"></div>
            </div>
        )
    }
}

export default Progress