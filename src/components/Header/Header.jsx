import logo from '../../assets/bitcoin.png';

import './Header.css';

export default function Header() {
  return (
    <header id="header">
      <img src={logo} />
      <h1>Bitcoin price history</h1>
    </header>
  );
}
