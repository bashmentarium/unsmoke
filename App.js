import * as React from 'react'
import AsyncStorage from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import i18n from 'i18n-js'
import {AppLoading} from 'expo'
import * as Font from 'expo-font'
import {Provider} from 'react-redux'
import NavigationService from './utils/navigationService'
import store from './store'
import colors from './constants/colors'
import getLocaleMessages from './localization/getLocaleMessages'

import StartUpScreen from './screens/StartUp'
import Auth from './screens/Auth'
import SignUp from './screens/SignUp'
import Profile from './screens/Profile'
import PrivacyPolicy from './screens/PrivacyPolicy'
import TermsConditions from './screens/TermsConditions'
import Exercise from './screens/Exercise'
import NewEntry from './screens/NewEntry'
import ForgotPassword from './screens/ForgotPassword'
import ExercisesList from './screens/ExercisesList'
import Achievements from './screens/Achievements'
import Diary from './screens/Diary'
import Chapter from './components/Chapter'
import TabBarIcon, {
  StarTabBarIconContainerContainer,
} from './components/TabBarIcon'
import Addictions from './screens/Addictions'
import Questionnaire from './screens/Questionnaire'
import DiaryEntry from './screens/DiaryEntry'
import Algorithm from './screens/Algorithm'
import Intro from './screens/Intro'

const exercises = require(`./assets/images/icons/exercises.png`)
const diary = require(`./assets/images/icons/diary.png`)
const achievements = require(`./assets/images/icons/achievements.png`)
const profile = require(`./assets/images/icons/profile.png`)

const exercises_focused = require(`./assets/images/icons/exercises_focused.png`)
const diary_focused = require(`./assets/images/icons/diary_focused.png`)
const achievements_focused = require(`./assets/images/icons/achievements_focused.png`)
const profile_focused = require(`./assets/images/icons/profile_focused.png`)

i18n.translations = {
  en: getLocaleMessages('en'),
}
i18n.locale = 'en'

export const switchNavigator = createSwitchNavigator({
  StartUpScreen: StartUpScreen,
  login: createStackNavigator(
    {
      Intro: Intro,
      Auth: Auth,
      ForgotPassword: ForgotPassword,
      SignUp: SignUp,
      PrivacyPolicy: PrivacyPolicy,
      TermsConditions: TermsConditions,
    },
    {
      defaultNavigationOptions: {
        headerShown: false,
      },
    }
  ),
  main: createBottomTabNavigator(
    {
      Exercises: createStackNavigator(
        {
          ExercisesList: ExercisesList,
          Chapter: {
            screen: Chapter,
          },
          Addictions: {
            screen: Addictions,
          },
          Exercise: {
            screen: Exercise,
          },
          Questionnaire: {
            screen: Questionnaire,
          },
        },
        {
          initialRouteName: 'ExercisesList',
          defaultNavigationOptions: {
            headerTitle: 'Exercises',
            headerTitleStyle: {
              flex: 1,
              textAlign: 'center',
            },
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: colors.noticeBackground,
              borderBottomWidth: 0,
              elevation: 0,
              height: 55,
            },
          },
          navigationOptions: {
            tabBarIcon: ({focused}) => (
              <TabBarIcon
                name='exercises'
                focused={focused}
                image={focused ? exercises_focused : exercises}
              />
            ),
          },
        }
      ),
      Diary: createStackNavigator(
        {
          Diary: Diary,
          NewEntry: NewEntry,
          DiaryEntry: DiaryEntry,
        },
        {
          initialRouteName: 'Diary',
          defaultNavigationOptions: {
            headerTitle: 'Diary',
            headerTitleStyle: {
              flex: 1,
              textAlign: 'center',
            },
            headerBackTitle: null,
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: colors.noticeBackground,
              borderBottomWidth: 0,
              elevation: 0,
              height: 55,
            },
          },
          navigationOptions: {
            tabBarIcon: ({focused}) => (
              <TabBarIcon
                name='diary'
                focused={focused}
                image={focused ? diary_focused : diary}
              />
            ),
          },
        }
      ),
      Achievements: createStackNavigator(
        {
          Achievements: Achievements,
        },
        {
          initialRouteName: 'Achievements',
          defaultNavigationOptions: {
            headerTitle: 'Achievements',
            headerTitleStyle: {
              flex: 1,
              textAlign: 'center',
            },
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: colors.noticeBackground,
              borderBottomWidth: 0,
              elevation: 0,
              height: 55,
            },
          },
          navigationOptions: {
            tabBarIcon: ({focused}) => (
              <StarTabBarIconContainerContainer
                image={focused ? achievements_focused : achievements}
                focused={focused}
              />
            ),
          },
        }
      ),
      Profile: createStackNavigator(
        {
          Profile: Profile,
          Algorithm: Algorithm,
        },
        {
          initialRouteName: 'Profile',
          defaultNavigationOptions: {
            headerTitle: 'Profile',
            headerTitleStyle: {
              flex: 1,
              textAlign: 'center',
            },
            headerBackTitle: null,
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: colors.noticeBackground,
              borderBottomWidth: 0,
              elevation: 0,
              height: 55,
            },
          },
          navigationOptions: {
            tabBarIcon: ({focused}) => {
              return (
                <TabBarIcon
                  name='profile'
                  focused={focused}
                  image={focused ? profile_focused : profile}
                />
              )
            },
          },
        }
      ),
    },
    {
      initialRouteName: 'Exercises',
      tabBarOptions: {
        style: {
          backgroundColor: colors.noticeBackground,
          height: 60,
        },
        labelStyle: {
          fontFamily: 'regular',
          fontSize: 12,
        },
        activeTintColor: colors.tintColor,
        inactiveTintColor: colors.tabIconDefault,
        keyboardHidesTabBar: true,
      },
    }
  ),
})

const App = createAppContainer(switchNavigator)

const fetchFonts = () => {
  return Font.loadAsync({
    thin: require('./assets/fonts/Lato-Thin.ttf'),
    light: require('./assets/fonts/Lato-Light.ttf'),
    regular: require('./assets/fonts/Lato-Regular.ttf'),
    bold: require('./assets/fonts/Lato-Bold.ttf'),
    NYRegular: require('./assets/fonts/NY-Regular.ttf'),
    SFRegular: require('./assets/fonts/SF-Regular.ttf'),
  })
}

export default () => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false)

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setLoadingComplete(true)}
      />
    )
  }
  return (
    <Provider store={store}>
      <App
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef)
        }}
      />
    </Provider>
  )
}
