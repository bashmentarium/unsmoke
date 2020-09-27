import React, {useRef, useEffect, useState} from 'react'
import Video from 'react-native-video'
import {useSelector, shallowEqual, useDispatch} from 'react-redux'

const Splash = () => {
  const [playCount, setCount] = useState(0)
  const playerRef = useRef(null)
  const {dataLoaded} = useSelector(state => state.app, shallowEqual)
  const dispatch = useDispatch()

  useEffect(() => {
    if (dataLoaded && playCount > 0) {
    }
  }, [playCount, dataLoaded])

  return (
    <View style={{flex: 1}}>
      <Video
        source={require('assets/video/splash.mov')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
        ref={playerRef}
        resizeMode='cover'
      />
    </View>
  )
}

export default Splash
