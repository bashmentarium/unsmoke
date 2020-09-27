import React, {useState} from 'react'
import {connect} from 'react-redux'
import {View, Text, Image, TouchableOpacity, Platform} from 'react-native'
import styles from '../../constants/styles'
import {Overlay, ButtonGroup} from 'react-native-elements'
import Button from '../../components/Button'
import arrowDown from '../../assets/images/icons/arrow-down.png'
import {selectedAnswerId} from '../../ducks/question'

const Question = props => {
  const [visible, setVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(props.selectedId)

  const showDialog = () => {
    setVisible(true)
  }

  const hideDialog = () => {
    setVisible(false)
  }

  const handleSubmit = () => {
    hideDialog()
    props.onSelect(props.question.id, selectedItem)
  }

  const handleSelect = index => {
    setSelectedItem(props.question.options[index].id)
  }

  const {name, options, group} = props.question
  const selectedIndex = options.findIndex(option => option.id === selectedItem)
  const buttons = options.map(option => option.name)
  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>{name}</Text>
      <TouchableOpacity
        style={
          Platform.OS === 'ios' ? styles.dropdownIos : styles.dropdownAndroid
        }
        onPress={showDialog}
      >
        <Button
          buttonStyle={styles.dropdownButton}
          onPress={showDialog}
          title={
            options[selectedIndex]
              ? options[selectedIndex].name
              : 'select an option'
          }
          buttonText={styles.dropdownText}
        />
        <Image source={arrowDown} style={styles.arrowDown} />
      </TouchableOpacity>
      <Overlay
        isVisible={visible}
        onBackdropPress={
          options[selectedIndex]
            ? () => handleSubmit(options[selectedIndex].weight, group)
            : hideDialog
        }
        width='80%'
        height={Platform.OS === 'ios' ? '45%' : '50%'}
        borderRadius={10}
      >
        <View style={styles.overlayWrapper}>
          <View style={styles.cover1} />
          <View style={styles.cover2} />
          <Text style={styles.selectOption}>Select an option</Text>
          <View style={styles.groupWrapper}>
            <ButtonGroup
              buttons={buttons}
              onPress={handleSelect}
              buttonStyle={styles.buttonStyle}
              containerStyle={styles.buttonGroup}
              selectedIndex={selectedIndex}
              innerBorderStyle={styles.innerBorder}
              selectedButtonStyle={styles.selectedButton}
              selectedTextStyle={styles.selectedText}
              textStyle={styles.textStyle}
            />
          </View>
          <Button
            type='solid'
            buttonStyle={styles.selectButton}
            title='Select'
            buttonText={styles.selectButtonText}
            onPress={
              options[selectedIndex]
                ? () => handleSubmit(options[selectedIndex].weight, group)
                : null
            }
          />
        </View>
      </Overlay>
    </View>
  )
}

const mapStateToProps = (state, ownProps) => ({
  selectedId: selectedAnswerId(state, ownProps)
})

export default connect(mapStateToProps)(Question)
