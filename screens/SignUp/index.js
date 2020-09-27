import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { withFirebaseHOC } from "../../config/Firebase";
import { signUpStart, signUpSelector } from "../../ducks/signUp";
import styles from "../../constants/styles";
import colors from "../../constants/colors";
import Input from "../../components/Input";
import Button from "../../components/Button";

const platform = Platform.select({
  ios: () => "Ios",
  android: () => "Android"
})();

const SignUp = ({ navigation, firebase }) => {
  const [authError, setAuthError] = useState("");
  const { loading, success, error } = useSelector(signUpSelector);

  const dispatch = useDispatch();

  const handleSubmit = async args => {
    await dispatch(signUpStart(args));
  };

  useEffect(() => {
    if (success === true) {
      navigation.navigate("Exercises");
    } else {
      setAuthError(error);
    }
  }, [authError, error, success]);

  const { width } = Dimensions.get("window");

  return (
    <>
      <KeyboardAvoidingView
        style={{ backgroundColor: "#fcfaf8", flex: 1 }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: ""
          }}
          onSubmit={handleSubmit}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email("A valid e-mail address is required")
              .required("E-mail is required"),
            password: yup
              .string()
              .min(6, "Password is too short")
              .max(20, "Password is too long")
              .required("Password is required"),
            confirmPassword: yup
              .string()
              .required("Re-enter password is required")
              .test("passwords-match", "Passwords must match", function(value) {
                return this.parent.password === value;
              })
          })}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit
          }) => (
            <>
              <View style={styles.authWrapper}>
                {authError ? (
                  <Text style={styles.errorMessage}>{authError}</Text>
                ) : (
                  <Text style={styles.errorMessageInvis}>ASD</Text>
                )}
                <View
                  style={{
                    justifyContent: "center",
                    height: 50
                  }}
                >
                  <Text style={styles.headings}>
                    Fill in the fields and press "Sign up"
                  </Text>
                </View>

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
                  clearTextOnFocus={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder=""
                  returnKeyType="done"
                  blurOnSubmit
                  value={values.email}
                  error={touched.email ? errors.email : null}
                  onChangeText={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                  inputStyle={
                    touched.email
                      ? errors.email
                        ? styles.errorInput
                        : styles.input
                      : styles.input
                  }
                />
                {touched.email ? (
                  errors.email ? (
                    <View style={styles.labelWrapper}>
                      <Text style={styles.errorLabel}>{errors.email}</Text>
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
                  clearTextOnFocus
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder=""
                  value={values.password}
                  error={touched.password ? errors.password : null}
                  onChangeText={handleChange("password")}
                  style={
                    touched.password
                      ? errors.password
                        ? styles.errorInput
                        : styles.input
                      : styles.input
                  }
                  onBlur={() => setFieldTouched("password")}
                  returnKeyType="done"
                  blurOnSubmit
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
                <Text
                  style={
                    touched.confirmPassword
                      ? errors.confirmPassword
                        ? styles.errorText
                        : styles.label
                      : styles.label
                  }
                >
                  re-enter password
                </Text>
                <Input
                  clearTextOnFocus
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder=""
                  value={values.confirmPassword}
                  error={
                    touched.confirmPassword ? errors.confirmPassword : null
                  }
                  onChangeText={handleChange("confirmPassword")}
                  inputStyle={
                    touched.confirmPassword
                      ? errors.confirmPassword
                        ? styles.errorInput
                        : styles.input
                      : styles.input
                  }
                  onBlur={() => setFieldTouched("confirmPassword")}
                  returnKeyType="done"
                  blurOnSubmit
                />
                {touched.confirmPassword ? (
                  errors.confirmPassword ? (
                    <View style={styles.labelWrapper}>
                      <Text style={styles.errorLabel}>
                        {errors.confirmPassword}
                      </Text>
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
                <View style={styles.agreeWrapper}>
                  <Text style={styles.agree}>
                    By signing up, you agree to our
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      height: 40,
                      width: "100%",
                      justifyContent: "center"
                    }}
                  >
                    <Button
                      type="clear"
                      title="Terms and Conditions"
                      buttonText={styles.link}
                      buttonStyle={{
                        width: 180
                      }}
                      onPress={() => navigation.navigate("TermsConditions")}
                    />
                    <View style={{ justifyContent: "center" }}>
                      <Text style={styles.agree}>&</Text>
                    </View>
                    <Button
                      type="clear"
                      title="Privacy Policy"
                      buttonText={styles.link}
                      buttonStyle={{
                        width: 120
                      }}
                      onPress={() => navigation.navigate("PrivacyPolicy")}
                    />
                  </View>
                </View>
                <View style={styles.continue}>
                  {loading ? (
                    <View style={styles.loaderWrapper}>
                      <ActivityIndicator
                        size="small"
                        color={colors.buttonDefault}
                        style={{ height: 37 }}
                      />
                    </View>
                  ) : (
                    <View style={styles.loaderWrapper}>
                      <Button
                        title="sign up"
                        buttonStyle={
                          Platform.OS === "ios"
                            ? styles.buttonIos
                            : styles.button
                        }
                        buttonText={styles.buttonText}
                        onPress={isValid ? () => handleSubmit(values) : null}
                      />
                    </View>
                  )}
                </View>
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
      <View style={{ height: "17%", backgroundColor: colors.background }}>
        <Button
          type="clear"
          title="go back"
          buttonText={styles.skip}
          onPress={() => navigation.goBack()}
        />
      </View>
    </>
  );
};

export default withFirebaseHOC(SignUp);
