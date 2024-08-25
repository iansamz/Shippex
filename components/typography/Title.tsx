import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import { MAX_FONT_SIZE_MULTIPLIER } from "@/constants/Typography";

interface TitleProps extends TextProps {
  variant?: 34 | 24 | 20 | 16 | 14 | 12 | 10;
}

const Title = ({
  children,
  style,
  variant = 20,
  ...otherProps
}: TitleProps) => {
  return (
    <Text
      {...otherProps}
      style={[styles.default, { fontSize: variant }, style]}
      maxFontSizeMultiplier={MAX_FONT_SIZE_MULTIPLIER}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontWeight: 600,
    textAlign: "left",
  },
});

export default Title;
