import { observable, computed, action } from 'mobx'
import PostServices from '../services/PostServices'

export interface Post {
    id: string,
    title: string,
    content: string,
    published: boolean
}

export class PostStore {
  @observable posts :Array<Post> = [];
  @observable post :Post = {
    id: '',
    title: '',
    content: '',
    published: false
  };

  @computed
  get countPublishedPost(): number {
    return this.posts.length
  }

  @action
  fetchAllPublishedPosts() {
    PostServices.fetchAllPosts().then((response: Array<Post>) => {
      this.posts = response
    }).catch (error => error);
  }

  @action
  deletePostByID(id: string) {
    PostServices.deletePostByID(id).then(() => {
      this.posts = this.posts.filter(post => post.id !== id);
    }).catch((error: any) => error)
  }

  @action
  addPost(payload: {title: string, content: string, published: boolean}) {
    PostServices.addPost(payload).then((response: Post) => {
      this.posts = [...this.posts, response];
    }).catch((error: any) => error)
  }

  @action
  updatePost(postObj: Post) {
    PostServices.updatePost(postObj).then((response: Post) => {
      this.posts.map(post => {
        if (post.id === postObj.id) {
          this.post = postObj
        }
        this.post = post
      })
    }).catch((error: any) => error)
  }

  @action
  getPostByID(id: string) {
    PostServices.getPostByID(id).then((response: Post) => {
      this.post = response;
    }).catch((error: any) => error)
  }
}

export const postStore = new PostStore()