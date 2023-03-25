import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import VideoPlayer from 'react-native-video';
import {
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import {RewardedAds} from '../helpers/rewarded-ads';

const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED);

export default function Player() {
  const playerRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

  const showAd = useCallback(() => {
    playerRef?.current?.setNativeProps({paused: true});
    Alert.alert(
      'Aşkın Gücü',
      "Video'ya devam edebilmek için kisa bir reklam izlemen gerekiyor.",
      [
        {
          text: 'İzle',
          onPress: () => rewarded.show(),
        },
        {
          text: 'Kapat',
          style: 'cancel',
          onPress: () => console.log('Ask me later pressed'),
        },
      ],
    );
  }, []);

  const startVideoAndTimer = async () => {
    playerRef?.current?.setNativeProps({paused: false, volume: 1.0});
    await RewardedAds.startTimerBy({adCallback: showAd});
  };

  const resetTimer = async () => {
    await RewardedAds.resetTimer();
  };

  useEffect(() => {
    RewardedAds.startTimerBy({adCallback: showAd});
    return () => RewardedAds.stopTimer();
  }, [showAd]);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        resetTimer();

        console.log('User earned reward of ', reward);
      },
    );

    const unsubscribeClosed = rewarded.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        startVideoAndTimer();
        rewarded.load();
      },
    );

    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
    };
  }, []);

  return (
    <View style={{height: 300}}>
      <VideoPlayer
        ref={playerRef}
        source={{
          uri: 'https://d281kr1v4ghjf1.cloudfront.net/video/trailer.mp4',
        }}
        controls={true}
        paused={false}
        fullscreen={true}
        fullscreenOrientation={'landscape'}
        onError={(error: any) => console.log('*errorLog', error)}
        style={styles.videoPlayer}
        // @ts-ignore
        // adTagUrl={`https://8504-78-182-139-235.ngrok.io/vmap?duration=3600`}
        // onReceiveAdEvent={(e: any) => console.log('*adLog', e)}
      />

      <View>
        <Text>{loaded ? 'reklam yüklendi' : 'reklam yüklenmedi'}</Text>
      </View>
    </View>
  );
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
