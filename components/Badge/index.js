import React, {useState} from 'react'
import {TouchableOpacity, Image, Text, View} from 'react-native'
import {Overlay} from 'react-native-elements'
import {crossButton} from '../../assets/images'
import styles from '../../constants/styles'
import colors from '../../constants/colors'

export default function({image, description, click}) {
  const [showModal, setShowModal] = useState(false)

  showDescr = () => {
    setShowModal(true)
  }

  hideModal = () => {
    setShowModal(false)
  }
  return (
    <>
      <TouchableOpacity
        style={styles.icebreaker}
        onPress={click === false ? null : showDescr}
      >
        <Image source={image} style={styles.icebreakerBadge} />
      </TouchableOpacity>
      <Overlay
        isVisible={showModal}
        onBackdropPress={hideModal}
        width='70%'
        height={Platform.OS === 'ios' ? '37%' : '42%'}
        borderRadius={10}
        overlayBackgroundColor={colors.background}
        overlayStyle={{
          justifyContent: 'space-between',
          paddingBottom: 30,
          position: 'relative',
        }}
      >
        <>
          <TouchableOpacity style={styles.crossButton} onPress={hideModal}>
            <Image source={crossButton} style={styles.crossImage} />
          </TouchableOpacity>
          <View
            style={{
              width: 190,
              height: 190,

              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Image
              source={image}
              style={{
                width: 180,
                height: 180,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
          </View>
          <Text style={styles.badgeDescr}>{description}</Text>
        </>
      </Overlay>
    </>
  )
}
