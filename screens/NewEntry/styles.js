import {StyleSheet} from 'react-native'

export default styles = StyleSheet.create({
  containerIos: {
    flex: 1,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15
  },
  containerAndroid: {
    flex: 1,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    height: '100%'
  },
  textIos: {
    color: '#818181',
    width: '50%',
    fontFamily: 'regular',
    fontSize: 16
  },
  textAndroid: {
    color: '#818181',
    width: '50%',
    fontFamily: 'regular',
    fontSize: 16
  },
  itemAndroid: {
    marginBottom: 1
  },
  itemIos: {
    marginBottom: 10
  },
  drawsAndroid: {
    marginTop: 5,
    height: 30,
    padding: 0,
    fontSize: 15,
    elevation: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingLeft: 5
  },
  drawsIos: {
    marginTop: 5,
    height: 30,
    fontSize: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    borderRadius: 5,
    paddingLeft: 5,
    backgroundColor: '#fff'
  },
  reasonAndroid: {
    marginTop: 5,
    height: 42,
    fontSize: 15,
    borderRadius: 5,
    elevation: 1,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#fff'
  },
  reasonIos: {
    marginTop: 5,
    height: 42,
    fontSize: 15,

    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5
  },
  circumstancesAndroid: {
    marginTop: 5,
    height: 60,
    fontSize: 15,
    borderRadius: 5,
    elevation: 1,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#fff'
  },
  circumstancesIos: {
    marginTop: 5,
    height: 60,
    fontSize: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#fff'
  },
  thoughtsAndroid: {
    marginTop: 5,
    height: 60,
    fontSize: 15,
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    elevation: 1,
    backgroundColor: '#fff'
  },
  thoughtsIos: {
    marginTop: 5,
    height: 60,
    fontSize: 15,
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#fff'
  },
  saveTitleAndroid: {
    fontFamily: 'regular',
    fontSize: 15,
    textTransform: 'uppercase'
  },
  saveTitleIos: {
    fontFamily: 'regular',
    fontSize: 15,
    textTransform: 'uppercase'
  },
  saveButtonAndroid: {
    width: 200,
    height: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#527578',
    elevation: 2
  },
  saveButtonIos: {
    width: 200,
    height: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#527578',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderRadius: 5
  }
})
