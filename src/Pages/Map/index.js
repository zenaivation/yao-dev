import React, { Component, Fragment } from 'react';
import ReactMapGL from 'react-map-gl';
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import Slider from "react-slick";
import { getPlaces, saveBookmark } from "../../actions/index";



import { Navigation, MapSlider, PopupPlace } from '../../components';
import BigMarker from '../../images/big-marker.png';
import MiddleMarker from '../../images/middle-marker.png';
import SmallMarker from '../../images/small-marker.png';
import CenterButtonIcon from '../../images/toMap.png';



const key = 'AIzaSyC48nPNoUEt9PuHq3IAOSfUZ-SPjbKksMk';


const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiemVubm9icnVpbnNtYSIsImEiOiJjanFxcms5ajYwNXFxNDhsajlob3Qxd2cxIn0.5WXfFyF1RWuwdC9cpSx0Kg"
});

const settings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 2
};

const opacityStyles = {
  opacity: '0.5',
}

class Explore extends Component {

  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      lat: '',
      lon: '',
      activePlace: {},
      fromSearch: false,
      bookmarkFilled: false
    }
    this.openPopup = this.openPopup.bind(this);
  }


  componentDidMount() {

    if (this.props.location.state) {
      this.setState({
        fromSearch: true
      })
    }

    if (this.state.fromSearch) {
      this.setState({
        lat: this.props.location.state.searchLoc.lat,
        lon: this.props.location.state.searchLoc.lng
      })
      this.props.getPlaces(this.props.location.state.searchLoc.lat, this.props.location.state.searchLoc.lng);
    }

    if (!this.state.fromSearch) {
      navigator.geolocation.getCurrentPosition(function (location) {
        this.setState({
          lat: location.coords.latitude,
          lon: location.coords.longitude
        })
        this.props.getPlaces(this.state.lat, this.state.lon);
      }.bind(this))
    }

  }


  handleClosePopup = () => {
    this.setState({
      popup: false,
    })
  };

  openPopup = (marker) => {
    console.log(marker);
    this.setState({
      popup: true,
      activePlace: marker,
    })
  };

  saveBookmark = (obj) => {
    this.setState({
      bookmarkFilled: true
    })
    this.props.saveBookmark(obj);
    toast.success("Bookmark Succesfully saved !", {
      position: toast.POSITION.BOTTOM_CENTER
    });
  }

  centerButton = () => {
    alert('center');
  }

  render() {

    const { lat, lon, popup, activePlace, bookmarkFilled } = this.state;
    const { places } = this.props;

    const CenterButton = ({ onClick }) => (
      <div onClick={onClick} className="centerButton">
        <img src={CenterButtonIcon} alt="center" />
      </div>
    )

    const MapMarker = ({ rating, lat, long, onClick }) => {
      switch (true) {
        case rating >= 4.5:
          return (
            <Marker
              coordinates={[long, lat]}
              anchor="bottom"
              onClick={onClick}
            >
              <img src={BigMarker} />
            </Marker>
          );
        case rating >= 4.0:
          return (
            <Marker
              coordinates={[long, lat]}
              anchor="bottom"
              onClick={onClick}
            >
              <img src={MiddleMarker} />

            </Marker>
          );
        case rating <= 4.0:
          return (
            <Marker
              coordinates={[long, lat]}
              anchor="bottom"
              onClick={onClick}
            >
              <img src={SmallMarker} />
            </Marker>
          );
        default:
          return null;
      }
    }
    return (
      <Fragment>
        <div className="map-container">
          <Map
            style="mapbox://styles/zennobruinsma/cjrep70qt2l1l2so7yv57dgeh"
            containerStyle={{
              height: "100vh",
              width: "100vw"
            }}
            center={{ lng: lon, lat: lat }}
            zoom={[13]}>
            {places.map(place =>
              <MapMarker
                key={place.place_id}
                rating={place.rating}
                lat={place.geometry.location.lat}
                long={place.geometry.location.lng}
                onClick={() => this.openPopup(place)}
              />
            )}
          </Map>
          <CenterButton onClick={() => this.centerButton()} />
          <Slider {...settings}>
            {places.map(place =>
              <MapSlider
                key={place.place_id}
                title={place.name}
                // status={place.opening_hours.open_now}
                // image={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${key}`}
                onClick={() => this.openPopup(place)}
                style={popup ? { opacity: 0.2 } : {}}
              />
            )}
          </Slider>

          {popup ? (
            <PopupPlace
              // image={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${activePlace.photos[0].photo_reference}&key=${key}`}
              title={activePlace.name}
              description="Nulla sit amet est. Praesent vestibulum dapibus nibh. Phasellus dolor. Duis leo.Vivamus consectetuer hendrerit lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vivamus quis mi. Fusce ac felis sit amet ligula pharetra condimentum."
              onClick={this.handleClosePopup}
              onSaveBookmark={() => this.saveBookmark(activePlace)}
              bookmark={bookmarkFilled}
              name={activePlace.name}
            />
          ) : (
              <Fragment></Fragment>
            )
          }
        </div>
        <Navigation explore={true} />
      </Fragment >
    );
  }

}



function mapStateToProps(state) {
  return {
    places: state.places,
  };
}

export default connect(
  mapStateToProps,
  { getPlaces, saveBookmark }
)(Explore);