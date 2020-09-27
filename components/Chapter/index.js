import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {
  completeExercisesSelector,
  completionPercentSelector,
} from '../../ducks/exercises'
import {currentExerciseSelector} from '../../ducks/unlock'
import styles from '../../constants/styles'
import {logo} from '../../assets/images'

const itemUncheckedActive = require('../../assets/images/icons/item_unchecked_active.png')
const itemUncheckedDisabled = require('../../assets/images/icons/item_unchecked_disabled.png')
const itemChecked = require('../../assets/images/icons/item_checked.png')

class Chapter extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.getParam('screenName'),
    headerTitleStyle: {
      textAlign: 'center',
      width: '85%',
      fontFamily: 'bold',
      fontSize: 20,
    },
    headerRight: () => (
      <TouchableOpacity style={{width: 50, height: 50}}>
        <Image source={logo} width={50} />
      </TouchableOpacity>
    ),
    headerBackTitle: null,
  })

  handlePress = (screenName, exercise, nextExerciseId) => {
    if (exercise.id === '42oag03key8') {
      this.props.navigation.navigate('Addictions', {
        screenName,
        exercise,
        nextExerciseId,
      })
    } else {
      this.props.navigation.navigate('Exercise', {
        screenName,
        exercise,
        nextExerciseId,
      })
    }
  }

  get exercises() {
    const {currentExercise} = this.props
    const chapterExercises = this.props.navigation.getParam('exercises')

    const chapterExercisesIds = chapterExercises.map((chapter) => chapter.id)

    const itemCheckedComp = (
      <Image source={itemChecked} style={{height: 20, width: 20}} />
    )

    const itemUncheckedActiveComp = (
      <Image source={itemUncheckedActive} style={{height: 20, width: 20}} />
    )

    const itemUncheckedDisabledComp = (
      <Image source={itemUncheckedDisabled} style={{height: 20, width: 20}} />
    )

    return chapterExercises.map((exercise, index, array) => {
      let unlocked

      const position = chapterExercisesIds.indexOf(currentExercise)

      if (position >= index) {
        unlocked = true
      } else if (position === -1) {
        unlocked = true
      } else {
        unlocked = false
      }

      let nextExerciseId

      if (index + 1 < array.length) {
        nextExerciseId = array[index + 1].id
      }

      if (currentExercise === 'ca3erqm3tht') {
        nextExerciseId = 'd3jsltv656xjh'
      }

      if (currentExercise === 'r3jsltv8hmv2v') {
        nextExerciseId = 'a3jsppjpo09pp'
      }

      if (currentExercise === 'n3jw86tj6ij14') {
        nextExerciseId = 'a3jstnjkhco03'
      }

      if (currentExercise === 'k3jstnjmhfg0i') {
        nextExerciseId = 'a3jssbtoazi4j'
      }

      return (
        <TouchableOpacity
          key={index}
          onPress={
            unlocked
              ? () => this.handlePress(exercise.name, exercise, nextExerciseId)
              : null
          }
          style={
            unlocked
              ? styles.exerciseWrapperActive
              : styles.exerciseWrapperDisabled
          }
        >
          <Text style={unlocked ? styles.nameActive : styles.nameDisabled}>
            {exercise.name}
          </Text>
          <View styles={styles.iconCheckWrap}>
            {unlocked
              ? exercise.id === this.props.currentExercise
                ? itemUncheckedActiveComp
                : itemCheckedComp
              : exercise.id === this.props.currentExercise
              ? itemUncheckedActiveComp
              : itemUncheckedDisabledComp}
          </View>
        </TouchableOpacity>
      )
    })
  }

  render() {
    return (
      <ScrollView
        style={{
          ...styles.bg,
          ...styles.top,
          paddingTop: 20,
          backgroundColor: '#fcfaf8',
        }}
        contentContainerStyle={{paddingBottom: 50}}
        alwaysBounceVertical
        showsVerticalScrollIndicator={false}
      >
        {this.exercises}
        <Text style={styles.completion}>
          Overall progress: {this.props.completion} %
        </Text>
      </ScrollView>
    )
  }
}

Chapter.defaultProps = {
  completeExercises: [],
}

const mapStateToProps = (state) => {
  return {
    allExercises: state.allExercises,
    completeExercises: completeExercisesSelector(state),
    completion: completionPercentSelector(state),
    currentExercise: currentExerciseSelector(state),
  }
}

export default connect(mapStateToProps)(Chapter)
