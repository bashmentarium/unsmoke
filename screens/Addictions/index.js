import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, Platform} from 'react-native'
import Button from '../../components/Button'
import {logo} from '../../assets/images'
import styles from '../../constants/styles'

class Addictions extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.getParam('screenName'),
    headerTitleStyle: {
      textAlign: 'center',
      width: '85%',
      fontFamily: 'regular',
      fontSize: 19,
    },
    headerRight: () => (
      <TouchableOpacity style={{width: 50, height: 50}}>
        <Image source={logo} width={50} />
      </TouchableOpacity>
    ),
    headerBackTitle: null,
  })

  handlePress = (screenName, q) => {
    this.props.navigation.navigate('Questionnaire', {
      screenName: screenName,
      exercise: q,
    })
  }

  get questionnaires() {
    const exercise = this.props.navigation.getParam('exercise')
    return exercise.questionnaires.map((q) => (
      <Button
        key={q.id}
        title={q.name}
        buttonStyle={
          Platform.OS === 'ios'
            ? styles.addictionsIos
            : styles.addictionsAndroid
        }
        buttonText={styles.addictionsText}
        onPress={() => this.handlePress(q.name, q)}
      />
    ))
  }

  render() {
    return (
      <View
        style={{
          ...styles.bg,
          paddingTop: 30,
          backgroundColor: '#fcfaf8',
          height: '100%',
        }}
      >
        <Text style={styles.addiction}>
          This module consists of a few questionnaires for you to better
          understand the level of your tobacco addiction and also get a picture
          of how deep are you stuck. You will only have to make a final decision
          on what do you want to do - in the end.
        </Text>
        {this.questionnaires}
      </View>
    )
  }
}

export default Addictions
