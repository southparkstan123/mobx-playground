import React, { Component } from 'react';
import PostList from '../src/post/components/PostList'
// import PostCounter from '../src/post/components/PostCounter'
import { postStore } from '../src/post/stores/PostStore'

class App extends Component {
  render() {
    return (
      <div className="App">
        <PostList postStore={postStore}></PostList>
      </div>
    );
  }
}

export default App;
