import { View, StyleSheet, FlatList } from "react-native";
import React from "react";
import { Shipment as ShipmentType } from "@/types/shipment";
import { Colors } from "@/constants/Colors";
import { SHIPMENT_TITLE } from "@/constants/app";
import Title from "../typography/Title";
import Shipment from "./Shipment";
import CheckBox from "../CheckBox";

interface ShipmentsProps {
  shipments: ShipmentType[];
  refetch: () => void;
  isRefetching: boolean;
}

const Shipments = ({ shipments, refetch, isRefetching }: ShipmentsProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title variant={24}>{SHIPMENT_TITLE}</Title>
        <CheckBox
          title="Mark All"
          isChecked={false}
          onPress={() => {}}
          style={styles.checkbox}
          textStyle={styles.checkboxText}
        />
      </View>
      {shipments.length === 0 ? (
        <Title variant={16}>No Shipments Found</Title>
      ) : (
        <FlatList
          data={shipments}
          renderItem={({ item, index }) => (
            <Shipment shipment={item} key={`${item.idx}-${index}`} />
          )}
          keyExtractor={(item) => `${item.idx}-${item.name}`}
          onRefresh={refetch}
          refreshing={isRefetching}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  checkbox: {
    justifyContent: "flex-end",
  },
  checkboxText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "300",
  },
});

export default Shipments;
