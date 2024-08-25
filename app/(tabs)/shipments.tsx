import { useCallback, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { debounce } from "lodash";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  useGetShipmentListQuery,
  useGetShipmentStatusListQuery,
} from "@/store/services/api";
import Header from "@/components/shipments/Header";
import Intro from "@/components/shipments/Intro";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { AddScanIcon, FilterIcon } from "@/components/icons";
import CustomBottomSheet from "@/components/CustomBottomSheet";

export default function ShipmentsScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [selectedStatusFilters, setSelectedStatusFilters] = useState<string[]>(
    [],
  );

  const {
    data: statuses,
    error: statusError,
    isLoading: statusIsLoading,
  } = useGetShipmentStatusListQuery();

  const { data, error, isLoading } = useGetShipmentListQuery({
    filters: {
      name: ["like", `%${debouncedSearchTerm}%`],
      status: ["in", statusFilters],
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncer = useCallback(debounce(setDebouncedSearchTerm, 500), []);
  const snapPoints = useMemo(() => ["30%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  if (isLoading || statusIsLoading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error || !data?.message || statusError || !statuses?.message) {
    return (
      <SafeAreaView>
        <Text>Error Occured </Text>
      </SafeAreaView>
    );
  }

  const onSearchTermChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    if (newSearchTerm !== searchTerm) {
      debouncer(newSearchTerm);
    }
  };

  const onSelectStatusFilter = (status: string) => {
    if (selectedStatusFilters.includes(status)) {
      setSelectedStatusFilters((prev) =>
        prev.filter((item) => item !== status),
      );
    } else {
      setSelectedStatusFilters((prev) => [...prev, status]);
    }
  };

  const onSelectedStatusFilters = () => {
    setStatusFilters(selectedStatusFilters);
    handleCloseBottomSheet();
  };

  const handleCloseBottomSheet = () => bottomSheetRef.current?.close();
  const handleOpenBottomSheet = () => bottomSheetRef.current?.expand();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Intro />
      <Input
        value={searchTerm}
        onChangeText={onSearchTermChange}
        placeHolder="Search"
      />
      <View style={styles.btnsContainer}>
        <Button
          title="Filter"
          variant="tertiary"
          iconLeft={<FilterIcon />}
          onPress={handleOpenBottomSheet}
          style={styles.btn}
        />
        <Button
          title="Add Scan"
          iconLeft={<AddScanIcon />}
          onPress={() => {}}
          style={styles.btn}
        />
      </View>

      <CustomBottomSheet ref={bottomSheetRef} snaps={["40%"]}>
        {/* <LoginForm /> */}
      </CustomBottomSheet>

      {/* <Text>Home</Text>
      <TextInput value={searchTerm} onChangeText={onSearchTermChange} />
      <Button title="Open Bottom Sheet" onPress={handleOpenBottomSheet} />

      {data.message.map((shipment, index) => {
        return <Text key={`${shipment.idx}-${index}`}>{shipment.name}</Text>;
      })}

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={0}
        enablePanDownToClose={true}
      >
        <Button title="Done" onPress={onSelectedStatusFilters} />
        {statuses?.message.map((status, index) => (
          <Pressable
            key={`${status.idx}-${index}`}
            onPress={() => onSelectStatusFilter(status.name)}
          >
            <Text>{status.name}</Text>
          </Pressable>
        ))}
      </BottomSheet> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: "#fff",
  },
  btnsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    position: "relative",
  },
  btn: {
    flex: 1,
  },
});
