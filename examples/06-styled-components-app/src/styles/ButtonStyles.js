import styled from 'styled-components';

const MyButton = styled.button`
  background-color: red;
  font-size: ${props => (props.huge ? '200%' : '100%')};

  @media (min-width: 64em) {
    background-color: blue;
  }

  span {
    font-size: 200%;
  }
`;

export default MyButton;
