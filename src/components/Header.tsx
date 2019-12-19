import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  ul {
    list-style-type: none;
  }
  li {
    display: inline-block;
  }
`;

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
`;

const Header: React.FC = () => {
  return (
    <HeaderStyled>
      <h1>Pixel Pen</h1>
      <Nav>
        <ul>
          <li>
            <a href="#">gallery</a>
          </li>
          <li>
            <a href="#">draw</a>
          </li>
        </ul>
      </Nav>
    </HeaderStyled>
  );
};

export default Header;
