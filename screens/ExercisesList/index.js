import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import styles from '../../constants/styles'
import {
  currentExerciseSelector,
  currentChapterSelector,
} from '../../ducks/unlock'
import chapters from '../../fixtures'

let unlocked = false

class ExercisesList extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Exercises',
    headerTitleStyle: {
      textAlign: 'center',
      width: '90%',
      fontFamily: 'bold',
      fontSize: 20,
    },
    headerBackTitle: null,
  })

  handlePress = (name, index) => {
    this.props.navigation.navigate('Chapter', {
      screenName: name,
      exercises: chapters[index].exercises,
    })
  }

  render() {
    const {currentChapter} = this.props
    const chaptersIds = chapters.map((chapter) => chapter.id)
    let currentChapterIndex = chaptersIds.indexOf(currentChapter)

    return (
      <View
        style={{
          ...styles.bg,
          height: '100%',
          backgroundColor: '#fcfaf8',
          padding: '3%',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <View>
          {chapters.map((chapter, index) => {

            const unlocked = currentChapterIndex >= index

            return (
              <TouchableOpacity
                key={chapter.name}
                style={unlocked ? styles.chapterActive : styles.chapterDisabled}
              >
                <View style={styles.view}>
                  <TouchableOpacity
                    style={styles.row}
                    onPress={
                      unlocked
                        ? () => this.handlePress(chapter.name, index)
                        : null
                    }
                  >
                    <View style={styles.iconWrap}>
                      <Image
                        source={
                          unlocked
                            ? chapter.icons.active
                            : chapter.icons.disabled
                        }
                        style={styles.icon}
                      />
                    </View>
                    <View style={styles.textwrap}>
                      <Text
                        style={
                          unlocked ? styles.activeText : styles.disabledText
                        }
                      >
                        {chapter.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
        <View style={{justifySelf: 'flex-end'}}>
          <View
            style={{
              width: '86%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Text style={styles.tip}>
              To ditch the smoking habit, you only need to perform the suggested
              exercises
            </Text>
          </View>
          <View
            style={{
              width: '95%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Text style={styles.disclaimer}>
              *If you are planning to violate the recommendations given
              throughout the exercises, succeeding becomes challenging.
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allChapters: state.allChapters,
    currentExercise: currentExerciseSelector(state),
    currentChapter: currentChapterSelector(state),
  }
}

export default connect(mapStateToProps)(ExercisesList)
