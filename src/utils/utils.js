import MiniApi from "@momo-miniapp/api";

export const getStore = (key) => {
  return new Promise(resolve => {
    MiniApi.getItem(key, (data) => {
      resolve(data)
    } )
  } );

}

export const handleFormatMoney = (
  money,
  currency,
) => {
  if (!money) return 0;
  const fix = Number(money).toFixed();
  const convertString = fix + "";
  const value = "" + convertString?.replace(/\./g, "");
  const format = value?.replace(/\B(?=(\d{3})+(?!\d))/g, ".") || "0";
  return `${format} ${currency || ""} `;
};
