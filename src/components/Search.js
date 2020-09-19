import React, { useState, useEffect } from 'react';
import axios from 'axios';

const rootUrl = "https://en.wikipedia.org/w/api.php";

const Search = () => {
  const [term, setTerm] = useState('programming');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000)

    return () => {
      window.clearTimeout(timerId);
    }
  }, [term]);

  useEffect(() => {
    const search = async () => {
      try {
        const { data } = await axios.get(rootUrl, {
          params: {
            action: 'query',
            list: 'search',
            origin: '*',
            format: 'json',
            srsearch: debouncedTerm,
          }
        });
        setResults(data.query.search);
      } catch(err) {
        console.log(err);
      }
    }

      search();
  }, [debouncedTerm])

  const renderedResults = results.map((result) => {
    return (
      <div className="item" key={result.pageid}>
        <div className="right floated content">
          <a className="ui button" href={`https://en.wikipedia.org?curid=${result.pageid}`}>Go</a>
        </div>
        <div className="content">
          <div className="header">
            {result.title}
          </div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }} />
        </div>
      </div>
    );
  })

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            type="text"
            className="input"
            onChange={(e) => setTerm(e.target.value)}
            value={term}
          />
        </div>
      </div>
      <div className="ui celled list">
        {renderedResults}
      </div>
    </div>
  );
};

export default Search;
