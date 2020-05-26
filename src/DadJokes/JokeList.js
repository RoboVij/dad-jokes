import React, { Component } from 'react';
import Joke from './Joke';
import './JokeList.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
const API_URL = "https://icanhazdadjoke.com/";

class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }
    constructor(props) {
        super(props);
        this.state = { jokes: JSON.parse(window.localStorage.getItem("jokes")) || "[]" };
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        if (this.state.jokes.length === 0) this.getJokes();
    }
    async getJokes() {
        let jokes = [];
        while (jokes.length < this.props.numJokesToGet) {
            let res = await axios.get(API_URL, { headers: { Accept: "application/json" } });
            jokes.push({ id: uuidv4(), text: res.data.joke, votes: 0 });
        }
        this.setState(
            st => ({
                jokes: [...st.jokes, ...jokes]
            }),
            () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        );
    }
    handleVote(id, delta) {
        this.setState(st => ({
            jokes: st.jokes.map(j =>
                j.id === id ? { ...j, votes: j.votes + delta } : j)
        }),
            () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        )
    }
    handleClick() {
        this.getJokes();
    }
    render() {
        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1>Dad Jokes</h1>
                    <img src="https://p7.hiclipart.com/preview/955/902/377/emoticon-smiley-face-with-tears-of-joy-emoji-happiness-crying-emoji.jpg" />
                    <button onClick={this.handleClick}>New Joke</button>
                </div>
                <div className="JokeList-jokes">
                    {this.state.jokes.map(j => (
                        <Joke
                            votes={j.votes}
                            text={j.text}
                            key={j.id}
                            upvote={() => this.handleVote(j.id, 1)}
                            downvote={() => this.handleVote(j.id, -1)}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default JokeList;
