import {Platform} from 'react-native'

/**
 * @method anonymous
 * @description Navigates to given route name, as well as pass params
 * @returns {string} - platform
 */
export default function () {
  const platform = Platform.select({
    ios: () => 'Ios',
    android: () => 'Android',
  })
  return platform
}
