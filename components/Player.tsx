import React, {useEffect, useRef, useCallback} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import VideoPlayer from 'react-native-video';
import {RewardedAds} from '../helpers/rewarded-ads';

export default function Player() {
  const playerRef = useRef<any>(null);

  const showAd = useCallback(() => {
    playerRef?.current?.setNativeProps({paused: true});

    Alert.alert('Rewarded Ad', 'Rewarded Add Showed!', [
      {
        text: 'When add watched',
        onPress: async () => {
          playerRef?.current?.setNativeProps({paused: false});
          await RewardedAds.resetTimer();
          await RewardedAds.startTimerBy({adCallback: showAd});
        },
      },
    ]);
  }, []);

  useEffect(() => {
    RewardedAds.startTimerBy({adCallback: showAd});
    return () => RewardedAds.stopTimer();
  }, [showAd]);

  return (
    <View style={{height: 300}}>
      <VideoPlayer
        ref={playerRef}
        source={{
          uri: 'https://d281kr1v4ghjf1.cloudfront.net/video/trailer.mp4',
        }}
        controls={true}
        onError={(error: any) => console.log('*errorLog', error)}
        style={styles.videoPlayer}
        // adTagUrl={`https://b9f4-78-182-139-235.ngrok.io/vmap?duration=600&selfPath=/`}
        // @ts-ignore
        // adTagUrl={`https://8504-78-182-139-235.ngrok.io/vmap?duration=3600`}
        // onBuffer={(buffering: any) => console.log('*bufferLog', buffering)}
        // onReceiveAdEvent={(e: any) => console.log('*adLog', e)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  videoPlayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
