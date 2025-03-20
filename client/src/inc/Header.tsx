import { useGlobalContext } from '@states/index';
import { FC } from 'react';

const Header: FC = () => {
  const { nickName } = useGlobalContext();

  return (
    <>
      <header className='hero has-text-large is-info m-2 tile'>
        <section className='hero-body section'>
          <h1 className='title is-3'>
            Welcome {nickName.charAt(0).toUpperCase() + nickName.slice(1)}
          </h1>
        </section>
      </header>
    </>
  );
};

export default Header;
