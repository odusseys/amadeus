import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store, { persistor } from 'store';
import logo from './logo.svg';
import './App.css';
import { PersistGate } from 'redux-persist/integration/react';
import styled from 'styled-components';
import colors from 'style/colors';
import Stave from 'library/music/Stave';

const Page = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: ${colors.black};
`;

const Body = styled.div`
  display: flex;
  height: 100%;
`;

const LeftNav = styled.div`
  width: 180px;
  height: 100%;
  background: ${colors.coal};
  color: white;
  padding: 10px;
`;

const MainContainer = styled.div`
  flex: 1;
  background-color: ${colors.lightGrey};
  overflow: auto;
  display: flex;
`;

const Main = styled.div`
  margin: 10px 10px 0 10px;
  background-color: white;
  width: 100%;
`;

const Title = styled.h1``;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Page>
            <Body>
              <LeftNav>
                <Title>AMADEUS</Title>
              </LeftNav>
              <MainContainer>
                <Main>
                  hi
                  <Stave />
                </Main>
              </MainContainer>
            </Body>
          </Page>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
