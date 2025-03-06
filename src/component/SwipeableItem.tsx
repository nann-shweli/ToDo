import React, {useRef} from 'react';
import {
  Animated,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Svg from '../assets/svg';
import {useNavigation} from '../hooks/useNavigation';

const SwipeableItem = ({item, onEdit, onDelete}: any) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const threshold = -160; // Distance to reveal buttons
  const {navigate} = useNavigation();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          translateX.setValue(Math.max(gestureState.dx, threshold * 1.2)); // Allow slight overswipe
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < threshold / 2) {
          // Snap open to reveal buttons
          Animated.timing(translateX, {
            toValue: threshold,
            duration: 200,
            useNativeDriver: true,
          }).start();
        } else {
          // Snap back to original position
          Animated.timing(translateX, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const handlePress = (data: any) => {
    navigate('NewTask', {data: data});
  };

  return (
    <View style={styles.container}>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => onEdit(item)}>
          <Svg.Edit width={30} height={30} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => onDelete(item.id)}>
          <Svg.Trash />
        </TouchableOpacity>
      </View>

      {/* Swipeable Item (Moves Left to Uncover Buttons) */}
      <Animated.View
        style={[styles.item, {transform: [{translateX}]}]}
        {...panResponder.panHandlers}>
        <TouchableOpacity onPress={() => handlePress(item)} activeOpacity={0.7}>
          <Text style={styles.text}>
            {item.title.trim() ? item.title : item.body.split('\n')[0].trim()}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  actionContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    height: '100%',
  },
  actionButton: {
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#3460DC',
  },
  deleteButton: {
    backgroundColor: '#720600',
  },
  item: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderColor: '#ccc',
    backgroundColor: '#FCFCFC',
  },
  text: {
    fontSize: 16,
  },
});

export default SwipeableItem;
