import React, {ReactNode} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {StackHeaderProps} from '@react-navigation/stack';
import {getHeaderTitle} from '@react-navigation/elements';

import Svg from '../assets/svg';

export type HeaderProps = StackHeaderProps & {
  rightComponent?: () => ReactNode;
};

type RouteParams = {
  form?: string;
};

const Header = ({
  rightComponent,
  options,
  route,
  navigation,
}: HeaderProps & {route: {params?: RouteParams}}) => {
  const title = getHeaderTitle(options, route?.name);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.left} onPress={handleGoBack}>
        <Svg.Back width={24} height={24} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.right}>
        {rightComponent ? rightComponent() : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#EDEFF3',
    backgroundColor: '#fff',
  },
  left: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    flexGrow: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 17,
    fontWeight: 600,
  },
  right: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    flexGrow: 1,
  },
});

export default Header;
