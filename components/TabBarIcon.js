import React, { useEffect, useRef } from "react";
import { withNavigationFocus } from "react-navigation";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Image } from "react-native";
import { markAsRead } from "../ducks/exercises";
import styles from "../constants/styles";

export default function TabBarIcon({ image, focused, name }) {
  return (
    <View style={{ position: "relative" }}>
      <Image
        style={
          name === "exercises"
            ? { height: 35, width: 35 }
            : { height: 30, width: 30 }
        }
        source={image}
      />
    </View>
  );
}
export function StarTabBarIcon({ navigation, isFocused: focused, image }) {
  const amount =
    useSelector(state => state.userData.success.unreadAchievementsAmount) || 0;
  const isFocused = navigation.state.index === 2 && focused;
  const dispatch = useDispatch();

  const prevFocused = useRef(isFocused);
  useEffect(() => {
    if (!prevFocused.current && isFocused) {
      dispatch(markAsRead());
    }
    prevFocused.current = isFocused;
  }, [isFocused]);

  return (
    <View style={{ position: "relative" }}>
      <Image style={{ height: 30, width: 30 }} source={image} />
      {amount > 0 && (
        <View style={styles.iconBadge}>
          <Text style={styles.iconBadgeText}>{amount}</Text>
        </View>
      )}
    </View>
  );
}

export const StarTabBarIconContainerContainer = withNavigationFocus(
  StarTabBarIcon
);
