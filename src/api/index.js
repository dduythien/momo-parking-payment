// import request from "./request";
// import { IPaymentSession, IPaymentSessionResponse } from "@services/models";
export const authenticate = async (payload) => {
  const data = await fetch("http://103.2.230.53:8089/api/auth/authenticate", {method: "POST", body: payload})
  .then((res) => res.json())
  .then((res) => {
     return res
   })
  .catch((error) => {
     return error
  });
  return data
};

export const createParkingSessionService = (payload) => {
  // return request("http://103.2.230.53:8089/api/parkingsession/get", {
  //   method: "POST",
  //   data: payload,
  // });
  return {}
};

export const markParkingSessionService = (payload) => {
  // return request("http://103.2.230.53:8089/api/parkingsession/mark-payment", {
  //   method: "POST",
  //   data: payload,
  // });
  return {}
};


export const paymentService = (payload) => {
  // return request("https://test-payment.momo.vn/v2/gateway/api/create", {
  //   method: "POST",
  //   data: payload,
  // });
  return {}
};
