import React from 'react';
import './index.scss';
import background from 'assets/bg-auth.png';
import Logo from 'components/logo';
import AuthPanel from 'components/authPanel';
import Select from 'components/common/select';

export default function Authorization() {
  return (
    <>
      <header className="authorization-header">
        <Logo />
        <Select data={['РУС', 'EN', 'BY']} onchangeSelect={(e) => console.log(e)} />
      </header>
      <main className="authorization" style={{ backgroundImage: `url(${background})` }}>
        <AuthPanel />
      </main>
    </>
  );
}
