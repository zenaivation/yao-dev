import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import Select from 'react-select';

import { Navigation, Header, SelectPref, Button } from '../../components';
import { savePrefrences } from '../../actions';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodType: [
        {
          label: 'Vegan',
          value: 'Vegan'
        },
        {
          label: 'Meat Lover',
          value: 'Meat Lover'
        },
        {
          label: 'Vegetarian',
          value: 'Vegetarian'
        },
        {
          label: 'Local',
          value: 'Local'
        },
        {
          label: 'Organic',
          value: 'Organic'
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
      selectedFood: null,
      selectedRelation: null,
      selectedPrice: null,
      selectedMood: null,


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

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
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
    const { foodType, relationStatus, mood, myFoodtype, myRelationship, myMood, selectedOption } = this.state;
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
          <div className="select">
            <label>Food type</label>
            <Select
              isMulti
              value={selectedOption}
              onChange={(selectedOption) => this.setState({ selectedFood: selectedOption })}
              options={foodType}
            />
          </div>
          <div className="select">
            <label>You are</label>
            <Select
              value={selectedOption}
              onChange={(selectedOption) => this.setState({ selectedRelation: selectedOption })}
              options={[{ value: 'A family', label: 'A family' },
              { value: 'Sole traveler', label: 'Sole traveler' },
              { value: 'Couple', label: 'Couple' }]}
            />
          </div>
          <div className="select">
            <label>Buget</label>
            <Select
              isMulti
              value={selectedOption}
              onChange={(selectedOption) => this.setState({ selectedPrice: selectedOption })}
              options={[
                { value: '$', label: '$' },
                { value: '$$', label: '$$' },
                { value: '$$$', label: '$$$' },
                { value: '$$$$', label: '$$$$' },
                { value: '$$$$$', label: '$$$$$' },
              ]}
            />
          </div>
          <div className="select">
            <label>Mood</label>
            <Select
              value={selectedOption}
              onChange={(selectedOption) => this.setState({ selectedMood: selectedOption })}
              options={[
                { value: 'Busy', label: 'Busy' },
                { value: 'Relaxed', label: 'Relaxed' },
              ]}
            />
          </div>

          {/* <SelectPref
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
          /> */}

          <div className="btn-container">
            <Button text="save" onClick={this.handleSaveTypes} />
          </div>
        </div>

        {/* {profilePref ? (
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
        </div>)} */}

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