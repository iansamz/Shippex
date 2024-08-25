import { StyleSheet, TextInput } from "react-native";
import React from "react";

export interface InputProps {
  placeHolder: string;
  placeHolderTextColor: string;
  style?: any;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  maxLength?: number;
  editable?: boolean;
}

const Input = ({
  placeHolder,
  placeHolderTextColor,
  style,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
  autoCapitalize,
  maxLength,
  editable,
}: InputProps) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeHolder}
      placeholderTextColor={placeHolderTextColor}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      maxLength={maxLength}
      editable={editable}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 7,
    width: "90%",
    borderWidth: 2,
    borderRadius: 12,
  },
});

export default Input;
