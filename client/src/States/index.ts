import { atom } from "recoil";
import { msgListTypes, OnlineListTypes } from "typings";

export const loginState = atom<boolean>({
  key: "loginState",
  default: false,
});

export const nickNameState = atom<string>({
  key: "nickNameState",
  default: "",
});

export const warningState = atom<string>({
  key: "warningState",
  default: "",
});

export const onlineListState = atom<OnlineListTypes[]>({
  key: "onlineListState",
  default: [],
});

export const msgValState = atom<string>({
  key: "msgValState",
  default: "",
});

export const msgListState = atom<msgListTypes[]>({
  key: "msgListState",
  default: [],
});
