import React, {Component} from 'react'
import {View, Text, Alert} from 'react-native'
import {Formik} from 'formik'
import Button from '../../components/Button'
import Input from '../../components/Input'
import styles from '../../constants/styles'
import colors from '../../constants/colors'
import {withFirebaseHOC} from '../../config/Firebase'
import * as yup from 'yup'

class ForgotPassword extends Component {
  state = {
    error: null,
  }

  handleReset = async (email) => {
    const {navigation, firebase} = this.props

    try {
      await firebase.passwordReset(email)
      Alert.alert('Password reset email sent', 'Check your email inbox!', [
        {text: 'OK', onPress: () => navigation.navigate('Auth')},
      ])
    } catch (e) {
      if (e.message) {
        this.setState({error: "Couldn't send reset email"})
        setTimeout(() => {
          this.setState({error: null})
        }, 5000)
      }
    }
  }

  render() {
    const {navigation} = this.props

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
        }}
      >
        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={null}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email('A valid e-mail address is required')
              .required('E-mail is required'),
          })}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
          }) => (
            <>
              {this.state.error ? (
                <Text style={styles.errorMessage}>{this.state.error}</Text>
              ) : (
                <Text style={styles.errorMessageInvis}>Asdasdasd</Text>
              )}
              <Text
                style={
                  touched.email
                    ? errors.email
                      ? styles.errorText
                      : styles.label
                    : styles.label
                }
              >
                e-mail address
              </Text>
              <Input
                keyboardType='email-address'
                maxLength={35}
                clearTextOnFocus
                autoCapitalize='none'
                autoCorrect={false}
                placeholder=''
                value={values.email}
                error={touched.email ? errors.email : null}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                returnKeyType='done'
                blurOnSubmit
              />
              {touched.email ? (
                errors.email ? (
                  <View style={styles.labelWrapper}>
                    <Text style={styles.errorLabel}>{errors.email}</Text>
                  </View>
                ) : (
                  <View style={styles.labelWrapper}>
                    <Text style={styles.invisError}>ASDASD</Text>
                  </View>
                )
              ) : (
                <View style={styles.labelWrapper}>
                  <Text style={styles.invisError}>ASDASD</Text>
                </View>
              )}

              <View style={styles.continue}>
                <View style={styles.loaderWrapper}>
                  <Button
                    title='send reset email'
                    onPress={
                      isValid ? () => this.handleReset(values.email) : null
                    }
                    buttonStyle={
                      Platform.OS === 'ios' ? styles.buttonIos : styles.button
                    }
                    buttonText={styles.buttonText}
                  />
                </View>
                <View style={styles.signUp}>
                  <Button
                    type='clear'
                    title='go back'
                    buttonText={styles.skip}
                    onPress={() => navigation.goBack()}
                  />
                </View>
              </View>
            </>
          )}
        </Formik>
      </View>
    )
  }
}

export default withFirebaseHOC(ForgotPassword)
