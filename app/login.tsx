import { Text, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLoginMutation } from "@/store/services/api";

const Login = () => {
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
    <SafeAreaView>
      <Text>Login Page</Text>

      <Pressable onPress={handleLogin}>
        <Text>{isLoading ? "Loading..." : "Login"}</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Login;
