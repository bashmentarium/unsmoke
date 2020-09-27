import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, Platform} from 'react-native'
import {connect} from 'react-redux'
import Button from '../../components/Button'
import {deleteEntryStart} from '../../ducks/diaryEntry'
import full from '../../utils/fullHours'
import styles from '../../constants/styles'
import {logo} from '../../assets/images'

class DiaryEntry extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.getParam('screenName'),
    headerTitleStyle: {
      textAlign: 'center',
      width: '85%',
      fontFamily: 'bold',
      fontSize: 20
    },
    headerRight: () => (
      <TouchableOpacity style={{width: 50, height: 50}}>
        <Image source={logo} width={50} />
      </TouchableOpacity>
    )
  })

  handleButtonPress = id => {
    this.props.deleteEntryStart(id)
    this.props.navigation.goBack()
  }

  render() {
    const entry = this.props.navigation.getParam('data')
    const {values, id, index} = entry
    const {reason, thoughts, draws, createdAt, circumstances} = values

    const hours = new Date(createdAt).getHours()
    const minutes = new Date(createdAt).getMinutes()

    const fullHours = full(hours)
    const fullMinutes = full(minutes)

    const time = `${fullHours}:${fullMinutes}`

    return (
      <View
        style={{
          ...styles.bg,
          ...styles.top,
          padding: 30,
          backgroundColor: '#fcfaf8'
        }}
      >
        <View style={styles.rowWrapper}>
          <Text style={styles.entryText}>Cigarette nr.</Text>
          <Text style={styles.amount}>{index}</Text>
        </View>
        <View style={styles.rowWrapper}>
          <Text style={styles.entryText}>Time</Text>
          <Text style={styles.amount}>{time}</Text>
        </View>
        <View style={styles.rowWrapper}>
          <Text style={styles.entryText}>Draws</Text>
          <Text style={styles.amount}>{draws}</Text>
        </View>
        <View style={styles.columnWrapper}>
          <Text style={styles.entryText}>Reason:</Text>
          <Text style={styles.description}>{reason}</Text>
        </View>
        <View style={styles.columnWrapper}>
          <Text style={styles.entryText}>Circumstances:</Text>
          <Text style={styles.description}>{circumstances}</Text>
        </View>
        <View style={styles.columnWrapper}>
          <Text style={styles.entryText}>Thoughts, feelings:</Text>
          <Text style={styles.description}>{thoughts}</Text>
        </View>
        <View style={styles.delete}>
          <Button
            title='Delete entry'
            buttonText={styles.deleteText}
            buttonStyle={
              Platform.OS === 'ios'
                ? styles.deleteButtonIos
                : styles.deleteButton
            }
            onPress={() => this.handleButtonPress(id)}
          />
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = {
  deleteEntryStart
}

export default connect(null, mapDispatchToProps)(DiaryEntry)
