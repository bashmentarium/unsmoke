import {AsyncStorage} from 'react-native'

/**
 * @method setStorage
 * @description Save authentication data into the device's storage
 * @param {string} id_token
 * @param {string} refresh_token
 * @param {string} expires_in
 */
export const setStorage = async ({id_token, refresh_token, expires_in}) => {
  const expirationDate = new Date(
    new Date().getTime() + parseInt(expires_in) * 1000
  ).toLocaleString()

  await AsyncStorage.setItem('tokenId', id_token)
  await AsyncStorage.setItem('refreshToken', refresh_token)
  await AsyncStorage.setItem('expiryDate', expirationDate)
}

/**
 * @method getStorage
 * @description Get the authentication data from the device's storage
 * @returns {any[]} - local storage
 */
export const getStorage = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken')
  const expiryDate = await AsyncStorage.getItem('expiryDate')

  if (!refreshToken || !expiryDate) {
    return null
  }

  return {refreshToken, expiryDate}
}
