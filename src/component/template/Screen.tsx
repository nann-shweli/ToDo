import {ReactNode} from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  ViewStyle,
  StyleSheet,
} from 'react-native';

type ScreenProps = {
  isScroll?: boolean;
  full?: boolean;
  children: ReactNode | ReactNode[];
  bounces?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
  style?: ViewStyle;
};

const Screen = ({
  isScroll = true,
  children,
  bounces = false,
  onRefresh,
  refreshing = false,
  style,
}: ScreenProps) => {
  const ScreenView = isScroll ? ScrollView : View;

  return (
    <ScreenView
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      refreshControl={
        <RefreshControl
          enabled={true}
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={'red'}
        />
      }
      bounces={bounces}
      keyboardShouldPersistTaps="handled">
      <View style={[styles.container, style]}>{children}</View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollView: {flex: 1},
});

export default Screen;
