import React, {Fragment} from 'react'
import {View, Text} from 'react-native'
import styles from '../../constants/styles'

const Result = props => {
  const showResult = (id, weight) => {
    if (id === '1k132x45qy') {
      if (
        weight[1] + weight[2] + weight[3] >= 24 &&
        weight[1] + weight[2] + weight[3] > 8
      ) {
        return (
          <Fragment>
            <Text style={styles.points}>
              Points scored: {weight[1] + weight[2] + weight[3]}
            </Text>
            <Text style={styles.result}>
              {'\t'}You really need help. You’ve created a psychological
              addiction to tobacco. You can see your level of addiction based on
              the high number of points you’ve scored.
            </Text>
          </Fragment>
        )
      }
      if (weight[1] >= 8) {
        return (
          <Fragment>
            <Text style={styles.points}>
              Points scored: {weight[1] + weight[2] + weight[3]}
            </Text>
            <Text style={styles.result}>
              {'\t'}Your problem is related to your values and beliefs, meaning
              that cigarettes are of great importance to you. Ask yourself: Is
              it really worthwhile for me to stop smoking?
            </Text>
          </Fragment>
        )
      }
      if (weight[2] >= 8) {
        return (
          <Fragment>
            <Text style={styles.points}>
              Points scored: {weight[1] + weight[2] + weight[3]}
            </Text>
            <Text style={styles.result}>
              {'\t'}You benefit a lot from smoking. If you stop smoking, it
              would benefit you to replace it with something that helps you in a
              similar way but is less harmful.
            </Text>
          </Fragment>
        )
      }
      if (weight[3] >= 8) {
        return (
          <Fragment>
            <Text style={styles.points}>
              Points scored: {weight[1] + weight[2] + weight[3]}
            </Text>
            <Text style={styles.result}>
              {'\t'}Smoking is just a habitual activity for you, a conditioned
              reflex. You almost never smoke consciously. You are a zombie under
              cigarettes’ control.
            </Text>
          </Fragment>
        )
      }
      if (weight[1] + weight[2] + weight[3] > 0) {
        return (
          <Fragment>
            <Text style={styles.points}>
              Points scored: {weight[1] + weight[2] + weight[3]}
            </Text>
            <Text style={styles.result}>
              {'\t'}Stop fooling around! Smoking is not a joke. Or maybe it is.
              You don't seem to have any trouble with smoking. Do whatever you
              please.
            </Text>
          </Fragment>
        )
      }
    }
    if (id === '2gwbwrvuyjg') {
      if (weight[1] >= 1 && weight[1] <= 5) {
        return (
          <Fragment>
            <Text style={styles.points}>Points scored: {weight[1]}</Text>
            <Text style={styles.result}>
              {'\t'}Your nicotine addiction is almost non-existent.
            </Text>
          </Fragment>
        )
      }
      if (weight[1] >= 6 && weight[1] < 8) {
        return (
          <Fragment>
            <Text style={styles.points}>Points scored: {weight[1]}</Text>
            <Text style={styles.result}>
              {'\t'}Your nicotine addiction can be considered fairly common.
            </Text>
          </Fragment>
        )
      }
      if (weight[1] >= 8 && weight[1] <= 11) {
        return (
          <Fragment>
            <Text style={styles.points}>Points scored: {weight[1]}</Text>
            <Text style={styles.result}>
              {'\t'}Your nicotine addiction is heavy as hell.
            </Text>
          </Fragment>
        )
      }
    }
    if (id === '3679rzz6pnn') {
      if (weight[1] >= 0 && weight[1] <= 6) {
        return (
          <Fragment>
            <Text style={styles.points}>Points scored: {weight[1]}</Text>
            <Text style={styles.result}>
              {'\t'}You don’t even have a smoking habit; you just like fooling
              around. You can stop smoking anytime. It will cost you nothing and
              you can certainly do it without anyone’s help.
            </Text>
          </Fragment>
        )
      }
      if (weight[1] >= 7 && weight[1] <= 10) {
        return (
          <Fragment>
            <Text style={styles.points}>Points scored: {weight[1]}</Text>
            <Text style={styles.result}>
              {'\t'}In order to stop smoking you must make an effort, which will
              require willpower. You can also consider getting help from a
              psychologist. If you want to do it by yourself, you can try
              nicotine patches or gum.
            </Text>
          </Fragment>
        )
      }
      if (weight[1] > 10) {
        return (
          <Fragment>
            <Text style={styles.points}>Points scored: {weight[1]}</Text>
            <Text style={styles.result}>
              {'\t'}You are addicted and your health is at risk. You will face a
              real struggle and you shouldn’t take it as a joke. You may even
              consider getting help from narcologists.
            </Text>
          </Fragment>
        )
      }
    }
  }

  const {id, weight} = props
  return (
    <View style={styles.container}>
      {id === '1k132x45qy' ? showResult(id, weight) : null}
      {id === '2gwbwrvuyjg' ? showResult(id, weight) : null}
      {id === '3679rzz6pnn' ? showResult(id, weight) : null}
    </View>
  )
}

export default Result
