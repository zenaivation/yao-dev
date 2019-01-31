import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Navigation, Header, BookmarkRow } from '../../components';

const key = 'AIzaSyC48nPNoUEt9PuHq3IAOSfUZ-SPjbKksMk';

const mapStateToProps = state => {
  return { bookmarks: state.bookmarks };
};

class Bookmark extends Component {

  render() {
    const { bookmarks } = this.props;

    const TotalBookmarks = () => (
      bookmarks.map(el => (
        <BookmarkRow
          key={el.place_id}
          title={el.name}
          image={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${el.photos[0].photo_reference}&key=${key}`}
        />
      ))
    )
    return (
      <Fragment>
        <Header title="Bookmarks" />
        <Fragment>
          {bookmarks.length
            ?
            (
              <TotalBookmarks />
            ) :
            (
              <div className="block-empty">
                <h2>No bookmarks yet...</h2>
              </div>
            )
          }
        </Fragment>
        <Navigation bookmark={true} />
      </Fragment >
    );
  }

}
const Bookmarks = connect(mapStateToProps)(Bookmark);


export default Bookmarks;
