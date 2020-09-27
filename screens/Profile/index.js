import React, {Component, Fragment} from 'react'
import {
  Text,
  View,
  TextInput,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import {Overlay} from 'react-native-elements'
import {connect} from 'react-redux'
import i18n from 'i18n-js'
import {Formik} from 'formik'
import * as yup from 'yup'
import {signOut} from '../../ducks/login'
import {
  userDataStart,
  wipeProgressSuccess,
  showProfit,
} from '../../ducks/userData'
import {
  counterStart,
  counterReset,
  dateLaunchedSelector,
  counterValuesSelector,
} from '../../ducks/counter'
import styles from '../../constants/styles'
import Button from '../../components/Button'
import MoneyCounter from '../../components/MoneyCounter'
import colors from '../../constants/colors'

const platform = Platform.select({
  ios: () => 'Ios',
  android: () => 'Android',
})()

class Profile extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Profile',
    headerTitleStyle: {
      textAlign: 'center',
      width: '90%',
      fontFamily: 'bold',
      fontSize: 20,
    },
  })

  state = {
    showLogoutModal: false,
    showResetModal: false,
    showCounterModal: false,
    appName: '',
    userData: null,
    restart: false,
  }

  handleLogout = () => {
    this.props.signOut()
  }

  showLogout = () => {
    this.setState({showLogoutModal: true})
  }

  showReset = () => {
    this.setState({showResetModal: true})
  }

  hideModal = () => {
    this.setState({
      showLogoutModal: false,
      showResetModal: false,
      showCounterModal: false,
    })
  }

  handleReset = () => {
    if (this.state.appName === 'unsmoke') {
      this.props.wipeProgress()
      this.hideModal()
      this.setState({appName: ''})
    }
  }

  handleSubmit = (values) => {
    const now = new Date().toLocaleString()
    if (values) {
      this.props.counterStart({values, date: now})
    } else {
      this.setState({showCounterModal: true})
    }
  }

  counterReset = () => {
    this.props.counterReset()
    this.hideModal()
  }

  render() {
    const {navigation, userData} = this.props
    const {
      showControlAlgorithm,
      showSafetyAlgorithm,
      showPetAlgorithm,
    } = userData

    const {height} = Dimensions.get('window')

    return (
      <View
        style={{
          height: height,
          justifyContent: 'space-between',
          paddingTop: 30,
          paddingBottom: Platform.OS === 'ios' ? 200 : 140,
          backgroundColor: '#fcfaf8',
        }}
      >
        <View
          style={{
            height: '47%',
            justifyContent: 'flex-start',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <View
            style={this.props.showProfit ? styles.profit : {display: 'none'}}
          >
            <Text
              style={{
                ...styles.counterText,
                marginTop: 20,
                color: colors.lightContrast,
              }}
            >
              Profit accumulator
            </Text>
            <MoneyCounter />
            <View>
              <View style={styles.inputsWrapper}>
                <Formik
                  initialValues={{
                    price: '',
                    amount: '',
                  }}
                  onSubmit={this.handleSubmit}
                  validationSchema={yup.object().shape({
                    price: yup
                      .string()
                      .matches(/^[0-9]*$/, 'A number is enough')
                      .required('Price is required!'),
                    amount: yup
                      .string()
                      .matches(/^[0-9]*$/, 'A number is enough')
                      .required('Amount is required!'),
                  })}
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    setFieldTouched,
                    isValid,
                    touched,
                    handleSubmit,
                  }) => {
                    return (
                      <View style={{flexDirection: 'column'}}>
                        {!this.props.launched ? (
                          <View
                            style={{
                              width: '85%',
                              flexDirection: 'row',
                              marginHorizontal: 'auto',
                              height: 50,
                            }}
                          >
                            <View
                              style={{
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                width: '55%',
                              }}
                            >
                              <Text
                                style={{
                                  ...styles.label,
                                  color: colors.gray,
                                  fontSize: 10,
                                  textAlign: 'center',
                                  width: '100%',
                                  fontFamily: 'regular',
                                }}
                              >
                                pack of cigarettes price
                              </Text>
                              <TextInput
                                style={
                                  touched.price && errors.price
                                    ? {
                                        ...styles.counterInput,
                                        borderColor: colors.errorText,
                                      }
                                    : styles.counterInput
                                }
                                clearButtonMode='always'
                                keyboardType='numeric'
                                maxLength={2}
                                clearTextOnFocus
                                placeholder='--'
                                textAlign='center'
                                value={values.price}
                                error={errors.price}
                                onChangeText={handleChange('price')}
                                onBlur={() => setFieldTouched('price')}
                                returnKeyType='done'
                                blurOnSubmit
                              />
                              {touched.price ? (
                                errors.price ? (
                                  <View style={styles.counterLabelWrapper}>
                                    <Text style={styles.errorLabel}>
                                      {errors.price}
                                    </Text>
                                  </View>
                                ) : (
                                  <View style={styles.counterLabelWrapper}>
                                    <Text style={styles.invisError}>
                                      Aasdasd
                                    </Text>
                                  </View>
                                )
                              ) : (
                                <View style={styles.counterLabelWrapper}>
                                  <Text style={styles.invisError}>Aasdasd</Text>
                                </View>
                              )}
                            </View>
                            <View
                              style={{
                                width: Platform.OS === 'ios' ? 20 : 30,
                                backgroundColor: colors.noticeText,
                              }}
                            />
                            <View
                              style={{
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                width: '55%',
                              }}
                            >
                              <Text
                                style={{
                                  ...styles.label,
                                  color: colors.gray,
                                  fontSize: 10,
                                  textAlign: 'center',
                                  width: '100%',
                                  fontFamily: 'regular',
                                }}
                              >
                                daily cigarettes smoken
                              </Text>
                              <TextInput
                                style={
                                  touched.amount && errors.amount
                                    ? {
                                        ...styles.counterInput,
                                        borderColor: colors.errorText,
                                      }
                                    : styles.counterInput
                                }
                                clearButtonMode='always'
                                keyboardType='numeric'
                                maxLength={2}
                                clearTextOnFocus
                                placeholder='--'
                                textAlign='center'
                                value={values.amount}
                                error={errors.amount}
                                onChangeText={handleChange('amount')}
                                onBlur={() => setFieldTouched('amount')}
                                returnKeyType='done'
                                blurOnSubmit
                              />
                              {touched.amount ? (
                                errors.amount ? (
                                  <View style={styles.counterLabelWrapper}>
                                    <Text style={styles.errorLabel}>
                                      {errors.amount}
                                    </Text>
                                  </View>
                                ) : (
                                  <View style={styles.counterLabelWrapper}>
                                    <Text style={styles.invisError}>
                                      Aasdasd
                                    </Text>
                                  </View>
                                )
                              ) : (
                                <View style={styles.counterLabelWrapper}>
                                  <Text style={styles.invisError}>Aasdasd</Text>
                                </View>
                              )}
                            </View>
                          </View>
                        ) : (
                          <View
                            style={{
                              flexDirection: 'column',

                              height: 50,

                              justifyContent: 'center',
                            }}
                          >
                            <View
                              style={{
                                alignItems: 'center',
                                width: '100%',
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: 'row',

                                  width: 150,
                                  marginHorizontal: 'auto',
                                }}
                              >
                                <Text
                                  style={{
                                    ...styles.label,

                                    width: 130,
                                  }}
                                >
                                  cigarettes price:
                                </Text>
                                <Text
                                  style={{
                                    ...styles.label,
                                    color: colors.lightContrast,
                                  }}
                                >
                                  {this.props.values.price}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: 150,
                                  marginHorizontal: 'auto',
                                }}
                              >
                                <Text style={{...styles.label, width: 130}}>
                                  daily amount:
                                </Text>
                                <Text
                                  style={{
                                    ...styles.label,
                                    color: colors.lightContrast,
                                  }}
                                >
                                  {this.props.values.amount}
                                </Text>
                              </View>
                            </View>
                          </View>
                        )}
                        <View>
                          <View style={{marginTop: 30}}>
                            {this.props.launched ? (
                              <Button
                                buttonStyle={styles.counterReset}
                                buttonText={styles.counterTextReset}
                                title='reset'
                                onPress={() => this.handleSubmit()}
                              />
                            ) : (
                              <Button
                                buttonStyle={styles.counterStart}
                                buttonText={styles.counterText}
                                title='launch'
                                onPress={
                                  isValid ? () => handleSubmit(values) : null
                                }
                              />
                            )}
                          </View>
                          <Overlay
                            isVisible={this.state.showCounterModal}
                            onBackdropPress={this.hideModal}
                            width='80%'
                            height={Platform.OS === 'ios' ? '20%' : '25%'}
                            borderRadius={10}
                            overlayStyle={{
                              padding: 15,
                              justifyContent: 'center',
                            }}
                          >
                            <Fragment>
                              <Text style={styles.modalHeader}>
                                Are you sure?
                              </Text>
                              <View style={styles.logoutWrapper}>
                                <Button
                                  type='solid'
                                  buttonStyle={styles.yes}
                                  title='Yes'
                                  buttonText={styles.yesText}
                                  onPress={this.counterReset}
                                />
                                <Button
                                  type='solid'
                                  buttonStyle={styles.no}
                                  title='No'
                                  buttonText={styles.noText}
                                  onPress={this.hideModal}
                                />
                              </View>
                            </Fragment>
                          </Overlay>
                        </View>
                      </View>
                    )
                  }}
                </Formik>
              </View>
            </View>
          </View>

          {showControlAlgorithm && (
            <Button
              buttonStyle={{...styles[`algorithm${platform}`]}}
              buttonText={{
                ...styles.registerText,
                color: colors.buttonDefault,
              }}
              title='consciously smoking algorithm'
              onPress={() =>
                navigation.navigate('Algorithm', {
                  text: i18n.t(['control']),
                  name: i18n.t(['controlName']),
                })
              }
            />
          )}
          {showSafetyAlgorithm && (
            <Button
              buttonStyle={{
                ...styles[`algorithm${platform}`],
              }}
              buttonText={{
                ...styles.registerText,
                color: colors.buttonDefault,
              }}
              title='Safety algorithm'
              onPress={() =>
                navigation.navigate('Algorithm', {
                  text: i18n.t(['safety']),
                  name: i18n.t(['safetyName']),
                })
              }
            />
          )}
          {showPetAlgorithm && (
            <Button
              buttonStyle={{
                ...styles[`algorithm${platform}`],
              }}
              buttonText={{
                ...styles.registerText,
                color: colors.buttonDefault,
              }}
              title="smart 'pet' algorithm"
              onPress={() =>
                navigation.navigate('Algorithm', {
                  text: i18n.t(['pet']),
                  name: i18n.t(['petName']),
                })
              }
            />
          )}
        </View>
        <View>
          <Button
            buttonStyle={styles[`logoutButton${platform}`]}
            buttonText={{...styles.loginText, color: colors.lightgray}}
            title='log out'
            onPress={this.showLogout}
          />
          <Button
            type='solid'
            buttonStyle={styles.reset}
            title='Reset progress'
            buttonText={styles.resetText}
            onPress={this.showReset}
          />
        </View>
        <Overlay
          isVisible={this.state.showLogoutModal}
          onBackdropPress={this.hideModal}
          width='80%'
          height={Platform.OS === 'ios' ? '20%' : '25%'}
          borderRadius={10}
          overlayStyle={{padding: 15, justifyContent: 'center'}}
        >
          <Fragment>
            <Text style={styles.modalHeader}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.logoutWrapper}>
              <Button
                type='solid'
                buttonStyle={styles.yes}
                title='Yes'
                buttonText={styles.yesText}
                onPress={this.handleLogout}
              />
              <Button
                type='solid'
                buttonStyle={styles.no}
                title='No'
                buttonText={styles.noText}
                onPress={this.hideModal}
              />
            </View>
          </Fragment>
        </Overlay>
        <Overlay
          isVisible={this.state.showResetModal}
          onBackdropPress={this.hideModal}
          width='80%'
          height={390}
          borderRadius={10}
        >
          <View style={styles.overlayView}>
            <View>
              <Text style={styles.resetHeading}>
                Warning! This will wipe out all your progress, including:
              </Text>
              <Text style={styles.listItem}>
                {'\n'} - all complete exercises
                {'\n'} - all diary entries
                {'\n'} - all achievements
                {'\n'} - all algorithms shortcuts
              </Text>
              <Text style={styles.finalWarning}>
                {'\n'}Are you sure you want to perform this action?
              </Text>
              <View style={styles.passwordWrapper}>
                <Text style={styles.password}>
                  *You need to type in the lowercase name of this application in
                  order to perform this action:
                </Text>
                <TextInput
                  style={styles.inputName}
                  autoCapitalize='none'
                  autoCorrect={false}
                  maxLength={21}
                  value={this.state.appName}
                  onChangeText={(text) => this.setState({appName: text})}
                />
              </View>
            </View>
            <View style={styles.resetWrapper}>
              <Button
                type='solid'
                buttonStyle={styles.resetYes}
                title='Reset'
                buttonText={styles.yesText}
                onPress={this.handleReset}
              />
              <Button
                type='solid'
                buttonStyle={styles.resetNo}
                title='Cancel'
                buttonText={styles.noText}
                onPress={this.hideModal}
              />
            </View>
          </View>
        </Overlay>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData.success,
    showProfit: showProfit(state),
    launched: dateLaunchedSelector(state),
    values: counterValuesSelector(state),
  }
}

const mapDispatchToProps = {
  userDataStart,
  signOut,
  wipeProgress: wipeProgressSuccess,
  counterStart,
  counterReset,
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
