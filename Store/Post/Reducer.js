import { 
    GET_ALL_TWEET_REQUEST, 
    GET_ALL_TWEET_FAILURE, 
    GET_USERS_TWEET_SUCCESS, 
    GET_USERS_TWEET_FAILURE, 
    USER_LIKE_TWEET_SUCCESS, 
    LIKE_TWEET_SUCCESS,
    USER_LIKE_TWEET_FAILURE, 
    FIND_TWEET_BY_ID_SUCCESS, 
    FIND_TWEET_BY_ID_FAILURE, 
    TWEET_CREATE_SUCCESS, 
    TWEET_CREATE_FAILURE, 
    ADD_COMMENT_SUCCESS, 
    ADD_COMMENT_FAILURE, 
    DELETE_COMMENT_SUCCESS, 
    DELETE_COMMENT_FAILURE, 
    GET_ALL_COMMENTS_SUCCESS, 
    GET_ALL_COMMENTS_FAILURE, 
    REPOST_SUCCESS, 
    REPOST_FAILURE, 
    UNREPOST_SUCCESS, 
    UNREPOST_FAILURE, 
    LIKE_SUCCESS, 
    LIKE_FAILURE, 
    UNLIKE_SUCCESS, 
    UNLIKE_FAILURE, 
    FAVORITE_SUCCESS, 
    FAVORITE_FAILURE, 
    RETWEET_CREATE_SUCCESS, 
    UNFAVORITE_FAILURE, 
    TWEET_DELETE_SUCCESS, 
    TWEET_DELETE_FAILURE,
    GET_ALL_TWEET_SUCCESS,
    TWEET_CREATE_REQUEST,
    TWEET_DELETE_REQUEST,
    USER_LIKE_TWEET_REQUEST,
    LIKE_TWEET_REQUEST,
    RETWEET_CREATE_REQUEST,
    FIND_TWEET_BY_ID_REQUEST,
    RETWEET_CREATE_FAILURE
} from "./ActionType";

const initialState = {
    loading: false,
    data:null,
    error: null,
    tweets: [],
    tweet:null,
    userTweets: [],
    likedTweets: [],
    currentTweet: null,
    comments: [],
};

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case TWEET_CREATE_REQUEST:
        case TWEET_DELETE_REQUEST:
        case USER_LIKE_TWEET_REQUEST:
        case LIKE_TWEET_REQUEST:
        case RETWEET_CREATE_REQUEST:
        case FIND_TWEET_BY_ID_REQUEST:
            return {...state,loading:true,error:null}
        case GET_ALL_TWEET_REQUEST:
            return { ...state, tweets: action.payload, loading: false };
        case GET_ALL_TWEET_FAILURE:
        case GET_USERS_TWEET_FAILURE:
        case USER_LIKE_TWEET_FAILURE:
        case RETWEET_CREATE_FAILURE:
        case FIND_TWEET_BY_ID_FAILURE:
        case TWEET_CREATE_FAILURE:
        case ADD_COMMENT_FAILURE:
        case DELETE_COMMENT_FAILURE:
        case GET_ALL_COMMENTS_FAILURE:
        case REPOST_FAILURE:
        case UNREPOST_FAILURE:
        case LIKE_FAILURE:
            return {
                ...state,
                loading:false,
                error: action.payload,
            };
        case UNLIKE_FAILURE:
        case FAVORITE_FAILURE:
        case UNFAVORITE_FAILURE:
        case TWEET_DELETE_FAILURE:
            return { ...state, error: action.payload, loading: false };

        case GET_ALL_TWEET_SUCCESS:
            return {...state,loading:false,error:null, tweets: action.payload}; 
        case GET_USERS_TWEET_SUCCESS:
            return { ...state, userTweets: action.payload, loading: false };
            // return {...state,loading:false,error:null, tweets: action.payload}; 

        case USER_LIKE_TWEET_SUCCESS:
            return { ...state, likedTweets: action.payload, loading: false,error:null };

        case LIKE_TWEET_SUCCESS:
            return {...state,loading:false,error:null, like: action.payload}; 

        // case FIND_TWEET_BY_ID_SUCCESS:
        //     return { ...state, currentTweet: action.payload, loading: false };

        case TWEET_CREATE_SUCCESS:
            return { ...state, tweets: [action.payload, ...state.tweets], loading: false,error:null, };
        
        
        case ADD_COMMENT_SUCCESS:
            return { ...state, comments: [...state.comments, action.payload], loading: false };
        case FIND_TWEET_BY_ID_SUCCESS:    
            return {...state,loading:false,error:null, tweet: action.payload}; 

        case DELETE_COMMENT_SUCCESS:
            return { 
                ...state, 
                comments: state.comments.filter(comment => comment.id !== action.payload), 
                loading: false 
            };

        case GET_ALL_COMMENTS_SUCCESS:
            return { ...state, comments: action.payload, loading: false };

        case REPOST_SUCCESS:
        case UNREPOST_SUCCESS:
            case LIKE_SUCCESS:
                return {
                    ...state,
                    tweets: state.tweets.map((tweet) =>
                        tweet.id === action.payload.postId
                            ? {
                                  ...tweet,
                                  liked: action.payload.liked,
                                  likesCount: action.payload.likesCount,
                              }
                            : tweet
                    ),
                    likedTweets: action.payload.liked
                        ? [...state.likedTweets, action.payload.postId]
                        : state.likedTweets.filter((id) => id !== action.payload.postId),
                };
        case UNLIKE_SUCCESS:
        case FAVORITE_SUCCESS:
        case RETWEET_CREATE_SUCCESS:
            return {...state,loading:false,error:null, retweet: action.payload}; 
        case TWEET_DELETE_SUCCESS:
            return {...state,loading:false,error:null, tweets: state.tweets.filter((tweet)=>tweet.id!==action.payload)};

        default:
            return state;
    }
};


