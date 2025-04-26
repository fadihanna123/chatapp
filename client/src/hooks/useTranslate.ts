/**
 * @author Fadi Hanna<fhanna181@gmail.com>
 */

/**
 * Handle translations.
 * @function useTranslation
 * @param { string } val
 * @param { string } lang
 * @example useTranslation("Start", "en");
 */
const useTranslate = (val: keyof Translations, lang: Languages) => {
  const data = require(`../translations/${lang || 'en'}.json`);

  return data[val as keyof Translations];
};

export default useTranslate;
