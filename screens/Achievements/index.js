import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import {
  unlockedAchievementsSelector,
  unreadAchievementsSelector,
  NOOB,
  SAVANT,
  COMEDIAN,
  MASTER,
  AWAKEN
} from "../../ducks/exercises";
import {
  icebreaker,
  savant,
  comedian,
  awaken,
  transformer,
  disabled
} from "../../assets/images/badges";
import Badge from "../../components/Badge";
import styles from "../../constants/styles";
import colors from "../../constants/colors";

const descriptions = {
  icebreaker: "You broke up the ice by completing the first exercise",
  savant: "You dug deeper inside yourself",
  novice: "You completed 25 exercises",
  comedian: "Hopefully, you had a laugh",
  transformer: "You can now transform yourself at will",
  awaken: "You woke up from the mental paralysis"
};

class Achievements extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Achievements",
    headerTitleStyle: {
      textAlign: "center",
      width: "90%",
      fontFamily: "bold",
      fontSize: 20
    }
  });

  render() {
    const { unlockedAchievements } = this.props;
    const { length } = this.props.unlockedAchievements;
    return (
      <View
        style={
          length === 0
            ? { ...styles.center, backgroundColor: colors.background }
            : {
                ...styles.addictionsContainer,
                backgroundColor: colors.background,
                flex: 1
              }
        }
      >
        {length > 0 ? (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingTop: 20,
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
              paddingBottom: 20
            }}
          >
            {unlockedAchievements.includes(NOOB) ? (
              <Badge image={icebreaker} description={descriptions.icebreaker} />
            ) : (
              <Badge image={disabled} click={false} />
            )}
            {unlockedAchievements.includes(SAVANT) ? (
              <Badge image={savant} description={descriptions.savant} />
            ) : (
              <Badge image={disabled} click={false} />
            )}
            {unlockedAchievements.includes(MASTER) ? (
              <Badge
                image={transformer}
                description={descriptions.transformer}
              />
            ) : (
              <Badge image={disabled} click={false} />
            )}
            {unlockedAchievements.includes(COMEDIAN) ? (
              <Badge image={comedian} description={descriptions.comedian} />
            ) : (
              <Badge image={disabled} click={false} />
            )}
            {unlockedAchievements.includes(AWAKEN) ? (
              <Badge image={awaken} description={descriptions.awaken} />
            ) : (
              <Badge image={disabled} click={false} />
            )}
          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.noDiary}>You need to complete exercises</Text>
            <Text style={styles.noDiary}>in order to unlock achievements</Text>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.login.success,
    unreadAchievements: unreadAchievementsSelector(state),
    unlockedAchievements: unlockedAchievementsSelector(state)
  };
};

export default connect(mapStateToProps)(Achievements);
