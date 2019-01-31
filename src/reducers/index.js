import { ADD_ARTICLE } from "../constants/action-types";
const initialState = {
  articles: [
    {
      title: "Biertuinen"
    },
    {
      title: "Restaurant 1900"
    }
  ],

  weather: null,
  news: null,
  places: [],
  profilePref: {},
  searchLocation: [],
  bookmarks: [],
};



function rootReducer(state = initialState, action) {
  switch (action.type) {

    case 'DATA_PLACES': {
      const { data } = action.result;
      return { ...state, places: data, isLoading: false };
    }

    case 'DATA_PLACES_ERROR': {
      return { ...state };
    }

    case 'DATA_WEATHER': {
      return Object.assign({}, state, {
        weather: action.payload
      });
    }

    case 'DATA_NEWS': {
      return Object.assign({}, state, {
        news: action.payload
      });
    }

    case 'SAVE_PREF': {
      return Object.assign({}, state, {
        profilePref: action.payload
      });
    }

    case 'SAVE_SEARCH': {
      return Object.assign({}, state, {
        searchLocation: action.payload
      });
    }

    case 'SAVE_BOOKMARK': {
      console.log(action.payload);
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload]
      }
    }

    default:
      return state;
  }
}

export default rootReducer;