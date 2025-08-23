import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from '@ant-design/react-native';
import { LoaderProps } from './types';

const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;