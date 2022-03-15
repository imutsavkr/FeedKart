import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
    render() {
        return (
            <div className="container my-3">
                <h2>FeedKart - Top headlines</h2>
                <div className="col-md-4">
                    <Newsitem title="myTitle" description="myDescription" />
                </div>
                <div className="col-md-4">
                    <Newsitem title="myTitle" description="myDescription" />
                </div>
                <div className="col-md-4">
                    <Newsitem title="myTitle" description="myDescription" />
                </div>
            </div>
        )
    }
}

export default News