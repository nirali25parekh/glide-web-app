import { combineReducers } from 'redux'
import tweetReducer from './tweet/tweetReducer'
import userReducer from './user/userReducer'
import redditReducer from './reddit/redditReducer'

const rootReducer = combineReducers({
    tweet: tweetReducer,
    user: userReducer,
    reddit : redditReducer,
})

export default rootReducer