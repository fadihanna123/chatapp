import styled from 'styled-components';

// Components
import { useGlobalContext } from '@states/index';
import { FC } from 'react';

const OnlineListComp: FC = () => {
  const { onlineList, nickName } = useGlobalContext();

  return (
    <>
      <Section className='column has-background-success has-text-light'>
        <h1 className='title is-size-4 has-text-centered'>Online List</h1>
        <ul className='has-text-centered'>
          {onlineList
            .filter((user) => user.nickName !== nickName)
            .map((item: OnlineListTypes, i: number) => (
              <li key={i} className='is-size-4'>
                <i className='fa fa-dot-circle has-text-light is-text-1'></i>
                {'  '}
                {item.nickName.charAt(0).toUpperCase() + nickName.slice(1)}
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
