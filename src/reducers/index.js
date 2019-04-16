
// Creating the initial state
const initialState = {
  weather: null,
  news: null,
  places: [],
  profilePref: {},
  searchLocation: [],
  bookmarks: [],
  isLoading: null,
};



function rootReducer(state = initialState, action) {
  switch (action.type) {

    case 'PLACES_IS_LOADING': {
      return { ...state, isLoading: true };
    }

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