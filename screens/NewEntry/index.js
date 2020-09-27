import React, {Component, Fragment} from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import {Button} from 'react-native-elements'
import {Header} from 'react-navigation-stack'
import {Formik} from 'formik'
import {connect} from 'react-redux'
import {saveEntryStart} from '../../ducks/diaryEntry'
import {logo} from '../../assets/images'
import styles from './styles'
import colors from '../../constants/colors'

const platform = Platform.select({
  ios: () => 'Ios',
  android: () => 'Android',
})()

class NewEntry extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.getParam('screenName'),
    headerTitleStyle: {
      textAlign: 'center',
      width: '90%',
      fontFamily: 'bold',
      fontSize: 19,
    },
    headerRight: () => (
      <TouchableOpacity style={{width: 50, height: 50}}>
        <Image source={logo} width={50} />
      </TouchableOpacity>
    ),
  })

  saveButtonPress = (values, id) => {
    this.props.saveEntryStart({values, id})
    this.props.navigation.goBack()
  }

  render() {
    const identifier = Math.random()
      .toString(36)
      .substr(2, 9)

    const now = new Date().toLocaleString()

    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 20}
        style={{backgroundColor: '#fcfaf8', height: '100%'}}
        behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
      >
        <View style={{...styles[`container${platform}`]}}>
          <Formik
            initialValues={{
              draws: '',
              reason: '',
              circumstances: '',
              thoughts: '',
            }}
          >
            {({values, handleChange, isValid, setFieldTouched}) => (
              <Fragment>
                <View>
                  <View style={styles[`item${platform}`]}>
                    <Text
                      style={{
                        ...styles[`text${platform}`],
                        color: colors.lightContrast,
                      }}
                    >
                      Draws taken:
                    </Text>
                    <TextInput
                      style={styles[`draws${platform}`]}
                      autoCapitalize='none'
                      clearTextOnFocus={false}
                      autoCorrect={false}
                      keyboardType='number-pad'
                      maxLength={2}
                      placeholder='Tap to type in draws count'
                      placeholderTextColor='#B3B1B2'
                      underlineColorAndroid='transparent'
                      value={values.draws}
                      onChangeText={handleChange('draws')}
                      onBlur={() => setFieldTouched('draws')}
                      returnKeyType='done'
                    />
                  </View>
                  <View style={styles[`item${platform}`]}>
                    <Text
                      style={{
                        ...styles[`text${platform}`],
                        color: colors.lightContrast,
                      }}
                    >
                      Reason:
                    </Text>
                    <TextInput
                      style={styles[`reason${platform}`]}
                      multiline
                      clearTextOnFocus={false}
                      autoCapitalize='none'
                      autoCorrect={false}
                      keyboardType='default'
                      maxLength={100}
                      placeholder='Tap to type in the reason'
                      placeholderTextColor='#B3B1B2'
                      underlineColorAndroid='transparent'
                      value={values.reason}
                      onChangeText={handleChange('reason')}
                      onBlur={() => setFieldTouched('reason')}
                      textAlignVertical='top'
                      returnKeyType='done'
                      blurOnSubmit
                    />
                  </View>
                  <View style={styles[`item${platform}`]}>
                    <Text
                      style={{
                        ...styles[`text${platform}`],
                        color: colors.lightContrast,
                      }}
                    >
                      Circumstances:
                    </Text>
                    <TextInput
                      style={styles[`circumstances${platform}`]}
                      multiline
                      autoCapitalize='none'
                      clearTextOnFocus={false}
                      autoCorrect={false}
                      keyboardType='default'
                      maxLength={129}
                      placeholder='Tap to type in the circumstances'
                      placeholderTextColor='#B3B1B2'
                      underlineColorAndroid='transparent'
                      value={values.circumstances}
                      onChangeText={handleChange('circumstances')}
                      onBlur={() => setFieldTouched('circumstances')}
                      textAlignVertical='top'
                      autoCompleteType='off'
                      numberOfLines={3}
                      returnKeyType='done'
                      blurOnSubmit
                    />
                  </View>
                  <View style={styles[`item${platform}`]}>
                    <Text
                      style={{
                        ...styles[`text${platform}`],
                        color: colors.lightContrast,
                      }}
                    >
                      Thoughts, feelings:
                    </Text>
                    <TextInput
                      style={styles[`thoughts${platform}`]}
                      multiline
                      autoComplete='false'
                      autoCapitalize='none'
                      autoCorrect={false}
                      clearTextOnFocus={false}
                      keyboardType='default'
                      maxLength={129}
                      placeholder='Tap to type in thoughts and feelings'
                      placeholderTextColor='#B3B1B2'
                      underlineColorAndroid='transparent'
                      value={values.thoughts}
                      onChangeText={handleChange('thoughts')}
                      onBlur={() => setFieldTouched('thoughts')}
                      textAlignVertical='top'
                      returnKeyType='done'
                      blurOnSubmit
                    />
                  </View>
                  <View
                    style={{
                      ...styles.continue,
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      marginTop: 20,
                    }}
                  >
                    <Button
                      title='Save entry'
                      titleStyle={styles[`saveTitle${platform}`]}
                      buttonStyle={styles[`saveButton${platform}`]}
                      onPress={
                        isValid
                          ? () =>
                              this.saveButtonPress(
                                {...values, createdAt: now},
                                identifier
                              )
                          : null
                      }
                    />
                  </View>
                </View>
              </Fragment>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const mapDispatchToProps = {
  saveEntryStart,
}

export default connect(null, mapDispatchToProps)(NewEntry)
