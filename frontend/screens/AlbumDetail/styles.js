import React from 'react';
import { Dimensions } from 'react-native';
const windowSize = Dimensions.get('window');

export const styles = {
  detailScrollView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    flexDirection: 'column',
  },
  backTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 35,
    marginLeft: 25,
  },
  backText: {
    color: '#fff',
    fontSize: 18,
  },
  midContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  lowContainer: {
    flexDirection: 'row',
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
    alignItems: 'center',
  },
  median: {
    fontFamily: 'Lato-Regular',
    fontSize: 36,
    color: '#ffffff',
    lineHeight: 44,
    marginTop: 10,
  },
  imagesContainer: {
    width: windowSize.width,
    height: windowSize.height,
    justifyContent: 'flex-end',
  },
  scrollViewChild: {},
  backgroundImage: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
  },
  album_gradient: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  },
  bigRate: {
    fontFamily: 'Lato-Light',
    fontSize: 64,
    color: '#ffffff',
    lineHeight: 77,
  },
  littleRate: {
    fontFamily: 'Lato-Light',
    fontSize: 24,
    color: '#666666',
    lineHeight: 77,
    marginTop: 16,
    marginLeft: 4,
  },
  buyLink: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#F42E4A',
    lineHeight: 19,
    marginRight: 5,
  },
  buyLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  rateAlbumTitle: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    color: '#666666',
    lineHeight: 15,
    marginBottom: 5,
  },
  lowTitle: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    color: '#666666',
    lineHeight: 15,
    marginBottom: 2,
  },
  loHiPrice: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 19,
  },
  lowContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 19,
  },
  hiContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 19,
  },
  starContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
  midDivider: {
    height: 204,
    width: 1,
    backgroundColor: '#666666',
    marginTop: -10,
  },
  endDivider: {
    height: 1,
    width: 343,
    backgroundColor: '#666666',
    alignSelf: 'center',
    marginTop: 10,
  },

  infoContainer: {
    justifyContent: 'flex-end',
  },
  detailThumb: {
    height: 208,
    width: 208,
    marginBottom: 5,
    marginLeft: 20,
  },
  detailTitle: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 20,
    backgroundColor: 'transparent',
    fontFamily: 'Lato-Bold',
    lineHeight: 29,
  },
  midTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: '#9B9B9B',
    lineHeight: 19,
    marginBottom: 5,
  },
  detailText: {
    color: '#9B9B9B',
    marginLeft: 20,
    backgroundColor: 'transparent',
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    letterSpacing: 1,
    lineHeight: 24,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    marginBottom: 45,
  },
  btnCollText: {
    fontFamily: 'Lato-Regular',
    color: '#fff',
    backgroundColor: 'transparent',
    fontSize: 14,
    lineHeight: 15,
  },
  btnWantText: {
    fontFamily: 'Lato-Regular',
    color: '#ffffff',
    backgroundColor: 'transparent',
    fontSize: 14,
    lineHeight: 15,
  },
  detailCollectionBtnFalse: {
    borderWidth: 2,
    borderColor: '#0967EE',
    borderRadius: 1,
    height: 44,
    width: 165,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailCollectionTrue: {
    borderWidth: 2,
    borderColor: '#0967EE',
    borderRadius: 1,
    height: 44,
    width: 165,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0967EE',
  },
  detailWantlistBtnFalse: {
    borderWidth: 2,
    borderColor: '#D400FF',
    borderRadius: 1,
    height: 44,
    width: 165,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailWantlistBtnTrue: {
    borderWidth: 2,
    borderColor: '#D400FF',
    borderRadius: 1,
    height: 44,
    width: 165,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D400FF',
  },
  detailStaticTxt: {
    color: 'rgba(217,217,217,.35)',
    width: 90,
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    lineHeight: 18,
  },
  detailDynTxt: {
    color: '#fff',
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 18,
  },
  detailContain: {
    height: 32,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(217,217,217,.35)',
    justifyContent: 'flex-start',
    marginLeft: 17,
    marginRight: 17,
    marginBottom: 10,
  },
};
