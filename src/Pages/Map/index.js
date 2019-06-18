import React, { Component, Fragment } from 'react';
import ReactMapGL from 'react-map-gl';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import Slider from 'react-slick';
import {
  getPlaces,
  saveBookmark,
  getSpottedByLocalsPlaces
} from '../../actions/index';

import { Navigation, MapSlider, PopupPlace } from '../../components';

import CenterButtonIcon from '../../images/center-icon.png';

const key = 'AIzaSyCm_boaMdggWKCv5MSJPdM3xTnGiuq_5zg';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiemVubm9icnVpbnNtYSIsImEiOiJjanFxcms5ajYwNXFxNDhsajlob3Qxd2cxIn0.5WXfFyF1RWuwdC9cpSx0Kg'
});

const opacityStyles = {
  opacity: '0.5'
};

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      lat: '',
      lon: '',
      activePlace: {},
      fromSearch: false,
      bookmarkFilled: false,
      activeSlide: 0,
      selectedPlace: {}
    };
    this.openPopup = this.openPopup.bind(this);
  }

  componentDidMount = () => {
    const { location } = this.props;
    this.props.getSpottedByLocalsPlaces(1);

    navigator.geolocation.getCurrentPosition(
      function(homeLocation) {
        this.setState({ currentLocation: homeLocation, homeLocation });
      }.bind(this)
    );

    if (location.state) {
      this.setState({
        fromSearch: true
      });
    }

    if (location.state && location.state.fromPlace) {
      const locationLat = location.state.fromPlace.geometry.location.lat;
      const locationLng = location.state.fromPlace.geometry.location.lng;
      this.setState({
        popup: true,
        activePlace: location.state.fromPlace,
        selectedPlace: location.state.fromPlace
      });

      navigator.geolocation.getCurrentPosition(
        function(homeLocation) {
          const midpointLat = (locationLat + homeLocation.coords.latitude) / 2;
          const midpointLng = (locationLng + homeLocation.coords.longitude) / 2;
          this.setState({
            lat: midpointLat,
            lon: midpointLng
          });
          this.props.getPlaces(locationLat, locationLng);
        }.bind(this)
      );
    }

    // if a location is set, fly to the midpoint between home and this
    // location, so both are within the bounds of the map.
    if (location.state && location.state.lat && location.state.lng) {
      navigator.geolocation.getCurrentPosition(
        function(homeLocation) {
          const midpointLat =
            (location.state.lat + homeLocation.coords.latitude) / 2;
          const midpointLng =
            (location.state.lng + homeLocation.coords.longitude) / 2;
          this.setState({
            lat: midpointLat,
            lon: midpointLng
          });
          this.props.getPlaces(location.state.lat, location.state.lng);
        }.bind(this)
      );
    } else {
      navigator.geolocation.getCurrentPosition(
        function(location) {
          this.setState({
            lat: location.coords.latitude,
            lon: location.coords.longitude
          });
          this.props.getPlaces(
            location.coords.latitude,
            location.coords.longitude
          );
        }.bind(this)
      );
    }
  };

  // if a location is set, fly to the midpoint between home and this
  // location, so both are within the bounds of the map.
  centerBetweenHomeAndPlace = () => {
    const { selectedPlace, homeLocation } = this.state;
    if (selectedPlace && selectedPlace.geometry) {
      const locationLat = selectedPlace.geometry.location.lat;
      const locationLng = selectedPlace.geometry.location.lng;
      const midpointLat = (locationLat + homeLocation.coords.latitude) / 2;
      const midpointLng = (locationLng + homeLocation.coords.longitude) / 2;
      this.setState({
        lat: midpointLat,
        lon: midpointLng
      });
    }
  };

  handleClosePopup = () => {
    this.setState({
      popup: false
    });
  };

  openPopup = marker => {
    this.setState({
      popup: true
      // activePlace: marker,
    });
  };

  saveBookmark = obj => {
    this.setState({
      bookmarkFilled: true
    });
    this.props.saveBookmark(obj);
    toast.success('Bookmark Succesfully saved !', {
      position: toast.POSITION.BOTTOM_CENTER
    });
  };

  centerButton = () => {
    navigator.geolocation.getCurrentPosition(
      function(location) {
        this.setState({
          lat: location.coords.latitude,
          lon: location.coords.longitude
        });
        this.props.getPlaces(this.state.lat, this.state.lon);
      }.bind(this)
    );
  };

  renderPopup = () => {
    const { activePlace, bookmarkFilled } = this.state;
    if (activePlace && activePlace.photos) {
      return (
        <PopupPlace
          image={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
            activePlace.photos[0].photo_reference
          }&key=${key}`}
          title={activePlace.name}
          description="Nulla sit amet est. Praesent vestibulum dapibus nibh. Phasellus dolor. Duis leo.Vivamus consectetuer hendrerit lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vivamus quis mi. Fusce ac felis sit amet ligula pharetra condimentum."
          onClick={this.handleClosePopup}
          onSaveBookmark={() => this.saveBookmark(activePlace)}
          bookmark={bookmarkFilled}
          name={activePlace.name}
        />
      );
    } else {
      return (
        <PopupPlace
          title={activePlace.name}
          description="Nulla sit amet est. Praesent vestibulum dapibus nibh. Phasellus dolor. Duis leo.Vivamus consectetuer hendrerit lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vivamus quis mi. Fusce ac felis sit amet ligula pharetra condimentum."
          onClick={this.handleClosePopup}
          onSaveBookmark={() => this.saveBookmark(activePlace)}
          bookmark={bookmarkFilled}
          name={activePlace.name}
        />
      );
    }
  };

  render() {
    const {
      lat,
      lon,
      popup,
      activePlace,
      bookmarkFilled,
      activeSlide
    } = this.state;
    const { places } = this.props;

    const settings = {
      dots: false,
      arrows: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,

      afterChange: current => {
        this.setState(
          {
            activeSlide: current,
            selectedPlace: places[current],
            activePlace: places[current]
          },
          () => {
            this.centerBetweenHomeAndPlace();
          }
        );
      }
    };

    const CenterButton = ({ onClick }) => (
      <div onClick={onClick} className="centerButton">
        <img src={CenterButtonIcon} alt="center" />
      </div>
    );

    const MapMarker = ({ rating, lat, lng, onClick, index }) => {
      switch (true) {
        case rating >= 4.5:
          return (
            <Marker coordinates={[lng, lat]} anchor="bottom" onClick={onClick}>
              <div
                className={
                  activeSlide === index
                    ? 'marker marker--big marker--active'
                    : 'marker marker--big'
                }
              >
                <p>{index + 1}</p>
              </div>
            </Marker>
          );
        case rating >= 4.0:
          return (
            <Marker coordinates={[lng, lat]} anchor="bottom" onClick={onClick}>
              <div
                className={
                  activeSlide === index
                    ? 'marker marker--middle marker--active'
                    : 'marker marker--middle'
                }
              >
                <p>{index + 1}</p>
              </div>
            </Marker>
          );
        case rating <= 4.0:
          return (
            <Marker coordinates={[lng, lat]} anchor="bottom" onClick={onClick}>
              <div
                className={
                  activeSlide === index
                    ? 'marker marker--small marker--active'
                    : 'marker marker--small'
                }
              >
                <p>{index + 1}</p>
              </div>
            </Marker>
          );
        default:
          return null;
      }
    };

    const HomeMarker = ({ lat, long }) => {
      return (
        <Marker coordinates={[long, lat]} anchor="bottom">
          <div className="marker marker--small marker--yourlocation" />
        </Marker>
      );
    };

    return (
      <Fragment>
        <div className="map-container">
          <Map
            style="mapbox://styles/zennobruinsma/cjrep70qt2l1l2so7yv57dgeh"
            containerStyle={{
              height: '100vh',
              width: '100vw'
            }}
            center={{ lng: lon, lat: lat }}
            zoom={[13]}
          >
            {places.map((place, i) => (
              <MapMarker
                key={place.venue.id}
                rating={4.3}
                lat={place.venue.location.lat}
                lng={place.venue.location.lng}
                onClick={() => this.openPopup(place)}
                index={i}
              />
            ))}
            {this.state.currentLocation && (
              <HomeMarker
                key={'home'}
                lat={this.state.currentLocation.coords.latitude}
                long={this.state.currentLocation.coords.longitude}
                index={9999}
              />
            )}
          </Map>
          <CenterButton onClick={() => this.centerButton()} />
          <Slider {...settings}>
            {places.map((place, i) => (
              <Fragment>
                {place.photos ? (
                  <MapSlider
                    key={place.venue.id}
                    title={place.venue.name}
                    // status={place.opening_hours.open_now}
                    image="https://via.placeholder.com/150"
                    onClick={() => this.openPopup(place)}
                    style={activeSlide + 1 === i ? 'marginTop: -20px' : null}
                    index={i}
                    className={
                      activeSlide + 1 === i ? 'sliderCard__active' : null
                    }
                  />
                ) : (
                  <MapSlider
                    key={place.place_id}
                    title={place.venue.name}
                    onClick={() => this.openPopup(place)}
                    style={activeSlide + 1 === i ? 'marginTop: -20px' : null}
                    index={i}
                    className={
                      activeSlide + 1 === i ? 'sliderCard__active' : 'testclass'
                    }
                  />
                )}
              </Fragment>
            ))}
          </Slider>
          {popup ? this.renderPopup() : <Fragment />}
        </div>
        <Navigation explore={true} />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.places,
    isLoading: state.isLoading,
    spottedByLocalsPlaces: state.spottedByLocalsPlaces
  };
}

export default connect(
  mapStateToProps,
  { getPlaces, saveBookmark, getSpottedByLocalsPlaces }
)(Explore);
