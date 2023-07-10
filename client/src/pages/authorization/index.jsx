import React from 'react';
import './index.scss';
import background from 'assets/bg-auth.png';
import Logo from 'components/logo';
import AuthPanel from 'components/authPanel';
import Select from 'components/common/select';
import logo from 'assets/logo.png';

export default function Authorization() {
  return (
    <>
      <header className="authorization-header">
        <Logo name="app" img={logo} text="VitFor" textLocation="right" />
        <Select data={['РУС', 'EN', 'BY']} onchangeSelect={(e) => console.log(e)} />
      </header>
      <main className="authorization" style={{ backgroundImage: `url(${background})` }}>
        <AuthPanel />
      </main>
    </>
  );
}
