import React, {Component} from 'react'
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native'
import styles from '../../constants/styles'
import {logo} from '../../assets/images'
import Button from '../../components/Button/Button'

class Algorithm extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.getParam('name'),
    headerTitleStyle: {
      textAlign: 'center',
      width: '85%',
      fontFamily: 'regular',
      fontSize: 20
    },
    headerRight: () => (
      <TouchableOpacity style={{width: 50, height: 50}}>
        <Image source={logo} width={50} />
      </TouchableOpacity>
    )
  })

  handlePress = () => {
    this.props.navigation.goBack()
  }

  get algorithm() {
    const text = this.props.navigation.getParam('text')
    return (
      <View>
        {text.map((item, index) => (
          <Text
            key={index}
            style={
              Platform.OS === 'ios'
                ? styles.algorithmTextIos
                : styles.algorithmTextAndroid
            }
          >
            {item}
          </Text>
        ))}
      </View>
    )
  }

  render() {
    return (
      <ScrollView
        style={{
          ...styles.bg,
          ...styles.top,
          paddingTop: 20,
          backgroundColor: '#fcfaf8'
        }}
        alwaysBounceVertical
        contentContainerStyle={{
          width: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingBottom: 50
        }}
      >
        {this.algorithm}
        <View
          style={{
            ...styles.continue,
            marginTop: 30,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          <Button
            title='go back'
            onPress={this.handlePress}
            buttonStyle={
              Platform.OS === 'ios' ? styles.buttonIos : styles.button
            }
            buttonText={styles.buttonText}
          />
        </View>
      </ScrollView>
    )
  }
}

export default Algorithm
