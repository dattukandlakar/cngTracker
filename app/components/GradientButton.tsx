import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { buttonGradients, buttonStyles } from '../theme/cngTheme';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        buttonStyles.container,
        styles.container,
        pressed && !disabled && buttonStyles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <LinearGradient
        colors={buttonGradients[variant]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[buttonStyles.gradient, disabled && styles.disabledGradient]}
      >
        <Text style={[buttonStyles.text, textStyle, disabled && styles.disabledText]}>
          {title}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledGradient: {
    opacity: 0.6,
  },
  disabledText: {
    opacity: 0.7,
  },
});