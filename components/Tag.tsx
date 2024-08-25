import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export type TagVariant =
  | "received"
  | "delivered"
  | "on-hold"
  | "error"
  | "cancelled";

interface TagProps {
  variant: TagVariant;
  title?: string;
  style?: object;
}

const titles = {
  received: "Received",
  delivered: "Delivered",
  "on-hold": "On Hold",
  error: "Error",
  cancelled: "Cancelled",
};

const Tag = ({ variant, title, style }: TagProps) => {
  const tagTitle = title || titles[variant];

  return (
    <View style={[styles.container, styles[variant], style]}>
      <Text style={[styles.title, styles[`${variant}Text`]]}>
        {tagTitle?.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 12,
  },
  received: {
    backgroundColor: Colors.royalBlue100,
  },
  delivered: {
    backgroundColor: Colors.dryGreen100,
  },
  "on-hold": {
    backgroundColor: Colors.everSongOrange100,
  },
  error: {
    backgroundColor: Colors.krasnyiRed100,
  },
  cancelled: {
    backgroundColor: Colors.ritual100,
  },
  receivedText: {
    color: Colors.royalBlue600,
  },
  deliveredText: {
    color: Colors.dryGreen600,
  },
  "on-holdText": {
    color: Colors.everSongOrange600,
  },
  errorText: {
    color: Colors.krasnyiRed600,
  },
  cancelledText: {
    color: Colors.ritual600,
  },
});

export default Tag;
