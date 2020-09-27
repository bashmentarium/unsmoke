import React from 'react'
import {View, ScrollView, Text} from 'react-native'
import Slide from '../../components/Slide'
import styles from '../../constants/styles'
import colors from '../../constants/colors'

const items = [{}, {}, {}, {}, {}]

export default function(props) {
  const {navigation} = props
  const itemsPerInterval =
    props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval

  const [interval, setInterval] = React.useState(1)
  const [intervals, setIntervals] = React.useState(1)
  const [width, setWidth] = React.useState(0)

  const init = (width) => {
    // initialise width
    setWidth(width)
    // initialise total intervals
    const totalItems = items.length
    setIntervals(Math.ceil(totalItems / itemsPerInterval))
  }

  const getInterval = (offset) => {
    for (let i = 1; i <= intervals; i++) {
      if (offset < (width / intervals) * i) {
        return i
      }
      if (i == intervals) {
        return i
      }
    }
  }

  let bullets = []
  for (let i = 1; i <= intervals; i++) {
    bullets.push(
      <View
        key={i}
        style={
          Platform.OS === 'ios'
            ? {...styles.bulletWrapper, width: 25, height: 25}
            : styles.bulletWrapper
        }
      >
        <Text
          style={{
            ...styles.bullet,
            color: colors.buttonDefault,
            opacity: interval === i ? 0.5 : 0.1,
          }}
        >
          &bull;
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          ...styles.scrollView,
          width: `${100 * intervals}%`,
        }}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w, h) => init(w)}
        onScroll={(data) => {
          setWidth(data.nativeEvent.contentSize.width)
          setInterval(getInterval(data.nativeEvent.contentOffset.x + 0.5))
        }}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate='fast'
      >
        {items.map((item, index) => {
          return <Slide key={index} index={index} navigation={navigation} />
        })}
      </ScrollView>
      <View style={styles.bullets}>{bullets}</View>
    </View>
  )
}
