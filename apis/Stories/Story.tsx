import axios from "axios";
import { fetchStories } from "@/store/actions/storiesAction";
export const getStoriesWithLikes = (allStories: Boolean) => {
  return new Promise<any>((resolve, reject) => {
    let queryGenerator =  allStories ? `query{
      getStoryWithLikes {
        id
        title
        description
        like_count
        picture
        user_id
        msg
        liked_by_user
        liked_count
      }
    }` : 
    `query{
      getStoryWithLikesById {
        id
        title
        description
        like_count
        picture
        user_id
        msg
        liked_by_user
        liked_count
      }
    }`
    axios({
      url: 'http://localhost:4000/stories/graphql',
      method: 'post',
      withCredentials: true,
      data: {
        query: queryGenerator
      }
    }).then((result: any) => {
      resolve(result)
    }).catch(err => {
      reject(err)
    });
  })
}

export const uploadStory = (payload: any) => {
  return new Promise<any>((resolve, reject) => {
    axios({
      url: 'http://localhost:4000/upload/uploadStory',
      method: 'post',
      data: payload.formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((result: any) => {
      resolve(result)
    }).catch(err => {
      reject(err)
    });
  })
}
