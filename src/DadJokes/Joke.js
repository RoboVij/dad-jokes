import React, { Component } from 'react';
// import Deck from './Deck';
// import './Joke.css';

class Joke extends Component {
    render() {
        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <button onClick={this.props.upvote}>^</button>
                    <span>{this.props.votes}</span>
                    <button onClick={this.props.downvote}>v</button>
                </div>
                <div className="Joke-text">{this.props.text}</div>
            </div>
        );
    }
}

export default Joke;
