import { getStore } from "../utils/utils";
import {COOKIE_NAMES} from '../utils/constant'
import GlobalConfig from '../momoConfig'
const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
}


export const authenticate = async (payload) => {
  const data = await fetch(`${GlobalConfig.apiDomain}/api/auth/authenticate`, {method: "POST", body:JSON.stringify( payload), headers: config.headers})
  .then((res) => res.json())
  .then((res) => {
     return res
   })
  .catch((error) => {
     return error
  });
  return data
};

export const createParkingSessionService = async (payload) => {
  const accessToken = await getStore(COOKIE_NAMES.ACCESS_TOKEN);
  const data = await fetch(`${GlobalConfig.apiDomain}/api/parkingsession/get`, {
    method: "POST", 
    body:JSON.stringify( payload), 
    headers: {
      ...config.headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    }
  })
  .then((res) => res.json())
  .then((res) => {
     return res
   })
  .catch((error) => {
     return error
  });
  return data
};

export const markParkingSessionService = async (payload) => {
  // return request("http://103.2.230.53:8089/api/parkingsession/mark-payment", {
  //   method: "POST",
  //   data: payload,
  // });
  const accessToken = await getStore(COOKIE_NAMES.ACCESS_TOKEN);
  const data = await fetch(`${GlobalConfig.apiDomain}/api/parkingsession/mark-payment`, {
    method: "POST", 
    body:JSON.stringify( payload), 
    headers: {
      ...config.headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    }
  })
  .then((res) => res.json())
  .then((res) => {
     return res
   })
  .catch((error) => {
     return error
  });
  return data
};


export const paymentService = async (payload) => {
  const accessToken = await getStore(COOKIE_NAMES.ACCESS_TOKEN);
  const data = await fetch(`${GlobalConfig.paymentDomain}/gateway/api/create`, {
    method: "POST", 
    body:JSON.stringify( payload), 
    headers: {
      ...config.headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    }
  })
  .then((res) => res.json())
  .then((res) => {
     return res
   })
  .catch((error) => {
     return error
  });
  return data
};

export const getListPartnerService = async (payload) => {
  const accessToken = await getStore(COOKIE_NAMES.ACCESS_TOKEN);
  const data = await fetch(`${GlobalConfig.apiDomain}/gs-payment/api/partner/get-partners`, {
    method: "POST", 
    body:JSON.stringify( payload), 
    headers: {
      ...config.headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    }
  })
  .then((res) => res.json())
  .then((res) => {
     return res
   })
  .catch((error) => {
     return error
  });
  return data
};

