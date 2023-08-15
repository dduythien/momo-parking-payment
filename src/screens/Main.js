import React, { useState, useEffect } from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import { Spacing, Colors, Text, Input, Button, Icon } from "@momo-kits/core";

import { AutoComplete } from "@momo-kits/auto-complete";
import { RadioList } from "@momo-kits/radio";
import { ButtonFooter } from "@momo-kits/custom";
import {useRequest} from 'ahooks'
import MiniApi from "@momo-miniapp/api";
import {COOKIE_NAMES} from '../utils/constant'
import _get from 'lodash/get'
import Detail from './Detail';
import {authenticate, createParkingSessionService} from '../api';

const data4 = [{ title: "Viettel Complex", value: "ViettelComplex" }];

const data1 = [
  { title: "MobiFone" },
  { title: "VinaPhone" },
  { title: "Viettel" },
  { title: "Vietnamobile" },
  { title: "GMobile" },
];

const HomeScreen = (props) => {

  const data = [
    { name: "Item 1.1", test: "1" },
    { name: "Item 1.1", test: "2" },
    { name: "Item 1.1", test: "3" },
    { name: "Item 1.1", test: "14" },
  ];

  const [partnerCode, setPartnerCode] = useState('viettelComplex')
  const [cardLabel, setCardLabel] = useState('8815')
  const [vehicleNumber, setVehicleNumber] = useState('51H-31401')
  const { run: fetchAccount } = useRequest(
    () =>
      authenticate({
        userName: "momo",
        password: "123456",
      }),
    {
      onBefore: () => {
        MiniApi.showLoading()
      },
      onSuccess: async (data) => {
        const accessToken = _get(data, "item.accessToken");
        await MiniApi.setItem(COOKIE_NAMES.ACCESS_TOKEN, accessToken);
        MiniApi.hideLoading()
      },
    },
  );

  const { run: createParkingSession } = useRequest(
    (payload) =>
    createParkingSessionService(payload),
    {
      onBefore: () => {
        MiniApi.showLoading()
      },
      onSuccess: async (data) => {
        MiniApi.hideLoading();
        const { navigator } = props;
        navigator.push({
          screen: Detail,
          options: {title: "Thanh toán"},
          params: {
            data
          }
        })
      },
    },
  );

  const onNext = () => {
    const payload = {
      cardLabel,
      vehicleNumber,
      partnerCode,
      companyCode: "MOMO",
      bypassCheckFee: true,
    };
    createParkingSession(payload)
    // MiniApi.openURL("momo://app?action=payWithApp&isScanQR=false&serviceType=miniapp&sid=TU9NT0JLVU4yMDE4MDUyOXwxNjkyMDIyNTgzNTQ3OjAxMjM0NTY3Nzg&v=3.0");

  }

  useEffect(() => {
    fetchAccount()
  }, [])
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: Spacing.XL, flex: 1 }}>
        <View style={{ marginBottom: Spacing.XL }}>
          <Text variant="h4" weight="bold">
            Thông tin chi tiết
          </Text>
        </View>

        <AutoComplete
          data={data4}
          onSelected={(selected) => console.log(selected.value)}
        >
          <Input
            keyAutoComplete="title-value"
            cancellable
            floatingValue="Nhập bãi giữ xe"
            placeholder="Nhập dữ liệu"
            value={partnerCode}
          />
        </AutoComplete>
        <Input
          onChangeText={ (text) => setVehicleNumber(text)}
          placeholder="Nhập dữ liệu"
          cancellable
          floatingValue="Nhập Biển số xe/Mã thẻ xe"
          floatingIcon={null}
          floatingIconStyle={{}}
          floatingNumberOfLines={1}
          value={vehicleNumber}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Button title="Tiếp tục" onPress={onNext} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
