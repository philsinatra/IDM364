import React from 'react';
import styled from 'styled-components';

const Logo = styled.h1`
  color: white;
  font-size: 4rem;
  margin-left: 2rem;
  padding: 1rem;
  text-align: center;
  transform: skew(-7deg);
  /* background-color: ${props => props.theme.red}; */

  @media (min-width: 81.25em) {
    text-align: left;
  }
`;

const StyledHeader = styled.header`
  .bar {
    background-color: ${props => props.theme.black};

    @media (min-width: 81.25em) {
      background-color: ${props => props.theme.red};
    }
  }
`;

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>Store Name</Logo>
    </div>
  </StyledHeader>
);

export default Header;
