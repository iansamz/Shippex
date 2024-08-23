import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Profile = () => {
  return (
    <View>
      <Text>Profile</Text>
      <Link href="/" asChild>
        <Pressable>
          <Text>Sign out</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Profile;
