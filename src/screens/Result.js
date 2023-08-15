import React, { useState, useEffect } from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import { Spacing, Colors, Text, Input, Button, Icon } from "@momo-kits/core";
import { PaymentWidget, ExtraList } from '@momo-kits/transaction';

import _get from 'lodash/get'
import {authenticate, createParkingSessionService} from '../api';

const data = {
  ID: 'EPAY_MOBIFONE.BCMBF20.mhpp7swxz7l0w0l9m3',
  _class: 'mservice.backend.entity.msg.TranHisMsg',
  amount: 20000,
  desc: 'MoMo đang liên hệ đối tác và sẽ thông báo kết quả cho bạn trong 15 phút. Hãy yên tâm nhé! (9000)',
  error: 9000,
  icon: 'https://img.mservice.io/momo_app_v2/new_version/img/appx_icon/ic_tranhis_payment.png',
  io: -1,
  ipAddress: 'N/A',
  isRedeemPetrol: false,
  lastUpdate: 1647583376685,
  loyaltyPoint: 0,
  moneySource: 1,
  name: 'Mua mã thẻ',
  newDesc: 'Thanh toán Mua mã thẻ',
  originalAmount: 20000,
  otpType: 'NA',
  ownerName: 'EPAY_MOBIFONE',
  ownerNumber: '0978702268',
  parentTranType: 7,
  postBalance: '41292434',
  purchaseId: 'PO-EC88E7AEF5AE456B91FC3FF365EE2DCF',
  quantity: 1,
  query: "(io=-1 AND tranType=7 AND serviceId='EPAY_MOBIFONE' AND category=undefined AND receiverType=undefined)",
  resultStatus: 2,
  resultStatusText: 'pending',
  serviceId: 'EPAY_MOBIFONE',
  serviceName: 'Mua mã thẻ',
  showTotalOriginalAmount: false,
  status: 1,
  totalAmount: 20000,
  totalDiscountAmount: 0,
  totalOriginalAmount: 20000,
  totalPromoAmount: 0,
  tranId: 2652295736,
  tranType: 7,
  user: '0978702268',
};

const renderMessage = (tranhisItem, index) => {
  const { resultStatus, extras = '', desc } = tranhisItem || {};
  if (resultStatus === 1) {
      try {
          const extraObj = JSON.parse(extras);
          if (!extraObj) {
              return '';
          }
          const { comment = '' } = extraObj || {};
          return comment;
      } catch (e) {
          return '';
      }
  }
  return desc;
};

const renderMainContent = (tranhisItem, index) => (
  <>
      <View style={{ backgroundColor: 'pink', height: 200 }}>
          <Text>{JSON.stringify(tranhisItem)}</Text>
          <Text>{JSON.stringify(index)}</Text>
      </View>
  </>
);

const renderCTA = (tranhisItem, index) => ({
  left: {
      text: 'Btn Left '.concat(index),
      onPress: () => Alert.alert(JSON.stringify(tranhisItem?.tranId)),
  },
  right: {
      text: 'Btn Right',
      onPress: () => Alert.alert(JSON.stringify(tranhisItem?.tranId)),
  },
});

const defaultWidgetProps = {
  backgroundColor: '#d82d8b',
  showBillIndex: true,
  isMultiBill: true,
  initialExpanded: true,
};

const ResultScreen = (props) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: Spacing.XL, flex: 1 }}>
{/*         
      <PaymentWidget
          {...defaultWidgetProps}
          // index={index}
          data={props.params}
          renderMainContent={renderMainContent}
          renderCTA={renderCTA}
     
      /> */}

        
      </View>
    </SafeAreaView>
  );
};

export default ResultScreen;
