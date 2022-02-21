import {createStore} from 'redux';

export const ADD_TWEET = 'ADD_TWEET';
export const SAVE_UID = 'SAVE_UID';
export const SAVE_PHOTO = 'SAVE_PHOTO';

const initalState = {
    tweets: [],
    username: "it works!",
    uid: "",
    profilePicture: 'https://firebasestorage.googleapis.com/v0/b/twitterclone-cbd8e.appspot.com/o/default_profile_400x400.png?alt=media&token=036b7057-da16-4269-a2d9-a4e767b31772',
    drawer: false,
    profileType: "public",
    tweetAdded: 0,
}

export const addTweet = () => ({
    type: ADD_TWEET,
    payload: null,
});

export const saveUID = (uid) => ({
    type: SAVE_UID,
    payload: {uid}
});

export const savePhoto = (url) => ({
    type: SAVE_PHOTO,
    payload: {url}
});

export const rootReducer = (state = initalState, action) => {
    switch (action.type) {
        case ADD_TWEET:
            console.log("add tweet in react redux");
            const newNumber = parseInt(state.tweetAdded) + 1;
            return{
                ...state,
                tweetAdded: newNumber,
            }
        case SAVE_UID:
            console.log("uid ", action.payload.uid, " saved!");
            return{
                ...state,
                uid: action.payload.uid,
            }
        case SAVE_PHOTO:{
            return{
                ...state,
                profilePicture: action.payload.url,
            }
        }
        default:
            return state;
    }
}

const store = createStore(rootReducer);

export default store;