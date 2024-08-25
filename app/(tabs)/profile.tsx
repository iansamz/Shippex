import { Text, StyleSheet, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useGetLoggedInUserQuery,
  useLogoutMutation,
} from "@/store/services/api";
import PageLoading from "@/components/PageLoading";
import Button from "@/components/Button";
import Title from "@/components/typography/Title";

const Profile = () => {
  const router = useRouter();
  const { data: user, error, isLoading } = useGetLoggedInUserQuery();
  const [logout, { isLoading: logoutIsLoading }] = useLogoutMutation();

  if (isLoading) {
    return <PageLoading />;
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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Title variant={34}>Profile</Title>
        <Title variant={20}>User: {user?.message}</Title>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Logout"
          onPress={handleLogout}
          loading={logoutIsLoading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
  },

  buttonContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
    marginBottom: 20,
  },
});

export default Profile;
