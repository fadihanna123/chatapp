import { FC, useEffect } from "react";
import styled from "styled-components";

// Components
import { useGlobalContext } from "@core/states/index";
import { enterChat, onEnterKeyPress } from "@core/functions";
import { enter, nickNameField } from "@core/utils";
import useTranslate from "@core/hooks/useTranslate";

const LoginLayout: FC = () => {
  const { nickName, setNickName, warning, setWarning, setLogin, lang } =
    useGlobalContext();

  useEffect(() => {
    setTimeout(() => setWarning(""), 3000);
  }, [enterChat, setWarning]);

  return (
    <LoginSection className="container is-flex is-justify-content-center is-align-content-center is-align-items-center">
      {warning ? (
        <Alert className="tile has-background-dark has-text-white-ter	">
          {warning}
        </Alert>
      ) : (
        ""
      )}
      <form className="p-2">
        <section className="field is-horizontal section">
          <section className="control field-body">
            <input
              type="text"
              name="nickName"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              onKeyDown={(e) => {
                onEnterKeyPress(e, { nickName, warning, setWarning, setLogin });
              }}
              className="input"
              placeholder={`${useTranslate(nickNameField, lang)}`}
            />
          </section>
          <div className="enterBtnContainer ml-2">
            <button
              type="button"
              className="button is-info enterBtn"
              onClick={() => {
                enterChat({ nickName, warning, setWarning, setLogin });
              }}
            >
              {useTranslate(enter, lang)}
            </button>
          </div>
        </section>
      </form>
    </LoginSection>
  );
};

export default LoginLayout;

const LoginSection = styled.main`
  width: 100vw;
  height: 100vh;
  transition: 0.3s;
`;

const Alert = styled.section`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 20px;
  transition: all 0.3s;
`;
