import { ADD_ARTICLE } from '../constants/action-types';
import axios from 'axios';

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}

export function getWeather() {
  return function(dispatch) {
    return fetch(
      'https://openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22'
    )
      .then(response => response.json())
      .then(json => {
        dispatch({ type: 'DATA_WEATHER', payload: json });
      });
  };
}

export function getNews() {
  return function(dispatch) {
    return fetch(
      'https://newsapi.org/v2/top-headlines?country=nl&pageSize=1&apiKey=3df3d604168d487592dba16581e9d5af'
    )
      .then(response => response.json())
      .then(json => {
        dispatch({ type: 'DATA_NEWS', payload: json });
      });
  };
}

export const getPlaces = (lat, long) => async dispatch => {
  try {
    dispatch({ type: 'PLACES_IS_LOADING' });
    const result = await axios.get(
      `https://yao-backend-dev.herokuapp.com/foursqaure/places/${lat}/${long}`,
      {}
    );
    return dispatch({ type: 'DATA_PLACES', result });
  } catch (err) {
    return dispatch({
      type: 'DATA_PLACES_ERROR',
      err
    });
  }
};

export function saveBookmark(obj) {
  return function(dispatch) {
    return dispatch({ type: 'SAVE_BOOKMARK', payload: obj });
  };
}

export function savePrefrences(obj) {
  return { type: 'SAVE_PREF', payload: obj };
}

export function saveSearch(searchQuery) {
  return function(dispatch) {
    return fetch(`https://yao-backend-dev.herokuapp.com/search/${searchQuery}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: 'SAVE_SEARCH', payload: json });
      });
  };
}

export const getSpottedByLocalsPlaces = city_id => async dispatch => {
  try {
    dispatch({ type: 'SPOTTED_BY_LOCALS_LOADING' });
    const result = await axios.get(
      `http://api.spottedbylocals.com/getlatestblogsfromcity/?city_id=${city_id}&key=jfljfo138021&sort=desc&limit=10`,
      {
        headers: {
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': 'http://api.spottedbylocals.com'
        }
      }
    );
    console.log('test', result);
    return dispatch({ type: 'SPOTTED_BY_LOCALS_DATA', result });
  } catch (err) {
    console.log(err);
    return dispatch({
      type: 'SPOTTED_BY_LOCALS_ERROR',
      err
    });
  }
};
