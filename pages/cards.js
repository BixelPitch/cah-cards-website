import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Cards() {
  const [ index, setIndex ] = useState({ version: '', stats: { languages: [] } });
  const [ packs, setPacks ] = useState([]);
  const [ search, setSearch ] = useState('');
  const [ language, setLanguage ] = useState('all');
  const [ type, setType ] = useState('all');
  const [ cards, setCards ] = useState(<div></div>);
  const [ color, setColor ] = useState('all');

  useEffect(() => {
    fetch('/cards/index.json')
      .then((x) => x.json())
      .then((data) => setIndex(data));

    fetch('/cards/all.json')
      .then((x) => x.json())
      .then((data) => setPacks(data));
  }, []);

  useEffect(() => {
    const filteredCards = [];

    packs.forEach((pack) => {
        if (language !== 'all' && pack.language !== language) return false;
        if (type !== 'all' && pack.type !== type) return false;

        if (color === 'all' || color === 'white') {
          pack.white_cards.forEach((c) => {
            if (search.length === 0 || c.indexOf(search) !== -1) filteredCards.push({ color: 'white', text: c, pack: `${pack.language}/${pack.name}` });
          });
        }

        if (color === 'all' || color === 'black') {
          pack.black_cards.forEach((c) => {
            if (search.length === 0 || c.indexOf(search) !== -1) filteredCards.push({ color: 'black', text: c, pack: `${pack.language}/${pack.name}` });
          });
        }
      });

    setCards(filteredCards.map((c, index) => <div key={index} className={ c.color === 'black' ? 'card mt-1 bg-dark text-light' : 'card mt-1 bg-light text-dark'}>
        <div className="card-header">
          <div className="card-title h5">{ c.text }</div>
          <div className="card-subtitle text-gray">included in <a href={ '/packs#' + c.pack }>{ c.pack.split('/')[1] }</a></div>
        </div>
      </div>));
  }, [ packs, language, type, search, color ]);

  return (
    <div>
      <Head>
        <title>CAH Cards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <header className="navbar p-2 bg-primary">
          <section className="navbar-section">
            <a href="/" className="navbar-brand text-light mr-2">CAH Cards</a>
            <a href="/packs" className="btn btn-link text-light mr-2">PACKS</a>
            <a href="/cards" className="btn btn-link text-light mr-2">CARDS</a>
          </section>
          <section className="navbar-section align-right">
            <a href="https://github.com/BixelPitch/cah-cards/releases" className="btn btn-link text-light mr-2">{ index.version }</a>
            <a href="https://github.com/BixelPitch/cah-cards" className="mr-2">
              <img height="40" src="/github.png" />
            </a>
          </section>
        </header>

        <div className="container grid-lg pt-2">
          <div className="input-group">
            <input className="form-input input-lg" type="text" placeholder="search" onChange={(e) => { setSearch(e.target.value) }} />
            <select className="form-select select-lg" onChange={(e) => { setLanguage(e.target.value) }}>
              <option value="all">all languages</option>
              { index.stats.languages.map((lang, index) => <option key={index} value={ lang }>{ lang }</option>) }
            </select>
            <select className="form-select select-lg" onChange={(e) => { setColor(e.target.value) }}>
              <option value="all">all colors</option>
              <option value="black">black cards</option>
              <option value="white">white cards</option>
            </select>
            <select className="form-select select-lg" onChange={(e) => { setType(e.target.value) }}>
              <option value="all">all types</option>
              <option value="original">original</option>
              <option value="official">official</option>
              <option value="translation">translation</option>
            </select>
          </div>
          <h7 className="pt-2 text-gray">{ cards.length } results</h7>
          { cards }
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
