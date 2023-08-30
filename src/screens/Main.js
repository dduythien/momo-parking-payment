import React, { useState, useEffect } from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import { Spacing, Text, Input, Button, Colors } from "@momo-kits/core";
import { RadioList } from "@momo-kits/radio";
import {useRequest} from 'ahooks'
import MiniApi from "@momo-miniapp/api";
import {COOKIE_NAMES} from '../utils/constant'
import _get from 'lodash/get'
import Detail from './Detail';
import {authenticate, createParkingSessionService, getListPartnerService} from '../api';
import momoConfig from '../momoConfig'
import ListPartner from '../components/ListPartner';

const TYPE_INFO = {
  VEHICLE_NUMBER:  'Biển số xe',
  CARD_LABEL: 'Mã thẻ xe',
}

const HomeScreen = (props) => {

  const [typeInfo, setTypeInfo] = useState(0)

  const [partnerCode, setPartnerCode] = useState('ViettelComplex')
  const [cardLabel, setCardLabel] = useState('')
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [listPartner, setListPartner] = useState([])

  const { runAsync: getListPartner } = useRequest(
    () =>
    getListPartnerService({}),
    {
      onSuccess: async (data) => {
        const { result = [] } = data;
        setListPartner(result)
      },
      manual: true
    },
  );

  const { run: fetchAccount } = useRequest(
    () =>
      authenticate({
        userName: momoConfig.userName,
        password: momoConfig.password,
      }),
    {
      onBefore: () => {
        MiniApi.showLoading()
      },
      onSuccess: async (data) => {
        const accessToken = _get(data, "item.accessToken");
        await MiniApi.setItem(COOKIE_NAMES.ACCESS_TOKEN, accessToken);
        await getListPartner()
      },
      onFinally: () => MiniApi.hideLoading()
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
        console.log("createParkingSessionService: ", data)
        if(!data.success) {
          MiniApi.showAlert(
            "Thông báo",
            data.errorMessage,
            ["OK"]
          )
        } else {
          const { navigator } = props;
        console.log("createParkingSessionService: success -> navigate")

          navigator.push({
            screen: Detail,
            options: {title: "Thanh toán"},
            params: {
              data
            }
          })
        }
      },
      onFinally: () => MiniApi.hideLoading(),
      manual: true
    },
  );

  const onNext = () => {
    console.log("!vehicleNumber && !cardLabel: ", !vehicleNumber && !cardLabel)
    if(!vehicleNumber && !cardLabel) {
      MiniApi.showAlert(
        "Thông báo",
        "Vui lòng nhập đủ thông tin",
        ["OK"]
      )
      return;
    }
    const payload = {
      ...(cardLabel ? {cardLabel} : {}),
      ...(vehicleNumber ? {vehicleNumber} : {}),
      partnerCode,
      companyCode: "MOMO",
      bypassCheckFee: false,
    };
    console.log("Payload createParkingSession: ", payload)
    createParkingSession(payload)
  }

  useEffect(() => {
    fetchAccount()
  }, [])

  const onChangeInfoType = (type) => {
    if (type === 0) {
      setCardLabel("")
    } else {
      setVehicleNumber("")
    }
    setTypeInfo(type)
  }

  const onChangeInfo = (text) => {
    if(text === 0) {
      setVehicleNumber(text)
    } else {
      setCardLabel(text)
    }
  }
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: Spacing.XL, flex: 1, backgroundColor: Colors.white }}>
        <View style={{ marginBottom: Spacing.XL }}>
          <Text variant="h4" weight="bold">
            Thông tin chi tiết
          </Text>
        </View>

        <TouchableOpacity onPress={
          () => {
            const { navigator } = props;
            console.log("navigator: ", navigator)
            navigator.showBottom({
                screen: (propss) => <View>
                  <View style={{backgroundColor: "#fff", padding: Spacing.XL, borderTopLeftRadius: 25, borderTopRightRadius: 25}}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: Spacing.XL}}>
                      <Text ariant="title2" weight="bold">Chọn bãi giữ xe</Text>
                    </View>
                    <ListPartner dataSource={listPartner} onCheck={(item) => {
                        setPartnerCode(item);
                        propss.navigator.dismiss();
                      }} selected={partnerCode} />
                  </View>
                </View>,
            });
    
          }
        }>
          <Input
              placeholder="Nhập dữ liệu"
              floatingValue={"Bãi giữ xe"}
              floatingIcon={null}
              floatingIconStyle={{}}
              floatingNumberOfLines={1}
              value={partnerCode}
              disabled
              textStyle={{color: "#000"}}
            />
      
        </TouchableOpacity>

        <RadioList
          data={[
            TYPE_INFO.VEHICLE_NUMBER,
            TYPE_INFO.CARD_LABEL
          ]}
          defaultIndex={0}
          disableButtons={null}
          itemContainerStyle={{}}
          listProps={{}}
          direction="row"
          onChange={ (data) => onChangeInfoType(data)}
          style={{marginBottom: Spacing.XL}}
          title="Lựa chọn loại xác minh"
          titleStyle={{ paddingBottom: Spacing.XS}}
          valueStyle={{}}
        />
        {
          typeInfo === 0 ?
             <Input
             onChangeText={(text) => setVehicleNumber(text)}
             placeholder="Nhập dữ liệu"
             cancellable
             floatingValue={"Biển số xe" }
             floatingIcon={null}
             floatingIconStyle={{}}
             floatingNumberOfLines={1}
             value={vehicleNumber}
           /> :
           <Input
             onChangeText={(text) => setCardLabel(text)}
             placeholder="Nhập dữ liệu"
             cancellable
             floatingValue={"Mã thẻ xe"}
             floatingIcon={null}
             floatingIconStyle={{}}
             floatingNumberOfLines={1}
             value={cardLabel}
             />
        }
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
