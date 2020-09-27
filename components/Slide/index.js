import React, {useState, useEffect} from 'react'
import {View, Text, Image, Platform, TouchableOpacity} from 'react-native'
import Button from '../../components/Button'
import styles from '../../constants/styles'
import colors from '../../constants/colors'
const logo = require('../../assets/images/icons/intro_logo.png')
const first = require('../../assets/images/icons/first_img.png')
const second = require('../../assets/images/icons/second_img.png')
const third = require('../../assets/images/icons/third_img.png')

export const Slide = (props) => {
  const {index, skip} = props
  const [showHint, setShowHint] = useState(true)

  const displayHint = () => {
    setShowHint(false)
    setTimeout(() => {
      setShowHint(true)
    }, 4000)
  }

  const handleNavigation = (arg) => {
    if (arg === 'signIn') {
      props.navigation.navigate('Auth')
    } else if (arg === 'signUp') {
      props.navigation.navigate('SignUp')
    }
  }

  useEffect(() => {
    displayHint()
  }, [])

  switch (index) {
    case 0:
      return (
        <View style={styles.slide}>
          <View style={styles.introLogoWrapper}>
            <Image source={logo} style={styles.introLogo} />
          </View>
          <Text style={styles.heading01}>The main purpose of this app is</Text>
          <Text style={styles.heading02}>to help you develop a new habit</Text>
          <Text style={styles.heading03}>of indifference towards</Text>
          <Text style={styles.heading04}>smoking</Text>
          {showHint && <Text style={styles.swipe}>swipe to begin</Text>}
        </View>
      )
    case 1:
      return (
        <View style={styles.slide}>
          <View style={{...styles.introLogoWrapper, height: '70%'}}>
            <Image source={first} style={styles.introImg} />
          </View>
          <Text style={{...styles.heading01, textTransform: 'none'}}>
            You will attain a personality that is
          </Text>
          <Text style={{...styles.heading02, textTransform: 'none'}}>
            indifferent towards smoking
          </Text>
        </View>
      )
    case 2:
      return (
        <View style={styles.slide}>
          <View style={{...styles.introLogoWrapper, height: '70%'}}>
            <Image source={second} style={styles.introImg} />
          </View>
          <Text style={{...styles.heading01, textTransform: 'none'}}>
            You will be able to preserve that
          </Text>
          <Text style={{...styles.heading02, textTransform: 'none'}}>
            indifference by simple means
          </Text>
        </View>
      )
    case 3:
      return (
        <View style={styles.slide}>
          <View style={{...styles.introLogoWrapper, height: '70%'}}>
            <Image source={third} style={styles.introImg} />
          </View>
          <Text style={{...styles.heading01, textTransform: 'none'}}>
            You will attain that personality
          </Text>
          <Text style={{...styles.heading02, textTransform: 'none'}}>
            within a month
          </Text>
        </View>
      )
    case 4:
      return (
        <View style={styles.slide}>
          <View style={{height: '50%'}} />
          <Text style={{...styles.heading01, textTransform: 'none'}}>
            Before we begin, tell us if you{' '}
          </Text>
          <Text style={{...styles.heading02, textTransform: 'none'}}>
            are already a member?
          </Text>
          <View
            style={{
              height: '15%',
              alignItems: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '50%',
              justifyContent: 'space-evenly',
            }}
          >
            <Button
              title='yes, sign in'
              onPress={() => handleNavigation('signIn')}
              buttonStyle={
                Platform.OS === 'ios' ? {...styles.buttonIos} : styles.button
              }
              buttonText={styles.buttonText}
            />
            <Button
              title='no, sign up'
              onPress={() => handleNavigation('signUp')}
              buttonStyle={
                Platform.OS === 'ios'
                  ? {...styles.buttonIos, backgroundColor: '#fcfaf8'}
                  : {...styles.button, backgroundColor: colors.background}
              }
              buttonText={{
                ...styles.buttonText,
                color: '#1E1E1E',
                fontFamily: 'regular',
              }}
            />
          </View>
        </View>
      )
    default:
      return null
  }
}

export default Slide
