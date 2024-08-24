import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Colors } from "@/constants/Colors";

export interface ButtonProps {
  onPress?: () => void;
  onLongPress?: () => void;
  variant?: "primary" | "secondary";
  title: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  style?: any;
  textStyle?: any;
  disabled?: boolean;
  activeOpacity?: number;
  loading?: boolean;
}

const Button = ({
  onPress,
  onLongPress,
  variant = "primary",
  title,
  iconLeft,
  iconRight,
  style,
  textStyle,
  disabled,
  activeOpacity,
  loading,
}: ButtonProps) => {
  const buttonStyleVariant = [
    styles.button,
    variant === "primary" ? styles.primaryButton : styles.secondaryButton,
    disabled ? (variant === "primary" ? styles.primaryButtonDisabled : styles.secondaryButtonDisabled) : {},
    style,
  ];

  const textStyleVariant = [
    styles.buttonText,
    variant === "primary"
      ? styles.primaryButtonText
      : styles.secondaryButtonText,
    disabled ? (variant === "primary" ? styles.primaryButtonDisabledText : styles.secondaryButtonDisabledText) : {},
    textStyle,
  ];

  const activityColorVariant = variant === "primary" ? "white" : Colors.primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={buttonStyleVariant}
    >
      {iconLeft}
      {loading ? (
        <ActivityIndicator color={activityColorVariant} />
      ) : (
        <Text style={textStyleVariant}>{title}</Text>
      )}
      {iconRight}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // defaults
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  disabledButton: {
    backgroundColor: Colors.button.primary.disabled,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
  },

  // variants
  primaryButton: {
    backgroundColor: Colors.button.primary.background,
  },
  primaryButtonText: {
    color: Colors.button.primary.text,
  },
  primaryButtonPressed: {
    backgroundColor: Colors.button.primary.pressedBackground,
  },
  primaryButtonDisabled: {
    backgroundColor: Colors.button.primary.disabled,
  },
  primaryButtonDisabledText: {
    color: Colors.button.primary.disabledText,
  },
  
  secondaryButton: {
    backgroundColor: Colors.button.secondary.background,
  },
  secondaryButtonText: {
    color: Colors.button.secondary.text
  },
  secondaryButtonPressed: {
    backgroundColor: Colors.button.secondary.pressedBackground,
  },
  secondaryButtonDisabled: {
    backgroundColor: Colors.button.secondary.disabled,
  },
  secondaryButtonDisabledText: {
    color: Colors.button.secondary.disabledText,
  },
});

export default Button;
