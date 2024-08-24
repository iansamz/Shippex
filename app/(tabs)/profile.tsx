import { Text, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useGetLoggedInUserQuery,
  useLogoutMutation,
} from "@/store/services/api";

const Profile = () => {
  const router = useRouter();
  const { data: user, error, isLoading } = useGetLoggedInUserQuery();
  const [logout, { isLoading: logoutIsLoading }] = useLogoutMutation();

  if (isLoading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error || !user?.message) {
    return (
      <SafeAreaView>
        <Text>Error Occured </Text>
      </SafeAreaView>
    );
  }

  const handleLogout = async () => {
    await logout().unwrap();

    router.replace("/");
  };

  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <Text>{isLoading ? "Loading..." : user?.message}</Text>
      <Pressable onPress={handleLogout}>
        <Text>{logoutIsLoading ? "Loading..." : "Logout"}</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Profile;
