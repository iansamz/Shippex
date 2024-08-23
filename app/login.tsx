import { Text, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  return (
    <SafeAreaView>
      <Text>Login Page</Text>
      <Link href="/shipments" asChild>
        <Pressable>
          <Text>Login</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
};

export default Login;
