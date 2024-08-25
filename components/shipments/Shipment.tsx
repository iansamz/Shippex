import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { Shipment as ShipmentType } from "@/types/shipment";
import { Colors } from "@/constants/Colors";
import { API_SHIPMENT_LIST_DOCTYPE } from "@/constants/Api";
import { ExpandIcon } from "@/components/icons";
import CheckBox from "../CheckBox";
import Tag, { TagVariant } from "../Tag";
import Title from "../typography/Title";

const boxImage = require("@/assets/images/box.png");

interface ShipmentProps {
  shipment: ShipmentType;
}

// shipment statuses not properly shown so here is the fix
const status: { [key: string]: TagVariant } = {
  "New ShipmentTT": "received",
  PUP: "error",
  "test status": "delivered",
};

const Shipment = ({ shipment }: ShipmentProps) => {
  const [checked, setChecked] = useState(false);

  const statusColor = status[shipment.status] || "received";
  const cities =
    `${shipment.origin_city} - ${shipment.destination_city}`.toLowerCase();

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <CheckBox
          onPress={() => setChecked(!checked)}
          title=""
          isChecked={checked}
          style={styles.checkbox}
        />
        <View style={styles.boxImageContainer}>
          <Image source={boxImage} style={styles.boxImage} />
        </View>
        <View style={styles.details}>
          <Text style={styles.detailsAssignment}>
            {API_SHIPMENT_LIST_DOCTYPE}
          </Text>
          <Title variant={14}>{shipment.name}</Title>
          <Text style={styles.detailsCities}>{cities}</Text>
        </View>
      </View>
      <View style={[styles.section]}>
        <Tag variant={statusColor} style={styles.tag} />
        <Pressable style={styles.expandIconContainer}>
          <View style={styles.expandIcon}>
            <ExpandIcon color={Colors.royalBlue600} width={16} height={16} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ritual100,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    gap: 5,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  checkbox: {
    flex: 0,
    width: 24,
  },
  details: {
    marginLeft: 5,
  },
  detailsAssignment: {
    fontSize: 13,
    color: Colors.ritual700,
  },
  detailsCities: {
    textTransform: "capitalize",
    fontSize: 13,
    color: Colors.ritual500,
  },
  boxImageContainer: {
    flex: 0,
    justifyContent: "center",
  },
  boxImage: {
    width: 40,
    height: 40,
  },
  tag: {
    borderWidth: 1,
    borderColor: "white",
  },
  expandIconContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  expandIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Shipment;
