import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import { Navigation, Header, BookmarkRow, SelectPref, SliderPref, Button } from '../../components';
import { savePrefrences } from '../../actions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodType: [
        {
          name: 'Vegan',
        },
        {
          name: 'Meat Lover',
        },
        {
          name: 'Vegatarian',
        }
      ],
      relationStatus: [
        {
          name: 'Single',
        },
        {
          name: 'Its complicated',
        },
        {
          name: 'Relationship',
        }
      ],
      mood: [
        {
          name: 'Busy',
        },
        {
          name: 'Relaxed',
        }
      ],
      myFoodtype: '',
      myRelationship: '',
      myMood: '',

    }
    this.handleSaveTypes = this.handleSaveTypes.bind(this);
  }

  componentDidMount() {
    this.props.savePrefrences();
    console.log(this.props.profilePref);
  }


  handleFoodTypeChange = (event) => {
    this.setState({
      myFoodtype: event.target.value
    })
  }

  handleRelationShipChange = (event) => {
    this.setState({
      myRelationship: event.target.value
    })
  }
  handleMoodChange = (event) => {
    this.setState({
      myMood: event.target.value
    })
  }

  handleSaveTypes() {
    const { myFoodtype, myRelationship, myMood } = this.state;
    const obj = { myFoodtype, myRelationship, myMood };
    this.props.savePrefrences(obj);
    toast.success("Succesfully saved !", {
      position: toast.POSITION.BOTTOM_CENTER
    });
  }

  render() {
    const { foodType, relationStatus, mood, myFoodtype, myRelationship, myMood } = this.state;
    if (this.props.profilePref) {
      console.log("profile pref", this.props.profilePref.myFoodtype);
    }
    const { profilePref } = this.props;
    return (
      <Fragment>
        <Header title="Profile" />
        <div className="profile">
          <div className="profile__content">
            <h2 className="boldH2 boldH2--black">Hey Jirka !</h2>
            <p className="P P--black">Fill in all your preferences to have the best restaurant matches</p>
          </div>
          <SelectPref label="Food type"
            list={foodType}
            value={myFoodtype}
            onChange={this.handleFoodTypeChange}
          />
          <SelectPref
            label="Relation status"
            list={relationStatus}
            value={myRelationship}
            onChange={this.handleRelationShipChange}
          />
          <SelectPref
            label="Mood"
            list={mood}
            value={myMood}
            onChange={this.handleMoodChange}
          />

          <div className="btn-container">
            <Button text="save" onClick={this.handleSaveTypes} />
          </div>
        </div>

        {profilePref ? (
          <div className="profile__table">
            <div className="profile__row">
              <p>Food type</p>
              <p>{profilePref.myFoodtype}</p>
            </div>
            <div className="profile__row">
              <p>Relationship status</p>
              <p>{profilePref.myRelationship}</p>
            </div>
            <div className="profile__row">
              <p>Mood preference</p>
              <p>{profilePref.myMood}</p>
            </div>
          </div>
        ) : (<div>
          <div className="profile__table">
            <div className="profile__row">
              <p>Food type</p>
              <p></p>
            </div>
            <div className="profile__row">
              <p>Relationship status</p>
              <p></p>
            </div>
            <div className="profile__row">
              <p>Mood preference</p>
              <p></p>
            </div>
          </div>
        </div>)}

        <Navigation profile={true} />


      </Fragment>
    );
  }

}

function mapStateToProps(state) {
  return {
    profilePref: state.profilePref,
  };
}

export default connect(
  mapStateToProps,
  { savePrefrences }
)(Profile); 