import {useNavigation as useRNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export const useNavigation = () => {
  const {navigate, replace, reset, goBack, pop, setParams} =
    useRNavigation<StackNavigationProp<any>>();

  return {
    navigate,
    replace,
    reset,
    goBack,
    pop,
    setParams,
  };
};
