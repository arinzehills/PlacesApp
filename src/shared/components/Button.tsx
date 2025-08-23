import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button as AntButton } from '@ant-design/react-native';
import { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  ...props
}) => {
  const getButtonType = () => {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'ghost';
      case 'outline':
        return 'ghost';
      default:
        return 'primary';
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return 'small';
      case 'large':
        return 'large';
      default:
        return undefined;
    }
  };

  return (
    <AntButton
      type={getButtonType()}
      size={getButtonSize()}
      loading={loading}
      disabled={disabled}
      style={[styles.button, style]}
      {...props}
    >
      {title}
    </AntButton>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
  },
});

export default Button;