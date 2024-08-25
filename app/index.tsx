import { View, StyleSheet, Image } from "react-native";
import React, { useRef, useCallback } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import CustomBottomSheet from "@/components/CustomBottomSheet";
import LoginForm from "@/components/LoginForm";

const logo = require("@/assets/images/logo-full.png");

const Home = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          variant="secondary"
          onPress={handlePresentModalPress}
        />
      </View>
      <CustomBottomSheet ref={bottomSheetRef} snaps={["90%"]}>
        <LoginForm />
      </CustomBottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: 208,
    height: 36,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
    marginBottom: 20,
  },
});

export default Home;
