import { FC } from "react";

// Components
import { switchLang } from "@core/functions";
import translate from "@core/hooks/useTranslate";
import { welcome } from "@core/utils";
import { useGlobalContext } from "@core/states/index";

const Header: FC = () => {
  const { nickName, login, lang, setLang } = useGlobalContext();

  return (
    <>
      <header
        className={`${login && "hero is-flex is-flex-direction-row"} has-text-large is-info mt-2`}
      >
        {login && (
          <section className="has-text-large is-info m-2 tile">
            <h1 className="title is-3 m-2">
              <>
                {translate(welcome, lang)}{" "}
                {nickName.charAt(0).toUpperCase() + nickName.slice(1)} 👋
              </>
            </h1>
          </section>
        )}

        <select
          className={`${login && "m-2"} lang-switcher`}
          value={lang || "en"}
          onChange={(e) => switchLang(e, setLang)}
          name="lang-switcher"
        >
          <option value="en">EN</option>
          <option value="sw">SV</option>
        </select>
      </header>
    </>
  );
};

export default Header;
