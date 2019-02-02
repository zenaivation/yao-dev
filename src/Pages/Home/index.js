import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import { Navigation, SearchBar, WeatherBlock, NewsBlock, MainPlace, SmallPlace, Header } from '../../components';
import { getWeather, getNews, getPlaces, saveSearch } from "../../actions/index";
import toMap from '../../images/toMap.png';

import './styles.scss';

const key = 'AIzaSyC48nPNoUEt9PuHq3IAOSfUZ-SPjbKksMk';


class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: '',
    }
  }

  componentDidMount() {
    // calling the new action creator
    this.props.getWeather();
    this.props.getNews();
    navigator.geolocation.getCurrentPosition(async function (location) {
      console.log(location.coords.longitude);
      this.setState({
        lat: location.coords.latitude,
        lon: location.coords.longitude
      })
      this.props.getPlaces(location.coords.latitude, location.coords.longitude).then(res => {
        console.log("Places awaited tadaa", res);
      });
    }.bind(this))
  }


  onSearch = (event) => {
    this.setState({
      search: event.target.value
    })
  }

  keyPress = async (event) => {
    const { search } = this.state;
    if (event.keyCode === 13) {
      await this.props.saveSearch(search);
      if (this.props.searchLocation) {
        console.log('searchLocation', this.props.searchLocation);
        this.props.history.push({
          pathname: `/map`,
          state: {
            lat: this.props.searchLocation.lat,
            lng: this.props.searchLocation.lng
          }
        })
      }
    }
  }

  render() {
    const { weather, news, places, isLoading } = this.props;
    return (
      <Fragment>
        <div className="home">
          <Header title="Home" />
          <div className="home__locationBg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1468436385273-8abca6dfd8d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=994&q=80)' }}>
            <div className="home__container">
              <SearchBar
                onChange={this.onSearch}
                onKeyDown={this.keyPress}
              />
              <Link className="home__toMap" to='/map'>
                <img src={toMap} alt="to map" />
              </Link>
            </div>
          </div>
          <div className="w-n-container">
            {weather ? (<WeatherBlock
              celcius={weather.main.temp}
              weather_status={weather.weather[0].main}
            />
            ) : <Skeleton width={100} />}

            {news ? (
              <NewsBlock
                news_title={news.articles[0].title}
                news_description={news.articles[0].description}
              />
            ) : <Skeleton width={100} />}
          </div>
          <div className="main-place-container">
            {places.slice(0, 1).map(place =>
              <Fragment>
                {place.photos ? (
                  <MainPlace
                    title={place.name}
                    image={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${key}`}
                  />
                ) : (
                    <MainPlace
                      title={place.name}
                      image="https://via.placeholder.com/150"
                    />
                  )}
              </Fragment>
            )}
          </div>

          <div className="small-place-container">
            {places.slice(1, -1).map(place =>
              <Fragment>
                {place.photos ? (
                  <SmallPlace
                    title={place.name}
                    image={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${key}`}
                  />
                ) : (
                    <SmallPlace
                      title={place.name}
                      image="https://via.placeholder.com/150"
                    />
                  )}
              </Fragment>
            )}
          </div>
        </div>
        <Navigation home={true} />
      </Fragment>
    );
  }

}

function mapStateToProps(state) {
  return {
    weather: state.weather,
    news: state.news,
    places: state.places,
    searchLocation: state.searchLocation,
    isLoading: state.isLoading
  };
}

export default connect(
  mapStateToProps,
  { getWeather, getNews, getPlaces, saveSearch }
)(Home);
