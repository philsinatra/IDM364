import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Button from './Button';
import Header from './Header';

const theme = {
  red: '#ff0000',
  black: '#111111',
  gray: '#3a3a3a',
  maxwidth: '62.5rem',
  bs: '0 12px 24px 0 rgba(0,0,0,.09)',
  colorLight: 'hsl(109, 100%, 100%)',
  colorDark: 'hsl(211, 2%, 16%)'
};

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 100%;

    @media screen and (min-width: 64em) {
      font-size: 150%;
    }
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    background-color: ${theme.colorLight};
    color: ${theme.colorDark};
    font: 100%/1.5 sans-serif;
    margin: 0;
    padding: 0;

    @media (prefers-color-scheme: dark) {
      background-color: ${theme.colorDark};
      color: ${theme.colorLight};
    }
  }
`;

const StyledPage = styled.div`
  /* background-color: white; */
  /* color: ${props => props.theme.black}; */
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxwidth};
  margin: 0 auto;
  padding: 2rem;
  box-shadow: ${props => props.theme.bs};
`;

const App = () => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <StyledPage className="App">
        <Inner>
          <Header />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis
            esse exercitationem aperiam voluptatum libero earum dolorem officia
            cumque rem recusandae!
          </p>
          <Button />
        </Inner>
      </StyledPage>
    </ThemeProvider>
  </>
);

export default App;
