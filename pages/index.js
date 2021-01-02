import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [ index, setIndex ] = useState({});

  const totalPacks = !index.stats ? 0 : index.stats.packs_translated 
    + index.stats.packs_original
    + index.stats.packs_official;
  const totalLanguages = !index.stats ? 0 : index.stats.languages.length;
  const totalBlackCards = !index.stats ? 0 : index.stats.black_cards_official 
    + index.stats.black_cards_original
    + index.stats.black_cards_translated;
  const totalWhiteCards = !index.stats ? 0 : index.stats.white_cards_official
    + index.stats.white_cards_original
    + index.stats.white_cards_translated;

  useEffect(() => {
    fetch('/cards/index.json')
      .then((x) => x.json())
      .then((data) => setIndex(data));
  }, []);

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
            <a href="https://github.com/BixelPitch/cah-cards/releases" className="btn btn-link text-light mr-2">{ index.version || '' }</a>
            <a href="https://github.com/BixelPitch/cah-cards" className="mr-2">
              <img height="40" src="/github.png" />
            </a>
          </section>
        </header>

        <div className="hero hero-lg bg-secondary">
          <div className="hero-body">
            <div className="container mb-2">
              <p className="empty-title h3">"Cards Against Humanity" cards by <a href="https://github.com/BixelPitch">BixelPitch</a></p>
            </div>
            <div className="columns">
              <div className="column col-3 col-md-6 col-xs-12 py-2">
                <div className="card text-dark">
                  <div className="card-header">
                    <div className="card-title h5"><b>{ totalPacks }</b> card packs</div>
                  </div>
                </div>
              </div>
              <div className="column col-3 col-md-6 col-xs-12 py-2">
                <div className="card text-dark">
                  <div className="card-header">
                    <div className="card-title h5"><b>{ totalLanguages }</b> languages</div>
                  </div>
                </div>
              </div>
              <div className="column col-3 col-md-6 col-xs-12 py-2">
                <div className="card text-dark">
                  <div className="card-header">
                    <div className="card-title h5"><b>{ totalWhiteCards }</b> white cards</div>
                  </div>
                </div>
              </div>
              <div className="column col-3 col-md-6 col-xs-12 py-2">
                <div className="card text-dark">
                  <div className="card-header">
                    <div className="card-title h5"><b>{ totalBlackCards }</b> black cards</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
