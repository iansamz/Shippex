import { useCallback, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
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
import Shipments from "@/components/shipments/Shipments";
import ShipmentStatusFilters from "@/components/shipments/ShipmentStatusFilters";
import PageLoading from "@/components/PageLoading";

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

  const { data, error, isLoading, refetch, isFetching } =
    useGetShipmentListQuery({
      filters: {
        name: ["like", `%${debouncedSearchTerm}%`],
        status: ["in", statusFilters],
      },
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncer = useCallback(debounce(setDebouncedSearchTerm, 500), []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  if (isLoading || statusIsLoading) {
    return <PageLoading />;
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

  const onCancelFiltering = () => {
    setSelectedStatusFilters([]);
    setStatusFilters([]);
    handleCloseBottomSheet();
  };

  const handleCloseBottomSheet = () => bottomSheetRef.current?.close();
  const handleOpenBottomSheet = () => bottomSheetRef.current?.expand();

  const shipments = data.message;
  const shipmentStatuses = statuses.message;

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
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

      <Shipments
        shipments={shipments}
        refetch={refetch}
        isRefetching={isFetching}
      />

      <CustomBottomSheet
        ref={bottomSheetRef}
        snaps={["40%"]}
        title="Filters"
        headerBtnEndText="Done"
        headerBtnEndAction={onSelectedStatusFilters}
        showHeaderBorder
        headerBtnStartText="Clear"
        headerBtnStartAction={onCancelFiltering}
      >
        <ShipmentStatusFilters
          statuses={shipmentStatuses}
          selectedStatusFilters={selectedStatusFilters}
          onSelectStatusFilter={onSelectStatusFilter}
        />
      </CustomBottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
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
