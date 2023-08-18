import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Colors, Text, Icon } from "@momo-kits/core";
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    // paddingTop: Spacing.XL,
  },
  item: {
    width: '100%',
    paddingVertical: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"
  },
  check: {
    // flexDirection: "row",
    // justifyContent: "flex-end"
  }

});

const Item = ({name, selected, onCheck}) => (
  <TouchableOpacity onPress={onCheck}>
    <View style={styles.item}>
        <Text variant="h4" weight="bold" style={styles.title}>{name}</Text>
        {selected && <Icon name={'notifications_check'} style={{tintColor: Colors.success}} /> }
    </View>
  </TouchableOpacity>
);

const ListPartner = (props) => {
  const {dataSource = [], selected, onCheck} = props;
  return (
    <View style={styles.container}>
      <FlatList
        data={dataSource}
        renderItem={({item}) => <Item onCheck={() => onCheck(item.code)} name={item.name} selected={selected === item.code} />}
        keyExtractor={item => item.code}
      />
    </View>
  );
};

export default ListPartner;
