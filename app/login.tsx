import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Login = () => {
  return (
    <View>
      <Text>Login Page</Text>
      <Link href="/shipments" asChild>
        <Pressable>
          <Text>Login</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Login;
