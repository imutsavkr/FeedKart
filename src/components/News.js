import React, { Component } from 'react'
import NewsItem from './Newsitem'
import Spinner from './Spinner'

export class News extends Component {

    constructor() {
        super();
        // console.log("Hello I am a constructor from News component");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        // console.log("cdm");
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=77d833206c644ce69a460f55a936d8b7&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
    }

    handlePrevClick = async () => {
        // console.log("previous");
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=77d833206c644ce69a460f55a936d8b7&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
                page: this.state.page - 1,
                articles: parsedData.articles,
                loading:false
            });
        }
    }
    handleNextClick = async () => {
        // console.log("next");
        if (!this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=77d833206c644ce69a460f55a936d8b7&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json();
            // console.log(parsedData);
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            });
        }

    }
    render() {
        // console.log("render")
        return (
            <div className="container my-3">
                <h1 className="text-center">FeedKart - Top Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {this.state.articles.map((elemment) => {
                        return <div className="col-md-4" key={elemment.url} >
                            <NewsItem title={elemment.title ? elemment.title : ""} description={elemment.description ? elemment.description : ""} imageUrl={elemment.urlToImage} newsUrl={elemment.url} />
                        </div>
                    })}

                </div>
                < div className="container d-flex justify-content-between">
                    < button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previos</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
export default News