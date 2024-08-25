import { StyleSheet, View } from "react-native";
import React from "react";
import Title from "@/components/typography/Title";
import Button from "@/components/Button";
import { ShipmentStatus } from "@/types/shipment";
import { SHIPMENT_STATUS_TITLE } from "@/constants/app";
import { Colors } from "@/constants/Colors";

interface ShipmentStatusFiltersProps {
  statuses: ShipmentStatus[];
  selectedStatusFilters: string[];
  onSelectStatusFilter: (status: string) => void;
}

const ShipmentStatusFilters = ({
  statuses,
  selectedStatusFilters,
  onSelectStatusFilter,
}: ShipmentStatusFiltersProps) => {
  const isStatusSelected = (status: string) =>
    selectedStatusFilters.includes(status);

  return (
    <View style={styles.container}>
      <Title variant={14} style={styles.title}>
        {SHIPMENT_STATUS_TITLE.toUpperCase()}
      </Title>
      <View style={styles.statusBtnsContainer}>
        {statuses.map((status, index) => {
          const isSelected = isStatusSelected(status.name);
          return (
            <Button
              title={status.name}
              variant="tertiary"
              key={`${status.idx}-${index}`}
              onPress={() => onSelectStatusFilter(status.name)}
              style={[styles.statusBtn, isSelected && styles.statusBtnSelected]}
              textStyle={[
                styles.statusBtnText,
                isSelected && styles.statusBtnSelectedText,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 14,
    padding: 14,
  },
  title: {
    marginBottom: 16,
    color: Colors.ritual600,
    fontWeight: "500",
  },
  statusBtnsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  statusBtn: {
    width: "auto",
  },
  statusBtnText: {
    fontSize: 14,
    fontWeight: "400",
    textTransform: "capitalize",
  },
  statusBtnSelected: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  statusBtnSelectedText: {
    color: Colors.primary,
  },
});

export default ShipmentStatusFilters;
