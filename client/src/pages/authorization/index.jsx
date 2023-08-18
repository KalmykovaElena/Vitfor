import React from 'react';
import './index.scss';
import background from 'assets/bg-auth.png';
import AuthPanel from 'components/authPanel';
import Header from 'components/header';

export default function Authorization() {
  return (
    <section className="authorization" style={{ backgroundImage: `url(${background})` }}>
      <Header />
      <main>
        <AuthPanel />
      </main>
    </section>
  );
}
