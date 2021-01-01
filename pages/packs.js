import Head from 'next/head';
import ReactCountryFlag from 'react-country-flag';
import { useEffect, useState } from 'react';

export default function Packs() {
  const [ index, setIndex ] = useState({});
  const [ packs, setPacks ] = useState([]);

  useEffect(() => {
    fetch('/cards/index.json')
      .then((x) => x.json())
      .then((data) => setIndex(data));

    fetch('/cards/all.json')
      .then((x) => x.json())
      .then((data) => setPacks(data));
  }, []);

  const packsList = packs.map((pack, index) => {
    return (
      <div key={ index } className="col col-6 col-md-12 p-1">
        <div id={ pack.language + '/' + pack.name } className="card">
          <div className="card-header">
            <div className="card-title h5">
              { pack.name + ' ' } 
              <ReactCountryFlag countryCode={ pack.language.toLowerCase() === 'en' ? 'us' : pack.language } />
            </div>
            <div className="card-subtitle text-gray">by { pack.authors.join(', ') }</div>
            <div className="card-subtitle text-gray">
              {
                pack.type !== 'translation' ? pack.type : <div>
                    <span>translation of </span>
                    <a href={ '#' + pack.translation }>{ pack.translation.split('/')[1] }</a>
                  </div>
              }
            </div>
          </div>
          <div className="card-body">
            <div className="columns">
              <div className="col col-6">
                <div className="bg-dark p-2" style={{ border: '1px solid #303742' }}>
                  <span className="text-light">{ pack.black_cards.length } cards</span>
                </div>
              </div>
              <div className="col col-6">
                <div className="bg-light p-2" style={{ border: '1px solid #303742' }}>
                  <span className="text-dark">{ pack.white_cards.length } cards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  });

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
          </section>
          <section className="navbar-section align-right">
            <a href="https://github.com/BixelPitch/cah-cards/releases" className="btn btn-link text-light mr-2">{ index.version || '' }</a>
            <a href="https://github.com/BixelPitch/cah-cards" className="mr-2">
              <img height="40" src="/github.png" />
            </a>
          </section>
        </header>

        <div className="container grid-lg">
          <div className="columns">{ packsList }</div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
