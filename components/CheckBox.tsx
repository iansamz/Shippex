import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";

interface CheckBoxProps {
  title: string;
  isChecked: boolean;
  style?: object;
  textStyle?: object;
  onPress: () => void;
}

const CheckBox = ({
  title,
  isChecked,
  style,
  textStyle,
  onPress,
}: CheckBoxProps) => {
  return (
    <View style={[styles.container, style]}>
      <Pressable
        onPress={onPress}
        style={[
          styles.checkContainer,
          {
            backgroundColor: isChecked ? Colors.royalBlue100 : "white",
            borderColor: isChecked ? Colors.royalBlue100 : Colors.ritual200,
          },
        ]}
      >
        {isChecked ? (
          <MaterialCommunityIcons
            name="check"
            size={16}
            color={isChecked ? Colors.primary : "white"}
          />
        ) : null}
      </Pressable>
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: 150,
    marginTop: 5,
    marginHorizontal: 5,
  },
  checkContainer: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    color: "#000",
    marginLeft: 5,
    fontWeight: "600",
  },
});
