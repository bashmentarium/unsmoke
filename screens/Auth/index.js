import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  Platform,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { loginStart, loginSelector } from "../../ducks/login";
import { logo } from "../../assets/images";
import styles from "../../constants/styles";
import Button from "../../components/Button";
import Input from "../../components/Input";
import colors from "../../constants/colors";

const platform = Platform.select({
  ios: () => "Ios",
  android: () => "Android"
})();

const Auth = ({ navigation }) => {
  const [authError, setAuthError] = useState("");
  const { loading, success, error } = useSelector(loginSelector);

  const dispatch = useDispatch();

  const loginHandler = async args => {
    await dispatch(loginStart(args));
  };

  useEffect(() => {
    if (success === true) {
      navigation.navigate("Exercises");
    } else {
      setAuthError(error);
    }
  }, [authError, error, success]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ backgroundColor: "#fcfaf8", flex: 1 }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          onSubmit={loginHandler}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email("A valid e-mail address is required")
              .required("E-mail is required"),
            password: yup.string().required("Password is required")
          })}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid
          }) => (
            <View style={styles.authWrapper}>
              <Image source={logo} style={styles.logo} />
              {authError ? (
                <Text style={styles.errorMessage}>{authError}</Text>
              ) : (
                <Text style={styles.errorMessageInvis}>ASD</Text>
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
                keyboardType="email-address"
                maxLength={35}
                clearTextOnFocus
                autoCapitalize="none"
                autoCorrect={false}
                placeholder=""
                value={values.email}
                error={touched.email ? errors.email : null}
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                returnKeyType="done"
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
              <Text
                style={
                  touched.password
                    ? errors.password
                      ? styles.errorText
                      : styles.label
                    : styles.label
                }
              >
                password
              </Text>
              <Input
                keyboardType="default"
                maxLength={21}
                clearTextOnFocus
                autoCapitalize="none"
                autoCorrect={false}
                placeholder=""
                secureTextEntry
                returnKeyType="done"
                blurOnSubmit
                value={values.password}
                error={touched.password ? errors.password : null}
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
              />
              {touched.password ? (
                errors.password ? (
                  <View style={styles.labelWrapper}>
                    <Text style={styles.errorLabel}>{errors.password}</Text>
                  </View>
                ) : (
                  <View style={styles.labelWrapper}>
                    <Text style={styles.invisError}>Aasdasd</Text>
                  </View>
                )
              ) : (
                <View style={styles.labelWrapper}>
                  <Text style={styles.invisError}>Aasdasd</Text>
                </View>
              )}
              <View style={styles.continue}>
                {loading ? (
                  <View style={styles.loaderWrapper}>
                    <ActivityIndicator
                      size="small"
                      color={colors.buttonDefault}
                    />
                  </View>
                ) : (
                  <View style={styles.loaderWrapper}>
                    <Button
                      title="continue"
                      onPress={isValid ? () => loginHandler(values) : null}
                      buttonStyle={
                        Platform.OS === "ios" ? styles.buttonIos : styles.button
                      }
                      buttonText={styles.buttonText}
                    />
                  </View>
                )}
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
      <View
        style={{
          height: "30%",
          backgroundColor: colors.background
        }}
      >
        <View style={styles.signUp}>
          <Button
            type="clear"
            title="forgot password"
            buttonText={styles.skip}
            onPress={() => navigation.navigate("ForgotPassword")}
          />
        </View>
        <View style={styles.signUp}>
          <Button
            type="clear"
            title="sign up"
            buttonText={styles.skip}
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>
        <View style={{ ...styles.signUp }}>
          <Button
            type="clear"
            title="go back"
            buttonText={styles.skip}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </>
  );
};

export default Auth;
