import { Text, View, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useLoginMutation } from "@/store/services/api";
import Title from "@/components/typography/Title";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";

const LoginForm = () => {
  const router = useRouter();
  const [signIn, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    await signIn({
      usr: "test@brandimic.com",
      pwd: "testy123@",
    }).unwrap();

    router.replace("/(tabs)/shipments");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Title variant={34}>Login</Title>
        <Text style={styles.subTitle}>
          Please enter your First, Last name and your phone number in order to
          register
        </Text>
      </View>

      <View style={styles.formContainer}></View>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} loading={isLoading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    flex: 0,
    gap: 10,
  },
  subTitle: {
    fontSize: 16,
    color: Colors.ritual500,
  },
  formContainer: {
    marginTop: 20,
    flex: 1,
    justifyContent: "flex-start",
    gap: 10,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
    marginBottom: 20,
  },
});

export default LoginForm;
