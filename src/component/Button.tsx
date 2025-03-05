import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type ButtonProps = {
  label?: string;
  onPress?: () => void;
};

const Button = ({label = 'Title', onPress}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    paddingVertical: 12,
    marginHorizontal: 20,
    borderRadius: 100,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  label: {
    fontSize: 15,
    color: '#fff',
  },
});

export default Button;
