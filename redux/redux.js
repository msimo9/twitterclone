import {createStore} from 'redux';

export const ADD_TWEET = 'ADD_TWEET';
export const SAVE_UID = 'SAVE_UID';

const initalState = {
    tweets: [],
    username: "it works!",
    uid: "",
    profilePicture: 'https://pbs.twimg.com/profile_images/1329670103026298880/7pRawxKB_400x400.jpg',
    drawer: false,
    profileType: "public",
}

export const addTweet = () => ({
    type: ADD_TWEET,
    payload: null,
});

export const saveUID = (uid) => ({
    type: SAVE_UID,
    payload: {uid}
});

export const rootReducer = (state = initalState, action) => {
    switch (action.type) {
        case ADD_TWEET:
            return{
                ...state,
            }
        case SAVE_UID:
            console.log("uid ", action.payload.uid, " saved!");
            return{
                ...state,
                uid: action.payload.uid,
            }
        default:
            return state;
    }
}

const store = createStore(rootReducer);

export default store;