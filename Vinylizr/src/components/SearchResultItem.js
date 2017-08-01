import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Linking,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import fire from './fire.js'
import Swipeable from 'react-native-swipeable';
import { connect } from 'react-redux';

import { CardSection } from '../components/common/CardSection';
import { Button } from '../components/common/Button';
import {
  saveCollectionItem,
  fetchCollection,
} from '../actions/collection-action';
import {
  saveWantlistItem,
  fetchWantlist,
} from '../actions/wantlist-action';

class SearchResultItem extends Component {
constructor(props){
	super(props);
	this.state = {
    collectionRecordSaved: '',
    collectionRecord: [],
    wantlistRecordSaved: '',
    wantlistRecord: []
    };
}



  componentWillMount() {
    this.props.fetchCollection();
    this.props.fetchWantlist();
    this.checkCollectionForRecords();
    this.checkWantlistForRecords();
  }
  // componentDidMount() {
  //   this.saved();
  //
  // }

  checkCollectionForRecords() {
    let deezerRecord = this.props.album.cover;
    this.props.collection.collection.albums.map((collectionRecord) => {
      if (deezerRecord === collectionRecord) {
        console.log("already in collection");
        this.setState({collectionRecordSaved: "in collection"})
      } else if (!collectionRecord) {
        this.setState({collectionRecordSaved: '', collectionRecord: collectionRecord })
      }
    })
  }

  checkWantlistForRecords() {
    let deezerRecord = this.props.album.cover;
    this.props.wantlist.wantlist.albums.map((wantlistRecord) => {
      // console.log("DATABASE: ", wantlistRecord);
      if (deezerRecord === wantlistRecord) {
        console.log("already in wantlist");
        this.setState({wantlistRecordSaved: "in wantlist"})
      } else if (!wantlistRecord) {
        this.setState({wantlistRecordSaved: '', wantlistRecord: wantlistRecord })
      }
    })
  }

saveToCollection() {
  let deezerRecord = this.props.album.cover;
  this.props.saveCollectionItem(deezerRecord)
  this.setState({collectionRecordSaved: " in collection"})
  console.log(deezerRecord);
 }



saveToWantlist() {
  let deezerRecord = this.props.album.cover;
  this.props.saveWantlistItem(deezerRecord)
  this.setState({wantlistRecordSaved: " in wantlist"})
  console.log(deezerRecord);
}

beenThereDoneThat() {
  const smallWantlistIcon = require('../img/smallWantlistIcon.png');
  const smallCollectionIcon = require('../img/smallCollectionIcon.png');
  let collectionRecord = this.state.collectionRecordSaved;
  let wantlistRecord = this.state.wantlistRecordSaved;
  if (collectionRecord) {
    return (
      <Text
        style={styles.collectionSavedTextStyle}>
        <Image source={smallCollectionIcon} />  {collectionRecord}
      </Text>
    )
  } else if (wantlistRecord) {
return (
  <Text
    style={styles.wantlistSavedTextStyle}>
    <Image source={smallWantlistIcon} />  {wantlistRecord}
  </Text>
    )
  }
}


render() {
  const { album } = this.props;
  const { title, cover } = album;
  const {
    imageView,
    textView,
    imageStyle,
    titleTextStyle,
    artistTextStyle,
    collectionSavedTextStyle,
    wantlistSavedTextStyle
  } = styles;
  const wantListIcon = require('../img/wantlistButton.png');
  const collectionIcon = require('../img/collectionButton.png');

  const leftButtons = [
    <TouchableHighlight
      style={styles.leftButtons}>
      <Image style={styles.leftIconStyles} source={collectionIcon} />
    </TouchableHighlight>
  ];

  const rightButtons = [
    <TouchableHighlight
      style={styles.rightButtons}>
      <Image style={styles.rightIconStyles} source={wantListIcon} />
    </TouchableHighlight>
  ];



  return (

    <Swipeable
          leftButtons={leftButtons}
          leftButtonWidth={80}
          rightButtons={rightButtons}
          rightButtonWidth={80}
          leftActionActivationDistance={95}
          onLeftActionRelease={this.saveToCollection.bind(this)}
          rightActionActivationDistance={95}
          onRightActionRelease={this.saveToWantlist.bind(this)}
          onSwipeStart={() => this.setState({isSwiping: true})}
          onSwipeRelease={() => this.setState({isSwiping: false})}
    >
      <CardSection>
        <View style={imageView}>
          <Image
            style={imageStyle}
            source={{ uri: album.cover }}
          />
      </View>

      <View style={textView}>
          <Text style={titleTextStyle}>{album.title}</Text>
          <Text style={artistTextStyle}>{album.artist.name}</Text>
          {this.beenThereDoneThat()}

        </View>
      </CardSection>

    </Swipeable>
  );
}
};

const styles = {
  textView: {
    justifyContent: 'center',
    flex: 1
  },
  titleTextStyle: {
    fontSize: 20,
    color: "#DADADA",
    marginLeft: 10
  },
  artistTextStyle: {
    fontSize: 16,
    color: "rgba(217,217,217,.6)",
    marginLeft: 10,
    marginTop: 1
  },
  collectionSavedTextStyle: {
    color: '#2EF470',
    marginLeft: 12,
    marginTop: 9,
    fontSize: 10
  },
  wantlistSavedTextStyle: {
    color: '#F4702E',
    marginLeft: 12,
    marginTop: 9,
    fontSize: 10
  },
  imageStyle: {
    height: 85,
    width: 85
  },
  rightButtons: {
    backgroundColor: '#F4702E',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftButtons: {
    backgroundColor: '#2EF470',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftIconStyles: {
    alignSelf: 'flex-end',
    marginRight: 29
  },
  rightIconStyles: {
    alignSelf: 'flex-start',
    marginLeft: 29
  }
};
const mapStateToProps = (state) => {
    return {
      ...state
    }
}
// for click events so that dispatches can happen
const mapDispatchToProps = (dispatch) => {
    return {
      saveCollectionItem: (deezerRecord) => {
          dispatch(saveCollectionItem(deezerRecord))
      },
      saveWantlistItem: (deezerRecord) => {
          dispatch(saveWantlistItem(deezerRecord))
      },
      fetchCollection: () => {
          dispatch(fetchCollection())
      },
      fetchWantlist: () => {
          dispatch(fetchWantlist())
      },
    }
  }



export default connect(mapStateToProps, mapDispatchToProps)(SearchResultItem);
