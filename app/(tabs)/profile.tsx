import { Text, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <Link href="/" asChild>
        <Pressable>
          <Text>Sign out</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
};

export default Profile;
