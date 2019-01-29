import { database } from '../../firebase'
import { Post } from '../stores/PostStore'
import uuidv1 from 'uuid'

export default class PostServices{
    static async fetchAllPosts(): Promise<Array<Post>>{
        try {
            const allPosts = await database.ref('posts').once('value')
      
            let posts: Array<Post> = [];
    
            allPosts.forEach((childSnapshot) => {
              const childData: Post = childSnapshot.val()
              posts.push(childData)
            });

            return posts;
    
        } catch (error) {
            return error
        }    
    }

    static async getPostByID(id: string): Promise<any>{
        try {
            return await database.ref('posts/' + id).once('value');
        } catch (error) {
            return error;
        }
    }

    static async addPost(payload: {title: string, content: string, published: boolean}): Promise<Post>{
        try {
            const postData: Post = {
                id: uuidv1(),
                title: payload.title,
                content: payload.content,
                published: payload.published
            }
            return await database.ref('posts').child(postData.id).set(postData)
        } catch (error) {
             return error;
        }
    }

    static async updatePost(postObj: Post): Promise<any>{
        try {
            return await database.ref('posts').child(postObj.id).update(postObj)
        } catch (error) {
            return error;
        }
    }

    static async deletePostByID(id: string): Promise<any>{
        try {
           return await database.ref('posts/' + id).remove() 
        } catch (error) {
            return error;
        }
    }
}