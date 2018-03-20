import React, { Component } from 'react'
import { Text, View, Image, ScrollView, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native'
import { DetailButton } from '../components/common'
import TrackList from '../components/TrackList'
import Stars from 'react-native-stars-rating'
const windowSize = Dimensions.get('window')
import axios from 'axios'

class AlbumDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      avgRating: '',
      tracklist: [],
      low: '',
      median: '',
      high: '',
    }
  }

  static navigationOptions = {
    drawerLabel: 'AlbumDetail',
    header: null
  }

  componentWillMount() {
    this.getPrices()
    this.getTrackList()
  }


  getTrackList = () => {
    const {item} = this.props.navigation.state.params
    const release_id = item.id

    const url = `https://api.discogs.com/releases/${release_id}`
    axios.get(url)
      .then(res => {
        console.log(res.data.tracklist, "Track list RESULT");
        this.setState({
          tracklist: res.data.tracklist,
          avgRating: res.data.community.rating.average,
          numForSale: res.data.num_for_sale
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  getPrices = () => {
    const { item, userData } = this.props.navigation.state.params
    const release_id = item.id
    AsyncStorage.multiGet(['oauth_token', 'oauth_secret']).then((values) => {
      const user_token = values[0][1]
      const user_secret = values[1][1]

        axios({method:'GET', url:`https://api.discogs.com/marketplace/price_suggestions/${release_id}`,
        headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':`OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_token="${user_token}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&${user_secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
        'User-Agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
       }
      })
      .then((response) => {
        this.setState({
          low: response.data['Good Plus (G+)'].value,
          median: response.data['Very Good Plus (VG+)'].value,
          high: response.data['Mint (M)'].value
        })

    })


        .catch( (error) => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
    })
  }


  render() {
    const {item, inCollection, inWantlist} = this.props.navigation.state.params
    const { avgRating, low, median, high, numForSale, tracklist } = this.state
    const roundedRating = Math.round( avgRating * 10 ) / 10
    const roundedMedian = !median ? 0 : median.toFixed(2)
    const roundedLow = !low ? 0 : low.toFixed(2)
    const roundedHigh = !high ? 0 : high.toFixed(2)
    const title = item.basic_information.title
    const artist = item.basic_information.artists[0].name
    const label = item.basic_information.labels[0].name
    const year = item.basic_information.year

    return (
      <View style={styles.detailScrollView}>

      <ScrollView contentContainerStyle={styles.scrollViewChild}>
        <View style={styles.imagesContainer}>
          <Image style={styles.backgroundImage} source={{
              uri: item.basic_information.cover_image
            }} blurRadius={1} resizeMode='cover'>
            <Image source={require('../img/album_gradient_BG.png')} resizeMode="cover" style={styles.album_gradient}>
              <View style={styles.infoContainer}>
                <Image source={{
                    uri: item.basic_information.cover_image
                  }} style={styles.detailThumb}></Image>
                <View style={{
                    width: 350,
                    marginBottom: 80
                  }}>
                  <Text numberOfLines={1} ellipsifyMode={'tail'} style={styles.detailTitle}>{title}</Text>
                  <Text style={styles.detailText}>{artist}</Text>
                  <Text style={styles.detailText}>{label}</Text>
                  <Text style={styles.detailText}>{year}</Text>
                </View>
              </View>
              <View style={styles.btnContainer}>
                <DetailButton btnStyle={inCollection === true ? styles.detailCollectionTrue : styles.detailCollectionBtnFalse} txtStyle={styles.btnCollText}>{inCollection === true ? "In Collection" : "Add to Collection"}</DetailButton>
                <DetailButton btnStyle={inWantlist === true ? styles.detailWantlistBtnTrue : styles.detailWantlistBtnFalse} txtStyle={styles.btnWantText}>{inWantlist === true ? "In Wantlist" : "Add to Wantlist"}</DetailButton>
              </View>
            </Image>
          </Image>
        </View>
        <View style={styles.midContainer}>
          <View style={styles.avgRatingContainer}>
            <Text style={styles.midTitle}>AVG. RATING</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.bigRate}>{roundedRating}</Text>
              <Text style={styles.littleRate}>/5</Text>
            </View>
            <View style={styles.starContainer}>
              <Text style={styles.rateAlbumTitle}>Rate Album</Text>
            <Stars isActive={true} rateMax={5} isHalfStarEnabled={true} onStarPress={(rating) => console.log(rating, roundedRating)} rate={!roundedRating ? 3 : roundedRating} size={30} color={'#F8E71C'}/>
            </View>
          </View>
          <View style={styles.midDivider}></View>
          <View style={styles.valueContainer}>
            <Text style={styles.midTitle}>MEDIAN VALUE</Text>
            <Text style={styles.median}>${roundedMedian}</Text>
            <View style={styles.lowHiContainer}>
              <View style={styles.lowContainer}>
                <Text style={styles.lowTitle}>Low</Text>
                <Text style={styles.loHiPrice}>${roundedLow}</Text>
              </View>
              <View style={styles.hiContainer}>
                <Text style={styles.lowTitle}>High</Text>
                <Text style={styles.loHiPrice}>${roundedHigh}</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.buyLinkContainer}>
                <Text style={styles.buyLink}>{numForSale}  for sale</Text>
                <Image source={require('../img/goto-icon.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.endDivider}></View>
          <TrackList
           tracklist={tracklist}
          />
      </ScrollView>
    </View>
  )
  }
}

const styles = {
  detailScrollView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    flexDirection: 'column'

  },
  midContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  lowContainer: {
    flexDirection: 'row'
  },
  lowHiContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  avgRatingContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  valueContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  median: {
    fontFamily: 'Lato-Regular',
    fontSize: 36,
    color: '#ffffff',
    lineHeight: 44,
    marginTop: 10
  },
  imagesContainer: {
    width: windowSize.width,
    height: windowSize.height,
    justifyContent: 'flex-end'
  },
  scrollViewChild: {},
  backgroundImage: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end'
  },
  album_gradient: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    justifyContent: 'flex-end'
  },
  bigRate: {
    fontFamily: 'Lato-Light',
    fontSize: 64,
    color: '#ffffff',
    lineHeight: 77
  },
  littleRate: {
    fontFamily: 'Lato-Light',
    fontSize: 24,
    color: '#666666',
    lineHeight: 77,
    marginTop: 16,
    marginLeft: 4
  },
  buyLink: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#F42E4A',
    lineHeight: 19,
    marginRight: 5

  },
  buyLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25
  },
  rateAlbumTitle: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    color: '#666666',
    lineHeight: 15,
    marginBottom: 5
  },
  lowTitle: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    color: '#666666',
    lineHeight: 15,
    marginBottom: 2
  },
  loHiPrice: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 19
  },
  lowContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 19
  },
  hiContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 19
  },
  starContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3
  },
  midDivider: {
    height: 204,
    width: 1,
    backgroundColor: '#666666',
    marginTop: -10
  },
  endDivider: {
    height: 1,
    width: 343,
    backgroundColor: '#666666',
    alignSelf: 'center',
    marginTop: 10
  },

  infoContainer: {
    justifyContent: 'flex-end'
  },
  detailThumb: {
    height: 208,
    width: 208,
    marginBottom: 5,
    marginLeft: 20
  },
  detailTitle: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 20,
    backgroundColor: 'transparent',
    fontFamily: 'Lato-Bold',
    lineHeight: 29
  },
  midTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: '#9B9B9B',
    lineHeight: 19,
    marginBottom: 5
  },
  detailText: {
    color: '#9B9B9B',
    marginLeft: 20,
    backgroundColor: 'transparent',
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    letterSpacing: 1,
    lineHeight: 24

  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    marginBottom: 45

  },
  btnCollText: {
    fontFamily: 'Lato-Regular',
    color: '#fff',
    backgroundColor: 'transparent',
    fontSize: 14,
    lineHeight: 15

  },
  btnWantText: {
    fontFamily: 'Lato-Regular',
    color: '#ffffff',
    backgroundColor: 'transparent',
    fontSize: 14,
    lineHeight: 15

  },
  detailCollectionBtnFalse: {
    borderWidth: 2,
    borderColor: '#0967EE',
    borderRadius: 1,
    height: 44,
    width: 165,
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailCollectionTrue: {
    borderWidth: 2,
    borderColor: '#0967EE',
    borderRadius: 1,
    height: 44,
    width: 165,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#0967EE"
  },
  detailWantlistBtnFalse: {
    borderWidth: 2,
    borderColor: '#D400FF',
    borderRadius: 1,
    height: 44,
    width: 165,
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailWantlistBtnTrue: {
    borderWidth: 2,
    borderColor: '#D400FF',
    borderRadius: 1,
    height: 44,
    width: 165,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#D400FF"

  },
  detailStaticTxt: {
    color: 'rgba(217,217,217,.35)',
    width: 90,
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    lineHeight: 18

  },
  detailDynTxt: {
    color: '#fff',
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 18
  },
  detailContain: {
    height: 32,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: .5,
    borderColor: 'rgba(217,217,217,.35)',
    justifyContent: 'flex-start',
    marginLeft: 17,
    marginRight: 17,
    marginBottom: 10

  },

}

export default AlbumDetail
