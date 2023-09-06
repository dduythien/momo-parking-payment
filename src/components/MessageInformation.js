import React from "react";
import { View, StyleSheet } from "react-native";
import { Spacing, Text, Colors } from "@momo-kits/core";

const styles = StyleSheet.create({
  container: {
    padding: Spacing.M,
    backgroundColor: Colors.indigo_10,
    borderRadius: 8,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  message: {
    fontSize: 14,
    color: Colors.red_fund,
    marginRight: Spacing.M,
    lineHeight: 16,
  },
  title: {
    marginBottom: Spacing.XS,
    color: Colors.red_fund
  },
  messageContainer: {
    flex: 1,
  },
});

const MessageInformation = ({message, title}) => {
  return (
    <View style={[styles.container]}>
    <View style={styles.content}>
      <View style={styles.messageContainer}>
        {title ? (
          <Text.Title
            style={[styles.title]}
            weight="bold"
          >
            {title}
          </Text.Title>
        ) : null}
        <Text.SubTitle
          numberOfLines={null}
          weight="bold"
          style={[
            styles.message,
          ]}
        >
          {message}
        </Text.SubTitle>
      </View>
    </View>
    </View>

  );
};

export default MessageInformation