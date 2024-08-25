import { StyleSheet, TextInput } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

export interface InputProps {
  placeHolder: string;
  style?: any;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  maxLength?: number;
  editable?: boolean;
  prefix?: React.ReactNode;
}

// interface InputReference extends TextInput {
//   value: string;
// }

const Input = ({
  placeHolder,
  style,
  value,
  onChangeText,
  ...props
}: InputProps) => {
  // const [isFocused, setIsFocused] = useState(false);
  // const [isFilled, setIsFilled] = useState(false);

  // const inputRef = useRef<InputReference>(null);

  // const handleInputFocus = useCallback(() => {
  //   setIsFocused(true);
  // }, []);

  // const handleInputBlur = useCallback(() => {
  //   setIsFocused(false);

  //   if (inputRef.current) setIsFilled(!!inputRef.current.value);
  // }, []);

  // const handleChangeText = useCallback((text: string) => {
  //   if (inputRef.current) inputRef.current.value = text;
  // }, []);

  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeHolder}
      placeholderTextColor={Colors.ritual400}
      value={value}
      onChangeText={onChangeText}
      {...props}
    />
    // <View style={styles.container}>
    //   <Text
    //     style={[styles.label, isFilled || isFilled ? styles.labelTouched : {}]}
    //     onPress={() => setIsFocused(!isFocused)}
    //   >
    //     {placeHolder}
    //   </Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: Colors.primary,
    backgroundColor: Colors.ritual100,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    fontSize: 17,
  },
  // container: {
  //   backgroundColor: Colors.ritual200,
  //   width: "100%",
  //   paddingHorizontal: 10,
  //   paddingVertical: 20,
  //   borderRadius: 10,
  // },
  // label: {
  //   color: Colors.ritual400,
  //   width: "100%",
  //   transform: [{ translateY: +25 }],
  //   fontSize: 16,
  // },
  // labelTouched: {
  //   transform: [{ translateY: -20 }],
  //   fontSize: 12,
  // },
  // input: {
  //   color: Colors.primary,
  //   flex: 1,
  //   fontSize: 17,
  //   padding: 0,
  //   margin: 0,
  //   width: "100%",
  // },
});

export default Input;
