import { connector } from "@core/App";
import { localStorageKeys } from "@core/utils";

// enterChat: handle chat entry
export const enterChat = (loginPayload: Partial<MyGlobalContextInterface>) => {
  if (loginPayload.nickName === "") {
    loginPayload.setWarning?.("You should enter your nickname first!");
  } else {
    connector.on("loginMsg", (msg: string) => {
      if (msg === "Success" && !loginPayload.warning) {
        loginPayload.setLogin?.(true);
      } else {
        loginPayload.setLogin?.(false);
      }
    });

    connector.emit("join", loginPayload.nickName);
  }
};

// onEnterKeyPress: handle enter key press
export const onEnterKeyPress = (
  e: React.KeyboardEvent<HTMLInputElement>,
  {
    nickName,
    warning,
    setWarning,
    setLogin,
  }: Partial<MyGlobalContextInterface>,
) => {
  if (e.key === "Enter") {
    e.preventDefault();
    enterChat({ nickName, warning, setWarning, setLogin });
  }
};

// switchLang: handle language switch
export const switchLang = (
  e: { target: HTMLSelectElement },
  setLang: (lang: Languages) => void,
) => {
  try {
    const newLang = e.target.value as Languages;
    localStorage.setItem(localStorageKeys.Lang, newLang!);
    setLang(newLang);
  } catch (err) {
    console.error("Error switching language:", err);
  }
};
