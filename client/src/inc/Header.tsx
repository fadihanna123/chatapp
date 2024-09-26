import { useRecoilState } from "recoil";
import { nickNameState } from "States";

const Header = () => {
  const [nickName] = useRecoilState(nickNameState);

  return (
    <>
      <header className="hero has-text-large is-info m-2 tile">
        <section className="hero-body section">
          <h1 className="title is-3">Welcome {nickName}</h1>
        </section>
      </header>
    </>
  );
};

export default Header;
