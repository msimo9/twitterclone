import {createStore} from 'redux';

export const ADD_TWEET = 'ADD_TWEET';

const initalState = {
    tweets: [],
    username: "it works!",
    uid: "",
}

export const addTweet = () => ({
    type: ADD_TWEET,
    payload: null,
});

export const rootReducer = (state = initalState, action) => {
    switch (action.type) {
        case ADD_TWEET:
            return{
                ...state,
            }
        default:
            return state;
    }
}

const store = createStore(rootReducer);

export default store;