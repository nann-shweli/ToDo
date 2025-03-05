import {StatusBar as RNStatusBar} from 'react-native';

const StatusBar = () => {
  return (
    <RNStatusBar
      showHideTransition="slide"
      barStyle={'dark-content'}
      translucent
      animated
    />
  );
};

export default StatusBar;
