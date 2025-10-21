import styled from "styled-components";
import { FaSignal } from "react-icons/fa";

// Components
import { useGlobalContext } from "@core/states/index";
import { FC } from "react";
import { onlineListText } from "@core/utils";
import translate from "@core/hooks/useTranslate";

const OnlineListComp: FC = () => {
  const { onlineList, nickName, lang } = useGlobalContext();

  return (
    <>
      <Section className="column has-background-success has-text-light">
        <h1 className="title is-size-4 has-text-centered">
          <FaSignal className="mr-2" />
          {translate(onlineListText, lang)}
        </h1>
        <ul className="has-text-centered">
          {onlineList
            .filter((user) => user.nickName !== nickName)
            .map((item: OnlineListTypes, i: number) => (
              <li key={i} className="is-size-4">
                <i className="fa fa-dot-circle has-text-light is-text-1"></i>
                {"  "}
                {item.nickName.charAt(0).toUpperCase() + item.nickName.slice(1)}
              </li>
            ))}
        </ul>
      </Section>
    </>
  );
};

export default OnlineListComp;

const Section = styled.section`
  border: 1px solid #000;
  transition: 0.3s;
`;
