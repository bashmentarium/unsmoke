import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import colors from "../../constants/colors";
import { autoLogin } from "../../ducks/login";

const StartUpScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      dispatch(autoLogin());
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background
      }}
    >
      <ActivityIndicator size="large" color={colors.buttonDefault} />
    </View>
  );
};

export default StartUpScreen;
