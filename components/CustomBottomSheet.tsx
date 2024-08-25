import { View, StyleSheet, Text, Pressable } from "react-native";
import React, { forwardRef, useMemo } from "react";
import BottomSheet, {
  BottomSheetView,
  useBottomSheet,
} from "@gorhom/bottom-sheet";
import { ChevronDownLeftIcon } from "./icons";
import { Colors } from "@/constants/Colors";
export type Ref = BottomSheet;

interface Props {
  title?: string;
  snaps?: string[];
  children?: React.ReactNode;
}

const CloseBtn = () => {
  const { close } = useBottomSheet();

  return (
    <Pressable style={styles.closeBtn} onPress={() => close()}>
      <ChevronDownLeftIcon />
      <Text style={styles.closeBtnText}>Cancel</Text>
    </Pressable>
  );
};

const CustomBottomSheet = forwardRef<Ref, Props>(
  ({ children, snaps = ["25", "50", "75"], ...props }, ref) => {
    const snapPoints = useMemo(() => snaps, [snaps]);

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        {...props}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <CloseBtn />
          </View>
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  },
);
CustomBottomSheet.displayName = "CustomBottomSheetContext";

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
  },
  closeBtn: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  closeBtnText: {
    color: Colors.primary,
    fontSize: 17,
    marginLeft: 5,
  },
});

export default CustomBottomSheet;
