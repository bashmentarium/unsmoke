import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { logo } from "../../assets/images";
import styles from "../../constants/styles";
import { questionsByQuestionnairesId, answerStart } from "../../ducks/question";
import {
  getCompleteQuestionnaires,
  getAllQuestionnaires,
  getAnswersWeightByGroup,
  isCompleted
} from "../../ducks/questionnaires";
import { completeExerciseStart } from "../../ducks/exercises";
import { completeQuestionnaireStart } from "../../ducks/questionnaire";
import Question from "../../components/Question";
import Button from "../../components/Button";
import Result from "../../components/Result";

class Questionnaire extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam("screenName"),
    headerTitleStyle: {
      textAlign: "center",
      width: "85%",
      fontFamily: "regular",
      fontSize: 18
    },
    headerRight: () => (
      <TouchableOpacity style={{ width: 50, height: 50 }}>
        <Image source={logo} width={50} />
      </TouchableOpacity>
    ),
    headerBackTitle: null
  });

  state = {
    showResults: false,
    exercise: null
  };

  componentDidMount() {
    const exercise = this.props.navigation.getParam("exercise");
    this.setState({ exercise });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.completeQuestionnaires !== this.props.completeQuestionnaires
    ) {
      if (this.props.allQuestionnaires.length > 2) {
        this.props.completeExerciseStart({
          id: "42oag03key8",
          nextExerciseId: "5w8hc1kopqs"
        });
      }
    }
  }

  handleButtonPress = id => {
    if (this.props.isLoggedIn === true) {
      if (this.props.isCompleted) {
        this.props.completeQuestionnaireStart(id);
        this.setState({ showResults: true });
      }
    } else {
      this.props.navigation.navigate("SignUp");
    }
  };

  handleSelect = (questionId, optionId) => {
    this.props.answerStart({ questionId, optionId });
    this.setState({ [questionId]: optionId }, this.calculateWeights);
  };

  calculateWeights = () => {
    const exercise = this.props.navigation.getParam("exercise");
    const { questions } = exercise;
    const totalWeightsByGroup = questions.reduce((accumulator, question) => {
      if (!accumulator[question.group]) {
        accumulator[question.group] = 0;
      }
      const answer = question.options.find(
        option => option.id === this.state[question.id]
      );

      if (!answer) return accumulator;

      accumulator[question.group] += answer.weight;
      return accumulator;
    }, {});
    this.setState({ totalWeightsByGroup });
  };

  get questions() {
    const exercise = this.props.navigation.getParam("exercise");
    return exercise.questions.map(question => (
      <Question
        key={question.id}
        question={question}
        onSelect={this.handleSelect}
      />
    ));
  }

  render() {
    const exercise = this.props.navigation.getParam("exercise");
    return (
      <ScrollView
        style={{ ...styles.bg, backgroundColor: "#fcfaf8" }}
        contentContainerStyle={{ paddingBottom: 30, paddingTop: 20 }}
      >
        {this.state.showResults ||
        this.props.completeQuestionnaires[exercise.id] ? (
          <Result id={exercise.id} weight={this.props.weightByGroup} />
        ) : (
          <>
            <Text style={styles.heading}>
              You can provide an answer by choosing an option from the menu.
            </Text>
            <Text style={{ ...styles.heading, marginBottom: 40 }}>
              To see your {exercise.name.replace(/^(.{1}[^\s]*).*/, "$1")}{" "}
              addiction level, answer all the questions and tap "Display
              results" at the bottom of the page.
            </Text>
            {this.questions}
            <View
              style={{
                ...styles.continue,
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 20
              }}
            >
              <Button
                title="display results"
                buttonText={styles.buttonText}
                buttonStyle={
                  Platform.OS === "ios" ? styles.buttonIos : styles.button
                }
                onPress={() => this.handleButtonPress(exercise.id)}
              />
            </View>
          </>
        )}
      </ScrollView>
    );
  }
}

Questionnaire.defaultProps = {
  completeQuestionnaires: {},
  questions: []
};

const mapStateToProps = (state, ownProps) => {
  return {
    // questions: questionsByQuestionnairesId(
    //   state,
    //   ownProps.navigation.state.params.exercise
    // ),
    weightByGroup: getAnswersWeightByGroup(
      state,
      ownProps.navigation.state.params.exercise
    ),
    isCompleted: isCompleted(state, ownProps.navigation.state.params.exercise),
    completeQuestionnaires: getCompleteQuestionnaires(state),
    allQuestionnaires: getAllQuestionnaires(state),
    isLoggedIn: state.login.success
  };
};

const mapDispatchToProps = {
  answerStart,
  completeQuestionnaireStart,
  completeExerciseStart
};

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaire);
