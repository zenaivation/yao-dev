import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import {
  Navigation,
  SearchBar,
  WeatherBlock,
  NewsBlock,
  MainPlace,
  SmallPlace,
  Header
} from '../../components';
import {
  getWeather,
  getNews,
  getPlaces,
  saveSearch
} from '../../actions/index';
import toMap from '../../images/center-icon.png';
import profileImage from '../../images/profileImage.png';

import './styles.scss';

const key = 'AIzaSyCm_boaMdggWKCv5MSJPdM3xTnGiuq_5zg';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };
  }

  componentDidMount() {
    // Getting weahter data
    this.props.getWeather();
    // Getting news data
    this.props.getNews();
    // Getting users location
    navigator.geolocation.getCurrentPosition(
      async function(location) {
        console.log(location.coords.longitude);
        this.setState({
          lat: location.coords.latitude,
          lon: location.coords.longitude
        });
        this.props
          .getPlaces(location.coords.latitude, location.coords.longitude)
          .then(res => {
            console.log('Places awaited tadaa', res);
          });
      }.bind(this)
    );
  }

  // Search City function
  onSearch = event => {
    this.setState({
      search: event.target.value
    });
  };

  // Handles the enter on the search bar
  keyPress = async event => {
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
        });
      }
    }
  };

  //Handles click on place function
  goTo = place => {
    this.props.history.push({
      pathname: `/map`,
      state: {
        lat: place.lat,
        lng: place.lng,
        fromPlace: place
      }
    });
  };

  // Renders the layout of the homepage
  render() {
    const { weather, news, places, isLoading } = this.props;
    return (
      <Fragment>
        <div className="home">
          <div
            className="home__locationBg"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1468436385273-8abca6dfd8d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=994&q=80)'
            }}
          >
            <div className="home__container">
              <div className="profile">
                <p>Amsterdam</p>
                <Link to="/profile">
                  <img src={profileImage} alt=" " />
                </Link>
              </div>
              <SearchBar onChange={this.onSearch} onKeyDown={this.keyPress} />
              {this.state.searchError && (
                <p>No places were found for your query. Please try again.</p>
              )}
              <Link className="home__toMap" to="/map">
                <img src={toMap} alt="to map" />
              </Link>
            </div>
          </div>
          <div className="w-n-container">
            {weather ? (
              <WeatherBlock
                celcius={weather.main.temp}
                weather_status={weather.weather[0].main}
              />
            ) : (
              <Skeleton width={100} />
            )}

            {news ? (
              <NewsBlock
                news_title={news.articles[0].title}
                news_description={news.articles[0].description}
              />
            ) : (
              <Skeleton width={100} />
            )}
          </div>
          <div className="main-place-container">
            {places.slice(0, 1).map(place => (
              <Fragment>
                {place.photos ? (
                  <MainPlace
                    place={place}
                    title={place.venue.name}
                    // image={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
                    //   place.photos[0].photo_reference
                    // }&key=${key}`}
                    lat={place.venue.location.labeledLatLngs.lat}
                    lng={place.venue.location.labeledLatLngs.lng}
                    goTo={this.goTo}
                  />
                ) : (
                  <MainPlace
                    place={place}
                    title={place.venue.name}
                    image="https://via.placeholder.com/150"
                    lat={place.venue.location.labeledLatLngs.lat}
                    lng={place.venue.location.labeledLatLngs.lng}
                    goTo={this.goTo}
                  />
                )}
              </Fragment>
            ))}
          </div>

          <div className="small-place-container">
            {places.slice(1, 3).map(place => (
              <Fragment>
                {place.photos ? (
                  <SmallPlace
                    place={place}
                    title={place.venue.name}
                    lat={place.venue.location.labeledLatLngs.lat}
                    lng={place.venue.location.labeledLatLngs.lng}
                    goTo={this.goTo}
                    image="https://via.placeholder.com/150"
                  />
                ) : (
                  <SmallPlace
                    place={place}
                    title={place.venue.name}
                    lat={place.venue.location.labeledLatLngs.lat}
                    lng={place.venue.location.labeledLatLngs.lng}
                    goTo={this.goTo}
                    image="https://via.placeholder.com/150"
                  />
                )}
              </Fragment>
            ))}
          </div>
        </div>
        <Navigation home={true} />
      </Fragment>
    );
  }
}

//Connect redux
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
