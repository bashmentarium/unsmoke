import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {View, Text} from 'react-native'
import {dateLaunchedSelector, counterValuesSelector} from '../../ducks/counter'
import styles from '../../constants/styles'

export default function() {
  const [amount, setAmount] = useState(0)
  const dateLaunched = useSelector(dateLaunchedSelector)
  const values = useSelector(counterValuesSelector)

  const now = new Date()

  const secondsDiff = (now - new Date(dateLaunched)) / 1000

  const cigPrice = values.price / 20

  const dailyMoney = cigPrice * values.amount

  const centsPerSecond = dailyMoney / 86400

  useEffect(() => {
    setTimeout(() => {
      setAmount((centsPerSecond * secondsDiff).toFixed(5))
    }, 250)
  })

  return (
    <View
      style={{
        height: '40%',
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={styles.moneyCounterText}>
        ${amount === 0 ? '0.00000' : amount}
      </Text>
    </View>
  )
}
