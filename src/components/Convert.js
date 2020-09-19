import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM';
const rootUrl = 'https://translation.googleapis.com/language/translate/v2';

const Convert = ({ language, text }) => {
  const [translation, setTranslation] = useState('');

  useEffect(() => {
    const doTranslation = async () => {
      const { data } = await axios.post(rootUrl, {}, {
        params: {
          q: text,
          key: apiKey,
          target: language.value,
        },
      });

      setTranslation(data.data.translations[0].translatedText)
    }
    let timer = null;
    if (text) {
      timer = window.setTimeout(() => {
        doTranslation();
      }, 1000)
    }

    return () => {
      window.clearInterval(timer);
    };
  }, [language, text]);

  return (
    <div>
      <h1 className="ui header">{translation}</h1>
    </div>
  );
};

export default Convert;
