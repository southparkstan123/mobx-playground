import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { PostStore,  Post } from '../stores/PostStore';

interface PostListProps {
    postStore: PostStore
}

@inject('postStore')
@observer
export default class PostList extends Component<PostListProps>{

    componentDidMount () { 
        this.props.postStore.fetchAllPublishedPosts();
    }

    onDelete(id: string){
        let r = confirm('Are you sure?');
        if(r === true) {
            this.props.postStore.deletePostByID(id);
        }
    }

    render(){
        const postStore: PostStore = this.props.postStore;
        return (
            <div>
                {
                    postStore.posts.map((post: Post) => 
                        <div className="">
                            <h1>{post.title}</h1>
                            <p>{post.content}</p>
                            <p>{post.published ? "Published": "Not publish yet"}</p>
                            <button type="button" onClick={() => this.onDelete(post.id)}>Delete</button>
                            <button type="button">Edit</button>
                        </div>
                    )
                }
            </div>
        )
    }
}

