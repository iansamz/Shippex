import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Title from "@/components/typography/Title";
import { Colors } from "@/constants/Colors";

const Intro = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.helloText}>Hello,</Text>
      <Title variant={34}>Ian Mungai</Title>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  helloText: { fontSize: 16, color: Colors.ritual500 },
});

export default Intro;
