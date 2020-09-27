import {StyleSheet, Dimensions} from 'react-native'
import colors from './colors'

const width = Dimensions.get('window').width

const bulletPercentage = Math.trunc((30 / width) * 100)
const bulletSize = (width / 100) * bulletPercentage

const bulletsPercentage = Math.trunc((132 / width) * 100)
const bulletsSize = (width / 100) * bulletsPercentage

const absPosition = width / 2 - bulletsSize / 2

const introLogoPercentage = Math.trunc((120 / width) * 100)
const introLogoWidth = (width / 100) * introLogoPercentage

const introImgPercentage = Math.trunc((256 / width) * 100)
const intrImgWidth = (width / 100) * introImgPercentage

const buttonPercentage = Math.trunc((48 / width) * 100)
const buttonWidth = (width / 100) * buttonPercentage

const badgeHeight = (width / 100) * 40

export default StyleSheet.create({
  bg: {
    backgroundColor: colors.tabIconDefault,
  },
  button: {
    backgroundColor: colors.buttonDefault,
    width: '100%',
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  buttonIos: {
    backgroundColor: colors.buttonDefault,
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    width: '100%',
  },
  buttonDisabled: {
    backgroundColor: colors.buttonDisabled,
  },
  buttonText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 15,
    textTransform: 'uppercase',
    fontFamily: 'bold',
  },
  buttonTransparent: {
    backgroundColor: colors.tabIconDefault,
    borderColor: colors.gray,
    borderWidth: 1,
  },
  buttonBorder: {
    borderRadius: 4,
    borderColor: colors.gray,
  },
  marginAuto: {
    margin: 'auto',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flex: 1,
  },
  logo: {
    width: 120,
    height: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.lightgray,
    color: colors.contrast,
    width: '60%',
    fontSize: 16,
    height: 30,
    paddingTop: 4,
    backgroundColor: colors.background,
  },
  errorInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.gray,
    color: colors.contrast,
    width: '60%',
    paddingTop: 4,
    fontSize: 16,
    height: 30,
    backgroundColor: colors.errorText,
  },
  error: {
    borderBottomWidth: 1,
    borderColor: colors.errorText,
    width: '60%',
    fontSize: 16,
    height: 30,
    paddingTop: 4,
    backgroundColor: colors.background,
  },
  errorText: {
    color: colors.errorText,
    textTransform: 'uppercase',
    fontSize: 12,
    width: '60%',
    fontFamily: 'light',
  },
  invisError: {
    color: colors.background,
    fontSize: 12,
    width: '60%',
    fontFamily: 'light',
    marginBottom: 5,
  },
  label: {
    color: colors.lightgray,
    textTransform: 'uppercase',
    fontSize: 12,
    width: '60%',
    fontFamily: 'light',
  },
  errorLabel: {
    color: colors.errorText,
    fontSize: 12,
    fontFamily: 'regular',
    marginBottom: 5,
  },
  forgotButton: {
    backgroundColor: 'transparent',
    height: 20,
    marginTop: -10,
    marginBottom: 20,
  },
  forgotText: {
    color: colors.buttonDefault,
    fontFamily: 'regular',
  },
  signUp: {
    marginTop: 20,
    alignItems: 'center',
  },
  skip: {
    color: colors.buttonDefault,
    textTransform: 'uppercase',
    fontSize: 15,
    fontFamily: 'regular',
  },
  headings: {
    color: colors.lightContrast,
    fontSize: 15,

    fontFamily: 'regular',
  },
  continue: {
    width: '50%',
    alignItems: 'center',
  },
  homeHeading: {
    fontSize: 17,
    fontFamily: 'regular',
    alignItems: 'center',
    color: colors.contrast,
  },
  homeHeadingInvis: {
    display: 'none',
  },
  truthsWrapper: {
    flexDirection: 'row',
    width: '89%',
  },
  truths: {
    fontSize: 16,
    fontFamily: 'regular',
    marginBottom: 15,
  },
  homeRegisterIos: {
    fontSize: 15,
    fontFamily: 'regular',
    textAlign: 'center',
    color: colors.warningText,
  },
  homeRegisterAndroid: {
    fontSize: 15,
    fontFamily: 'regular',
    textAlign: 'center',
    color: colors.warningText,
  },
  homeRegisterInvisIos: {
    display: 'none',
  },
  homeRegisterInvisAndroid: {
    display: 'none',
  },
  homeCardInvisIos: {
    display: 'none',
  },
  homeCardInvisAndroid: {
    display: 'none',
  },
  homeCardIos: {
    width: '90%',
    marginBottom: 10,
    borderColor: colors.contrast,
    borderWidth: 1,
    borderRadius: 5,
    height: '10%',
    justifyContent: 'center',
    backgroundColor: colors.warningBackground,
    paddingLeft: 5,
    paddingRight: 5,
  },
  homeCardAndroid: {
    width: '90%',
    marginBottom: 10,
    borderColor: colors.contrast,
    borderWidth: 1,
    borderRadius: 5,
    height: '10%',
    justifyContent: 'center',
    backgroundColor: colors.warningBackground,
    paddingLeft: 2,
    paddingRight: 2,
  },
  tips: {
    fontSize: 17,
    fontFamily: 'regular',
    marginBottom: 10,
    width: '90%',
    textAlign: 'center',
  },
  registerButtonAndroid: {
    backgroundColor: colors.noticeBackground,
    width: '50%',
    borderRadius: 5,
    elevation: 2,
  },
  registerButtonIos: {
    backgroundColor: colors.noticeBackground,
    width: 150,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  logoutButtonAndroid: {
    backgroundColor: colors.tabIconDefault,
    width: '50%',
    borderRadius: 5,
    elevation: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 5,
  },
  logoutButtonIos: {
    backgroundColor: colors.tabIconDefault,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 5,
  },
  loginText: {
    fontSize: 17,
    fontFamily: 'regular',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: colors.gray,
  },
  registerText: {
    fontSize: 15,
    fontFamily: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  addiction: {
    width: '89%',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 16,
    fontFamily: 'regular',
    marginBottom: 50,
    lineHeight: 25,
  },
  addictionsAndroid: {
    backgroundColor: colors.tabIconDefault,
    width: '70%',
    height: 50,
    elevation: 2,
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
  },
  addictionsIos: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    backgroundColor: colors.tabIconDefault,
    width: '70%',
    height: 50,
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
  },
  addictionsText: {
    fontSize: 17,
    fontFamily: 'regular',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: colors.contrast,
  },
  heading: {
    fontSize: 17,
    fontFamily: 'regular',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: colors.contrast,
    marginBottom: 10,
  },
  divider: {
    backgroundColor: colors.divider,
    height: 1,
  },
  chapterActive: {
    backgroundColor: colors.noticeText,
    flexDirection: 'row',
    height: '16%',
    borderRadius: 5,
    marginBottom: 6,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  chapterDisabled: {
    flexDirection: 'row',
    height: '16%',
    marginBottom: 6,
    borderRadius: 5,
  },
  view: {
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'space-evenly',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textwrap: {
    display: 'flex',
    width: '80%',
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  text: {
    width: 222,
    fontSize: 17,
    color: colors.contrast,
    fontFamily: 'regular',
  },
  icon: {
    width: 50.5,
    height: 50,
  },
  headingTitle: {
    backgroundColor: colors.errorText,
  },
  name: {
    fontFamily: 'regular',
    fontSize: 17,
    color: colors.contrast,
  },
  exerciseName: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 25,
  },
  exerciseWrapper: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  exerciseText: {
    fontFamily: 'regular',
    fontSize: 16,
    lineHeight: 25,
    color: colors.lightContrast,
  },
  exerciseImage: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    height: 100,
    width: 100,
  },
  itemWrapper: {
    width: '90%',
    marginBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  chemicalName: {
    color: colors.contrast,
    fontSize: 16,
    width: 200,
    fontFamily: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 2,
  },
  chemicalDescription: {
    color: colors.contrast,
    fontSize: 16,
    fontFamily: 'regular',
    textTransform: 'lowercase',
  },
  typeName: {
    fontSize: 17,
    fontFamily: 'bold',
    marginBottom: 5,
  },
  typeDescription: {
    fontSize: 16,
    fontFamily: 'regular',
    color: colors.contrast,
    lineHeight: 25,
  },
  dropdownAndroid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    width: '65%',

    borderRadius: 5,
    marginTop: -5,
    marginBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: colors.tabIconDefault,
    elevation: 2,
  },
  dropdownIos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    width: '60%',

    borderRadius: 5,
    marginTop: -5,
    marginBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: colors.tabIconDefault,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  dropdownButton: {
    backgroundColor: colors.transparent,
    paddingTop: 6,
  },
  dropdownText: {
    color: colors.gray,
    fontSize: 14,
    marginTop: -2,
    fontFamily: 'regular',
  },
  arrowDown: {
    marginRight: 5,
    width: 12,
    height: 7,
  },
  overlayWrapper: {
    height: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  selectOption: {
    color: colors.contrast,
    fontFamily: 'regular',
    fontSize: 17,
    height: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  cover1: {
    width: 10,
    height: 270,
    position: 'absolute',
    backgroundColor: 'white',
    top: 40,
    left: 7,
    zIndex: 5,
  },
  cover2: {
    width: 11,
    height: 270,
    position: 'absolute',
    backgroundColor: 'white',
    top: 40,
    right: 6,
    zIndex: 5,
  },
  groupWrapper: {
    width: '100%',
    height: '75%',
    marginBottom: 10,
    justifyContent: 'center',
  },
  selectButton: {
    backgroundColor: '#fff',
    height: 35,
    width: 100,
    bottom: -3,
    elevation: 2,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  selectButtonText: {
    fontFamily: 'regular',
    color: colors.noticeBackground,
    textTransform: 'uppercase',
    fontSize: 14,
  },
  buttonGroup: {
    flexDirection: 'column',
    marginTop: 'auto',
    marginBottom: 'auto',
    alignContent: 'space-around',
    height: '100%',
    borderColor: colors.transparent,
  },
  buttonStyle: {
    borderColor: colors.transparent,
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  selectedButton: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#818181',
    backgroundColor: 'cornsilk',
  },
  selectedText: {
    color: colors.contrast,
    fontSize: 16,
    fontFamily: 'regular',
  },
  textStyle: {
    color: '#818181',
    fontFamily: 'regular',
  },
  completion: {
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'regular',
    color: '#C7C7C7',
    fontSize: 15,
  },
  result: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: colors.lightContrast,
    fontFamily: 'regular',
    fontSize: 17,
    lineHeight: 20,
  },
  points: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'regular',
    fontSize: 17,
    color: colors.contrast,
    lineHeight: 20,
    marginTop: 20,
    marginBottom: 35,
  },
  plusButton: {
    width: buttonWidth,
    height: buttonWidth,
    borderRadius: 25,
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 2,
    backgroundColor: colors.buttonDefault,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textIos: {
    marginTop: 300,
    fontSize: 16,
    color: colors.lightgray,
    fontFamily: 'regular',
    textAlign: 'center',
  },
  textAndroid: {
    marginTop: '60%',
    fontSize: 16,
    color: colors.lightgray,
    fontFamily: 'regular',
    textAlign: 'center',
  },
  dateWrapper: {
    width: '27%',
    marginTop: 'auto',
    marginBottom: 'auto',
    height: 50,
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 200,
    position: 'relative',
    backgroundColor: colors.background,
  },
  entry: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    flexDirection: 'row',
    height: 50,
    borderRadius: 5,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: colors.noticeText,
  },
  nameWrapper: {
    width: '70%',
  },
  descr: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '5%',
    fontSize: 15,
    color: '#818181',
    fontFamily: 'regular',
    color: colors.lightContrast,
  },
  containerIos: {
    flex: 1,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
  },
  containerAndroid: {
    flex: 1,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
  },
  entryTextIos: {
    color: '#818181',
    width: '50%',
    fontFamily: 'regular',
    fontSize: 16,
  },
  entryTextAndroid: {
    color: '#818181',
    width: '50%',
    fontFamily: 'regular',
    fontSize: 16,
  },
  itemAndroid: {
    marginBottom: 1,
    backgroundColor: '#000',
  },
  itemIos: {
    marginBottom: 10,
  },
  drawsAndroid: {
    marginTop: 5,

    padding: 0,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 1,
    borderColor: '#A1A1A1',
    paddingLeft: 5,
  },
  drawsIos: {
    marginTop: 5,
    height: 30,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#A1A1A1',
    paddingLeft: 5,
  },
  reasonAndroid: {
    marginTop: 5,
    height: 69,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#A1A1A1',
    paddingLeft: 5,
    paddingRight: 5,
  },
  reasonIos: {
    marginTop: 5,
    height: 69,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#A1A1A1',
    paddingLeft: 5,
    paddingRight: 5,
  },
  circumstancesAndroid: {
    marginTop: 5,
    height: 85,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#A1A1A1',
    paddingLeft: 5,
    paddingRight: 5,
  },
  circumstancesIos: {
    marginTop: 5,
    height: 85,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#A1A1A1',
    paddingLeft: 5,
    paddingRight: 5,
  },
  thoughtsAndroid: {
    marginTop: 5,
    height: 103,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#A1A1A1',
    paddingLeft: 5,
    paddingRight: 5,
  },
  thoughtsIos: {
    marginTop: 5,
    height: 103,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#A1A1A1',
    paddingLeft: 5,
    paddingRight: 5,
  },
  saveTitleAndroid: {
    fontFamily: 'regular',
    fontSize: 15,
  },
  saveTitleIos: {
    fontFamily: 'regular',
    fontSize: 15,
  },
  saveButtonAndroid: {
    width: 200,
    height: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#527578',
  },
  saveButtonIos: {
    width: 200,
    height: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#527578',
  },
  rowWrapper: {
    flexDirection: 'row',
    alignContent: 'flex-end',
    marginBottom: 10,
  },
  entryText: {
    color: '#A1A1A1',
    width: '50%',
    fontFamily: 'regular',
    fontSize: 16,
  },
  amount: {
    color: colors.lightContrast,
    width: '50%',
    textAlign: 'right',
    fontFamily: 'regular',
    fontSize: 15,
  },
  description: {
    color: '#707070',
    fontFamily: 'regular',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  delete: {
    marginTop: 30,
  },
  timestamp: {
    textAlign: 'right',
    fontFamily: 'regular',
    color: '#A1A1A1',
  },
  date: {
    textAlign: 'right',
    fontFamily: 'regular',
    color: '#A1A1A1',
  },
  deleteButtonIos: {
    backgroundColor: colors.tabIconDefault,
    marginLeft: 'auto',
    marginRight: 'auto',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: colors.tabIconDefault,
    borderColor: '#A1A1A1',
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    elevation: 2,
    borderRadius: 5,
  },
  deleteText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 15,
    textTransform: 'uppercase',
    fontFamily: 'bold',
    color: '#A1A1A1',
  },
  hintText: {
    textAlign: 'center',
    fontFamily: 'regular',
    marginLeft: 10,
    color: colors.errorText,
  },
  addictionsContainer: {
    width: '100%',
    paddingTop: 10,
  },
  icebreaker: {
    height: 150,
    width: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  icebreakerBadge: {
    width: 150,
    height: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  savant: {
    width: 110,
    height: 110,
    marginLeft: 15,
    marginRight: 20,
  },
  savantBadge: {
    margin: 'auto',
    width: 110,
    height: 110,
  },
  comedian: {
    width: 110,
    height: 110,
    marginLeft: 15,
    marginRight: 25,
  },
  comedianBadge: {
    margin: 'auto',
    width: 110,
    height: 110,
  },
  transformer: {
    width: 120,
    height: 120,
    marginLeft: 15,
    marginRight: 15,
  },
  transformerBadge: {
    margin: 'auto',
    width: 120,
    height: 120,
  },
  awaken: {
    width: 135,
    height: 135,
    marginRight: 10,
    marginLeft: 15,
  },
  awakenBadge: {
    margin: 'auto',
    width: 135,
    height: 135,
  },
  textwrapper: {
    width: '60%',
  },
  paralysisText: {
    width: '80%',
    textAlign: 'center',
    color: '#818181',
    fontFamily: 'regular',
    fontSize: 15,
    lineHeight: 20,
  },
  empty: {
    height: '95%',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    fontFamily: 'regular',
  },
  emptyText: {
    textAlign: 'center',
    color: '#818181',
    fontFamily: 'regular',
    fontSize: 16,
    lineHeight: 20,
  },
  chemicals: {
    fontFamily: 'regular',
    fontSize: 16,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 15,
    color: colors.contrast,
  },
  dateWrap: {
    marginBottom: 10,
  },
  resultDate: {
    fontFamily: 'regular',
    fontSize: 19,
    color: colors.tabIconDefault,
  },
  textView: {
    height: 40,
    marginTop: '30%',
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  incorrectAndroid: {
    width: '70%',
    marginTop: 20,
    height: 35,
  },
  incorrectIos: {
    width: '70%',
    justifyContent: 'center',
    backgroundColor: 'red',
    height: 50,
  },
  incorrectTextIos: {
    fontFamily: 'light',
    textAlign: 'center',
    color: colors.errorText,
    fontSize: 14,
  },
  incorrectTextAndroid: {
    fontFamily: 'light',
    color: colors.errorText,
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
  },
  incorrectTextInvisAndroid: {
    fontFamily: 'light',
    color: '#fcfaf8',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
  },
  incorrectTextInvisIos: {
    fontFamily: 'light',
    textAlign: 'center',
    color: '#fcfaf8',
    fontSize: 14,
  },
  algorithmButton: {
    backgroundColor: colors.noticeText,
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    width: 250,
  },
  algorithmButtonIos: {
    backgroundColor: colors.noticeText,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    width: 250,
  },
  algorithmButtonAndroid: {
    backgroundColor: colors.noticeText,
    borderRadius: 4,
    elevation: 2,
    width: 250,
  },
  placeButtonText: {
    color: colors.lightgray,
    fontFamily: 'regular',
    textTransform: 'uppercase',
  },
  algorithmTextIos: {
    fontFamily: 'regular',
    color: colors.lightContrast,
    fontSize: 17,
  },
  algorithmTextAndroid: {
    fontFamily: 'regular',
    color: colors.lightContrast,
    fontSize: 17,
    textAlign: 'left',
  },
  nameTextIos: {
    fontFamily: 'regular',
    color: colors.lightContrast,
    fontSize: 20,
  },
  nameTextAndroid: {
    fontFamily: 'regular',
    color: colors.lightContrast,
    fontSize: 20,
  },
  nameTextWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  iconWrap: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCheckWrap: {
    height: 50,
    width: 50,
    backgroundColor: 'red',
  },
  iconCheck: {
    color: colors.buttonDefault,
  },
  iconUncheck: {
    color: colors.lightgray,
  },
  reset: {
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 40,
    marginBottom: 6,
    borderRadius: 5,
    backgroundColor: colors.tabIconDefault,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  resetText: {
    fontFamily: 'regular',
    textTransform: 'uppercase',
    color: colors.buttonDisabled2,
  },
  modalHeader: {
    fontFamily: 'regular',
    fontSize: 18,
    textAlign: 'center',
  },
  resetWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoutWrapper: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  yes: {
    width: 100,
    marginRight: 10,
    backgroundColor: 'grey',
  },
  yesText: {
    fontFamily: 'regular',
    textTransform: 'uppercase',
    fontSize: 16,
  },
  no: {
    width: 100,
    backgroundColor: '#527578',
  },
  noText: {
    fontFamily: 'regular',
    textTransform: 'uppercase',
    fontSize: 16,
  },
  textWrapper: {
    flex: 0.95,
  },
  overlayView: {
    justifyContent: 'space-between',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  resetYes: {
    width: 100,

    marginRight: 10,
    backgroundColor: 'crimson',
  },
  resetNo: {
    width: 100,
    backgroundColor: '#527578',
  },
  listItem: {
    fontFamily: 'regular',
    fontSize: 16,
    marginTop: -10,
    marginLeft: 30,
    color: colors.buttonDefault,
  },
  resetHeading: {
    textAlign: 'center',
    fontFamily: 'regular',
    fontSize: 17,
    marginTop: -5,
  },
  finalWarning: {
    textAlign: 'center',
    fontFamily: 'regular',
    fontSize: 18,
    marginTop: -10,
    width: '95%',
  },
  inputName: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    marginTop: 10,
    height: 40,
    marginLeft: 5,
    paddingLeft: 10,
  },
  passwordWrapper: {
    marginTop: 5,
    width: '90%',
    marginLeft: 10,
  },
  password: {
    textAlign: 'center',
    fontSize: 12,
  },
  iconBadge: {
    backgroundColor: colors.errorText,
    borderWidth: 0.5,
    borderColor: colors.tabIconDefault,
    borderRadius: 20,
    height: 10,
    width: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 3,
    top: 3,
  },
  iconBadgeText: {
    fontFamily: 'regular',
    color: colors.tabIconDefault,
    fontSize: 8,
    marginTop: -0.5,
  },
  algorithmIos: {
    backgroundColor: colors.noticeText,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
  algorithmAndroid: {
    backgroundColor: colors.noticeText,
    elevation: 2,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
  stat: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 30,
    flexBasis: '33%',
    flex: 1,
    maxWidth: '33%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  statText: {
    width: '100%',
    textAlign: 'left',
    fontSize: 20,
  },
  statHold: {
    width: '100%',
    marginBottom: 8,
  },
  statLabel: {
    width: '100%',
    textAlign: 'left',
    fontSize: 11,
    fontWeight: '600',
    paddingTop: 5,
  },
  slide: {
    height: '100%',
    width: width,
  },
  slideText: {
    width: '100%',
    textAlign: 'left',
    fontSize: 20,
  },
  statsHead: {
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  bullets: {
    width: '30%',
    marginBottom: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  bullet: {
    fontSize: bulletSize,
  },
  introLogoWrapper: {
    height: '65%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  introLogo: {
    width: introLogoWidth,
    height: introLogoWidth,
  },
  heading01: {
    marginTop: 5,
    fontFamily: 'regular',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: colors.introText,
  },
  heading02: {
    marginTop: 5,
    fontFamily: 'regular',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: colors.introText,
  },
  heading03: {
    marginTop: 5,
    fontFamily: 'regular',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: colors.introText,
  },
  heading04: {
    marginTop: 5,
    fontFamily: 'regular',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: colors.introText,
  },
  swipe: {
    position: 'absolute',
    bottom: 10,
    width: bulletsSize,
    left: absPosition,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'regular',
    fontSize: 15,
    color: colors.divider,
  },
  introImg: {
    width: intrImgWidth,
    height: intrImgWidth,
  },
  skeep: {
    height: '10%',
    width: '95%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  skipText: {
    textAlign: 'right',
    fontFamily: 'regular',
    color: colors.divider,
  },
  authWrapper: {
    justifyContent: 'flex-end',
    height: '100%',
    alignItems: 'center',
    paddingBottom: 15,
  },
  tip: {
    fontFamily: 'light',
    textAlign: 'center',
    color: colors.lightContrast,
    marginBottom: 10,
  },
  disclaimer: {
    fontFamily: 'light',
    textAlign: 'center',
    color: colors.gray,
    fontSize: 13,
  },
  activeText: {
    fontFamily: 'regular',
    fontSize: 16,
    color: colors.lightContrast,
  },
  disabledText: {
    fontFamily: 'regular',
    fontSize: 16,
    color: colors.gray,
  },
  exerciseWrapperActive: {
    backgroundColor: colors.noticeText,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
    height: 50,
    borderRadius: 5,
    marginBottom: 5,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  exerciseWrapperDisabled: {
    backgroundColor: colors.background,

    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
    height: 50,
    marginBottom: 5,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  nameActive: {
    fontSize: 15,
    fontFamily: 'regular',
    color: colors.lightContrast,
  },
  nameDisabled: {
    fontSize: 15,
    fontFamily: 'regular',
    color: colors.gray,
  },
  noDiary: {
    fontFamily: 'regular',
    fontSize: 16,
    textAlign: 'center',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: colors.gray,
    alignSelf: 'center',
  },
  noDiaryWrapper: {},
  errorMessage: {
    marginBottom: 10,
    fontFamily: 'regular',
    color: colors.errorText,
  },
  errorMessageInvis: {
    marginBottom: 10,
    fontFamily: 'regular',
    color: colors.background,
  },
  badgeDescr: {
    fontSize: 16,
    fontFamily: 'regular',
    textAlign: 'center',
    color: colors.lightContrast,
  },
  crossButton: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 5,
    right: 5,
  },
  crossImage: {
    width: '100%',
    height: '100%',
  },
  crossX: {
    width: 15,
    height: 15,
  },
  moneyCounterText: {
    fontSize: 40,
    color: colors.lightContrast,
    fontFamily: 'bold',
  },
  counterStart: {
    width: 150,
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    backgroundColor: colors.buttonDefault,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    height: 40,
  },
  counterText: {
    fontSize: 15,
    textTransform: 'uppercase',
    fontFamily: 'regular',
    color: colors.noticeText,
  },
  inputsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  counterInput: {
    height: 30,
    borderBottomWidth: 1,
    width: '85%',
  },
  bulletWrapper: {
    width: 15,
    height: 15,

    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderWrapper: {
    height: 40,
    justifyContent: 'center',
  },
  labelWrapper: {
    height: 20,
    width: '60%',
  },
  counterReset: {
    width: 150,
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    backgroundColor: colors.background,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    height: 40,
  },
  counterTextReset: {
    fontSize: 15,
    textTransform: 'uppercase',
    color: colors.lightContrast,
    fontFamily: 'regular',
  },
  counterLabelWrapper: {
    height: 25,
    width: '85%',
  },
  profit: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',

    width: '90%',
    borderRadius: 10,
    backgroundColor: colors.noticeText,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  agreeWrapper: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: 10,
  },
  agree: {
    fontFamily: 'regular',
    color: colors.gray,
    fontSize: 14,
    textAlign: 'center',
  },
  link: {
    fontFamily: 'regular',
    color: colors.links,
    fontSize: 14,
  },
  privacyHeading: {
    fontFamily: 'bold',
    color: colors.contrast,
    fontSize: 16,
  },
  privacyText: {
    fontFamily: 'regular',
    color: colors.lightContrast,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
  },
})