import AsyncStorage from '@react-native-async-storage/async-storage';
let currentTime: number = 0;
let timer: any;
const adPeriodInSeconds: number = 10;

const showAd = (callback: any) => {
  callback();
};

export const RewardedAds: any = {
  startTimerBy: async ({adCallback}: any) => {
    console.log('Timer started!');
    clearInterval(timer);
    currentTime = Number(await AsyncStorage.getItem('currentTime')) | 0;

    timer = setInterval(() => {
      currentTime += 1;

      console.log({currentTime});

      if (currentTime > adPeriodInSeconds) {
        showAd(adCallback);
        RewardedAds.resetTimer();
      }
    }, 1000);
  },
  stopTimer: async () => {
    clearInterval(timer);
    await AsyncStorage.setItem('currentTime', JSON.stringify(currentTime));
    console.log('Timer stopped!');
  },
  resetTimer: async () => {
    clearInterval(timer);
    await AsyncStorage.setItem('currentTime', JSON.stringify(0));
    console.log('Timer reset!');
  },
};
