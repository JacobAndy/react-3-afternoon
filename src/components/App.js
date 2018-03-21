import React, { Component } from "react";
import axios from "axios";
import Post from "./Post/Post";
import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    let promise = axios.get("https://practiceapi.devmountain.com/api/posts");
    promise.then(res => {
      console.log(res.data);
      this.setState({ posts: res.data });
    });
  }

  updatePost(id, text) {
    axios
      .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {
        text
      })
      .then(res => {
        this.setState({ posts: res.data });
      });
  }

  deletePost(id) {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(res => this.setState({ posts: res.data }));
  }

  createPost(text) {
    axios
      .post(`https://practiceapi.devmountain.com/api/posts`, {
        text
      })
      .then(res => this.setState({ posts: res.data }));
  }

  render() {
    const { posts } = this.state;
    var newPost = posts.map((e, i) => {
      return (
        <Post
          key={e.id}
          text={JSON.stringify(e.text)}
          date={e.date}
          updatePostFn={this.updatePost}
          deletePostFn={this.deletePost}
          id={e.id}
        />
      );
    });
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {newPost}
        </section>
      </div>
    );
  }
}

export default App;
