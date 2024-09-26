import { useRecoilState } from "recoil";
import { onlineListState } from "States";
import styled from "styled-components";
import { OnlineListTypes } from "typings";

const OnlineListComp = () => {
  const [onlineList] = useRecoilState(onlineListState);

  return (
    <>
      <Section className="column has-background-success has-text-light">
        <h1 className="title is-size-4 has-text-centered">Online List</h1>
        <ul className="has-text-centered">
          {onlineList.map((item: OnlineListTypes) => (
            <li key={item._id} className="is-size-4">
              <i className="fa fa-dot-circle has-text-light is-text-1"></i>
              {item.nickName}
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
