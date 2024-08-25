import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Animated,
  Easing,
  ViewStyle,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Shipment as ShipmentType } from "@/types/shipment";
import { Colors } from "@/constants/Colors";
import { API_SHIPMENT_LIST_DOCTYPE } from "@/constants/Api";
import { ExpandIcon } from "@/components/icons";
import CheckBox from "../CheckBox";
import Tag, { TagVariant } from "../Tag";
import Title from "../typography/Title";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../Button";

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
  const [expanded, setExpanded] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [expanded, heightAnim]);

  const heightInterpolate = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150],
  });

  const animatedStyle: Animated.WithAnimatedObject<ViewStyle> = {
    height: heightInterpolate,
    overflow: "hidden" as "hidden",
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const statusColor = status[shipment.status] || "received";
  const cities =
    `${shipment.origin_city} - ${shipment.destination_city}`.toLowerCase();

  return (
    <View
      style={[
        styles.container,
        {
          borderWidth: checked ? 1 : 0,
          borderRadius: 10,
          borderColor: Colors.primary,
        },
      ]}
    >
      <View
        style={[
          styles.cardcontainer,
          {
            borderBottomStartRadius: expanded ? 0 : 10,
            borderBottomEndRadius: expanded ? 0 : 10,
          },
        ]}
      >
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
          <Pressable style={styles.expandIconContainer} onPress={toggleExpand}>
            <View
              style={[
                styles.expandIcon,
                {
                  backgroundColor: expanded ? Colors.royalBlue200 : "white",
                },
              ]}
            >
              <ExpandIcon
                color={expanded ? "white" : Colors.royalBlue600}
                width={16}
                height={16}
              />
            </View>
          </Pressable>
        </View>
      </View>
      <Animated.View style={[styles.expandedContent, animatedStyle]}>
        <View style={styles.expandedContent}>
          <View style={styles.expandedContentRow}>
            <View>
              <Text style={styles.expandedContentTitle}>Origin</Text>
              <Text style={styles.expandedContentCity}>
                {shipment.origin_city}
              </Text>
              <Text style={styles.expandedContentAddress}>
                {shipment.origin_country}
              </Text>
            </View>
            <View>
              <MaterialCommunityIcons
                name="arrow-right"
                color={Colors.primary}
                size={30}
              />
            </View>
            <View>
              <Text style={styles.expandedContentTitle}>Destination</Text>
              <Text style={styles.expandedContentCity}>
                {shipment.destination_city}
              </Text>
              <Text style={styles.expandedContentAddress}>
                {shipment.destination_country}
              </Text>
            </View>
          </View>
          <View style={styles.expandedContentBtnsContainer}>
            <Button
              title="Call"
              style={[
                styles.expandedContentBtn,
                {
                  backgroundColor: Colors.royalBlue200,
                },
              ]}
              iconLeft={
                <MaterialCommunityIcons name="phone" color="white" size={24} />
              }
            />
            <Button
              title="WhatsApp"
              style={[
                styles.expandedContentBtn,
                {
                  backgroundColor: Colors.whatsappGreen,
                },
              ]}
              iconLeft={
                <MaterialCommunityIcons
                  name="whatsapp"
                  color="white"
                  size={24}
                />
              }
            />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  cardcontainer: {
    backgroundColor: Colors.ritual100,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
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
  expandedContent: {
    backgroundColor: Colors.ritual50,
    padding: 10,

    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  expandedContentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  expandedContentTitle: {
    fontSize: 12,
    color: Colors.primary,
  },
  expandedContentCity: {
    fontSize: 16,
    color: Colors.ritual700,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  expandedContentAddress: {
    fontSize: 12,
    color: Colors.ritual500,
  },
  expandedContentBtnsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "flex-end",
  },
  expandedContentBtn: {
    width: "auto",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    gap: 5,
    borderRadius: 18,
  },
});

export default Shipment;
