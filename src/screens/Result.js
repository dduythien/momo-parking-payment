import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { Spacing, Colors, Text, Button, Image, ScaleSize } from "@momo-kits/core";

import { InforTable } from "@momo-kits/bank";
import _get from 'lodash/get'
import { markParkingSessionService} from '../api';
import ImageAssets from '../utils/ImageAssets';
import moment from 'moment';
import MessageInformation from '../components/MessageInformation'
import {getFontWeightMedium, formatTimeByGTM7 } from '../utils/utils';
import { handleFormatMoney, getStore } from "../utils/utils";
import MiniApi from "@momo-miniapp/api";
import { useRequest } from 'ahooks';
import {COOKIE_NAMES} from '../utils/constant'

const FONT_WEIGHT_BOLD = getFontWeightMedium()

const styles = StyleSheet.create({
  status: {
    fontSize: ScaleSize(14),
    lineHeight: ScaleSize(20),
    color: Colors.black_17,
    fontWeight: FONT_WEIGHT_BOLD,
    marginBottom: Spacing.L
},
});

const ResultScreen = (props) => {

const [parkingSessionIdInfo, parkingSession] = useState('')
  const { loading } = useRequest(
    async () => {
      console.log("Result params: ", props.params)
      const parkingSessionId = await getStore(COOKIE_NAMES.PARKING_SESSION_ID);
      parkingSession(parkingSessionId)
      console.log("RCOOKIE_NAMES.PARKING_SESSION_ID: ", parkingSessionId)
      const payload = {
        companyCode: "MOMO",
        parkingSessionId,
        transactionId:  props.params.transId,
        paymentDate: new Date(Number(props.params.responseTime)).toISOString(),
        fee: props.params.amount,
      }
      console.log("markParkingSessionService payload:  ", payload)
      return markParkingSessionService(payload)
    },
    {
      onBefore: () => MiniApi.showLoading(),
      onSuccess: (res) => {
        console.log("mark paymet success: ", res);
        if (!res.success) {
          MiniApi.showAlert(
            "Thông báo",
            res.errorMessage,
            ["OK"]
          )
        }
        // return data;
      },
      onError: (error) => {
        console.log("error: ", error);
        return false;
      },
      onFinally: () => MiniApi.hideLoading()
    },
  );

  const onBackToHome = () => {
    const {navigator} = props;
    // MiniApi.dismissAll()
    MiniApi.goHome()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: Spacing.L, flex: 1, alignItems: 'center' }}>
        <View style={{ alignItems: "center", backgroundColor: "#fff", width: "100%", borderRadius: 24, paddingTop: 24}}>
          <Image
              cached
              style={{ height: 48, width: 48 }}
              source={{ uri: ImageAssets.ic_success }}
          />
          <Text.Title style={styles.status}>
              Giao dịch thành công
          </Text.Title>
          <InforTable
            autoAlignItem
            style={{ paddingBottom: Spacing.L, width: "100%" }}
            title={
              <Text variant="h4" weight="bold">
                Thông tin chi tiết
              </Text>
            }
            data={[
              {
                title: "Dịch vụ",
                value: props.params.orderInfo,
              },
              {
                title: "Thời gian",
                value: moment(new Date(Number(props.params.responseTime))).format('DD/MM/YYYY HH:mm'),
              },
              {
                title: "Mã đơn hàng",
                value: String(props.params.transId),
              },
              {
                title: "Mã hoá đơn",
                value: String(parkingSessionIdInfo),
              },
              {
                title: "Số tiền giao dịch",
                value: handleFormatMoney(props.params.amount, "đ"),
              },
            ]}
          />
                  {/* <View style={{paddingHorizontal: Spacing.L, paddingBottom: Spacing.L, width: '100%', backgroundColor: Colors.white}}>
          <MessageInformation
            title="Lưu ý"
            message={`Vui lòng lấy xe ra trong vòng 30p`}
          />
        </View> */}
        </View>
        
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            width: "100%"
          }}
        >
          <Button title="Về trang chủ" onPress={onBackToHome} />
        </View>
      </View>
    </SafeAreaView>
  );
};





export default ResultScreen;
