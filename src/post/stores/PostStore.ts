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
    PostServices.deletePostByID(id).then((response: Post) => {
        this.posts = this.posts.filter(post => post.id !== id)
    }).catch((error: any) => error)
  }
}

export const postStore = new PostStore()