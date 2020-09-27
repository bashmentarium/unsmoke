import React, {Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native'
import {connect} from 'react-redux'
import {putAlgorithmStart} from '../../ducks/algorithms'
import {
  completeExerciseStart,
  findHistory,
  findAnalysis,
  shift as shifted,
  findJokes,
} from '../../ducks/exercises'
import {logo} from '../../assets/images'
import styles from '../../constants/styles'
import colors from '../../constants/colors'
import Button from '../../components/Button'
import {currentExerciseSelector} from '../../ducks/unlock'

class Exercise extends Component {
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
  })

  handlePress = async (id, nextExerciseId) => {
    const {completeExerciseStart, navigation} = this.props

    await completeExerciseStart({id, nextExerciseId})
    navigation.goBack()
  }

  handlePlace = async (algorithm) => {
    await this.props.putAlgorithmStart(algorithm)
  }

  get paragraphs() {
    const exercise = this.props.navigation.getParam('exercise')
    if (exercise.text[0].name === 'Ammonia') {
      const chemicals = exercise.text.map((chemical, index) => (
        <View key={index} style={styles.itemWrapper}>
          <Text style={styles.chemicalName}>
            {'\t'}
            {chemical.name}
          </Text>
          <Text style={styles.chemicalDescription}>{chemical.description}</Text>
        </View>
      ))
      return (
        <View>
          <Text style={styles.chemicals}>
            {'\t'}Numerous scientific studies have proven that not one chemical
            substance present in tobacco smoke is beneficial. Here are a few:
          </Text>
          {chemicals}
          <Text style={styles.chemicals}>
            {'\n'}
            {'\n'}
            {'\t'}This list could go on and on. However, I’m sure by now you’ve
            got the point. Please, smoke consciously.
          </Text>
        </View>
      )
    } else if (exercise.text[0].name === 'Complainer') {
      const exercises = exercise.text.map((category, index) => (
        <View key={index} style={styles.itemWrapper}>
          <Text style={styles.typeName}>
            {'\t'}
            {category.name}
          </Text>
          <Text style={styles.typeDescription}>
            {'\t'}
            {category.description}
          </Text>
        </View>
      ))
      return (
        <View>
          <Text
            style={{
              ...styles.chemicals,
            }}
          >
            {'\t'}By now, you should have made up your mind on who you want to
            be:
          </Text>
          {exercises}
        </View>
      )
    } else {
      return exercise.text.map((paragraph, index) => {
        return (
          <View key={index} style={styles.exerciseWrapper}>
            <Text style={styles.exerciseText}>
              {'\t'}
              {paragraph}
            </Text>
          </View>
        )
      })
    }
  }

  handleNav = () => {
    const questionnaires = this.props.exercise.questionnaires
    this.props.navigation.navigate('Addictions', {
      screenName: 'Know your addiction',
      questionnaires,
    })
  }

  render() {
    const exercise = this.props.navigation.getParam('exercise')
    const {isLoggedIn, currentExercise} = this.props
    const {loading} = this.props.exercises
    const nextExerciseId = this.props.navigation.getParam('nextExerciseId')

    return (
      <ScrollView
        style={{...styles.bg, paddingTop: 25, backgroundColor: '#fcfaf8'}}
        contentContainerStyle={{paddingBottom: 50}}
      >
        {exercise.image ? (
          <View>
            <Image source={exercise.image} style={styles.exerciseImage} />
          </View>
        ) : null}
        {exercise.questionnaires ? this.handleNav : this.paragraphs}
        {isLoggedIn &&
          exercise.name === 'Control & accounting' &&
          !this.props.controlAlgorithmButton && (
            <View
              style={{
                ...styles.continue,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 20,
              }}
            >
              <Button
                title="place algorithm to the 'Profile' bottom bar tab for easier access"
                buttonText={styles.placeButtonText}
                buttonStyle={
                  Platform.OS === 'ios'
                    ? styles.algorithmButtonIos
                    : styles.algorithmButton
                }
                onPress={() => this.handlePlace('showControlAlgorithm')}
              />
            </View>
          )}
        {isLoggedIn &&
          exercise.name === 'Your last cigarette' &&
          !this.props.safetyAlgorithmButton && (
            <View
              style={{
                ...styles.continue,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 20,
              }}
            >
              <Button
                title="place algorithm to the 'Profile' bottom bar tab for easier access"
                buttonText={styles.placeButtonText}
                buttonStyle={
                  Platform.OS === 'ios'
                    ? styles.algorithmButtonIos
                    : styles.algorithmButton
                }
                onPress={() => this.handlePlace('showSafetyAlgorithm')}
              />
            </View>
          )}
        {isLoggedIn &&
          exercise.name === 'Smart pet' &&
          !this.props.petAlgorithmButton && (
            <View
              style={{
                ...styles.continue,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 20,
              }}
            >
              <Button
                title="place algorithm to the 'Profile' bottom bar tab for easier access"
                buttonText={styles.placeButtonText}
                buttonStyle={
                  Platform.OS === 'ios'
                    ? styles.algorithmButtonIos
                    : styles.algorithmButton
                }
                onPress={() => this.handlePlace('showPetAlgorithm')}
              />
            </View>
          )}

        {currentExercise !== exercise.id ? null : (
          <View
            style={{
              ...styles.continue,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 20,
            }}
          >
            {loading ? (
              <ActivityIndicator
                size='small'
                color={colors.buttonDefault}
                style={{height: 37}}
              />
            ) : (
              <Button
                title='complete'
                buttonText={styles.buttonText}
                buttonStyle={
                  Platform.OS === 'ios' ? styles.buttonIos : styles.button
                }
                onPress={() => this.handlePress(exercise.id, nextExerciseId)}
              />
            )}
          </View>
        )}
      </ScrollView>
    )
  }
}

Exercise.defaultProps = {
  completeExercises: [],
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.success,
    exercises: state.exercises,
    currentExercise: currentExerciseSelector(state),
    controlAlgorithmButton:
      state.login.success && state.userData.success.showControlAlgorithm,
    safetyAlgorithmButton:
      state.login.success && state.userData.success.showSafetyAlgorithm,
    petAlgorithmButton:
      state.login.success && state.userData.success.showPetAlgorithm,
    history: findHistory(state),
    analysis: findAnalysis(state),
    shift: shifted(state),
    humor: findJokes(state),
  }
}

const mapDispatchToProps = {
  completeExerciseStart,
  putAlgorithmStart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Exercise)
