import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import styles from '../../constants/styles'
import full from '../../utils/fullHours'
import {diaryEntriesSelector, showPlus} from '../../ducks/diaryEntry'
import {crossX} from '../../assets/images'

class Diary extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Diary',
    headerTitleStyle: {
      textAlign: 'center',
      width: '90%',
      fontFamily: 'bold',
      fontSize: 20,
    },
  })

  state = {
    showHint: false,
    refresh: true,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.diaryEntries !== this.props.diaryEntries) {
      this.setState({refresh: !this.state.refresh})
    }
  }

  navigationButtonPressed = () => {
    if (this.props.diaryEntries.length < 101) {
      this.props.navigation.navigate('NewEntry', {
        screenName: 'New Diary Entry',
      })
    } else {
      this.displayError()
    }
  }

  displayError = () => {
    this.setState({showHint: true})
    setTimeout(() => {
      this.setState({showHint: false})
    }, 5000)
  }

  showSelectedItemList = (screenName, data) => {
    this.props.navigation.navigate('DiaryEntry', {
      screenName,
      data,
    })
  }

  get entries() {
    const sortedEntries = this.props.diaryEntries
      .slice()
      .sort(
        (a, b) => new Date(a.values.createdAt) - new Date(b.values.createdAt)
      )

    return sortedEntries.map((entry) => {
      const fullDate = new Date(entry.values.createdAt)
      const month = fullDate.getUTCMonth() + 1 //months from 1-12
      const day = fullDate.getUTCDate()
      const year = fullDate.getUTCFullYear()

      const hours = new Date(entry.values.createdAt).getHours()
      const minutes = new Date(entry.values.createdAt).getMinutes()

      const fullMonth = full(month)
      const fullDay = full(day)
      const fullHours = full(hours)
      const fullMinutes = full(minutes)

      const date = `${fullDay}/${fullMonth}/${year}`
      const time = `${fullHours}:${fullMinutes}`

      return (
        <TouchableOpacity
          key={entry.id}
          style={styles.entry}
          onPress={() =>
            this.showSelectedItemList(`Cigarette nr.${entry.index}`, entry)
          }
        >
          <View style={styles.nameWrapper}>
            <Text style={styles.descr}>Cigarette nr. {entry.index}</Text>
          </View>
          <View style={styles.dateWrapper}>
            <Text style={styles.timestamp}>{time}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </TouchableOpacity>
      )
    })
  }

  render() {
    const {showHint} = this.state
    const {length} = this.props.diaryEntries

    return (
      <View style={{flex: 1}}>
        <ScrollView
          style={
            length === 0
              ? {
                  ...styles.list,
                  paddingBottom: 0,
                }
              : {...styles.list}
          }
          contentContainerStyle={
            length === 0
              ? {justifyContent: 'center', flexGrow: 1}
              : {flexGrow: 1, paddingBottom: 35}
          }
          showsVerticalScrollIndicator={false}
        >
          {length === 0 ? (
            <View style={styles.noDiaryWrapper}>
              <Text style={styles.noDiary}>No diary entries yet.</Text>
              {this.props.showPlusButton ? (
                <Text style={styles.noDiary}>
                  {'\n'}Tap the "+" button to create a new entry
                </Text>
              ) : (
                <Text style={styles.noDiary}>
                  {'\n'}You will be able to create entries once you complete the
                  appropriate exercise.
                </Text>
              )}
            </View>
          ) : (
            this.entries
          )}
        </ScrollView>
        {showHint && (
          <View style={{position: 'absolute', bottom: 10}}>
            <Text style={styles.hintText}>
              You need to delete old entries to create new ones
            </Text>
          </View>
        )}
        {this.props.showPlusButton && (
          <TouchableOpacity
            style={styles.plusButton}
            onPress={this.navigationButtonPressed}
          >
            <Image source={crossX} style={styles.crossX} />
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

Diary.defaultProps = {
  diaryEntries: [],
}

const mapStateToProps = (state) => {
  return {
    diaryEntries: diaryEntriesSelector(state),
    isLoggedIn: state.login.success,
    showPlusButton: showPlus(state),
  }
}

export default connect(mapStateToProps)(Diary)
