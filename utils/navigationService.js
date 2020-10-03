// NavigationService.js

import {NavigationActions} from 'react-navigation'

let _navigator

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef
}

/**
 * @method navigate
 * @description Navigates to given route name, as well as pass params
 * @param {string} routeName
 * @param {any[]} params
 */
function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  )
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
}
