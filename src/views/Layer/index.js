import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { DISCOGS_BASE_URL, IDENTITY, IDENTITY_CONFIG } from '#src/routes';
import { UserProvider } from '#contexts/';
import axios from 'axios';

class IdentityLayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      oauthToken: '',
      oauthSecret: '',
    };
  }
  async componentDidMount() {
    await this.getTokens();
  }

  componentDidUpdate(prevState) {
    if (!prevState.oauthToken && this.state.oauthToken) {
      this.getDiscogsIdentity();
    }
  }

  getDiscogsIdentity = () => {
    const { oauthToken, oauthSecret } = this.state;
    const url = `${DISCOGS_BASE_URL}${IDENTITY}`;
    const config = IDENTITY_CONFIG(oauthToken, oauthSecret);
    axios
      .get(url, config)
      .then(response => {
        this.setState({ user: response.data });
      })

      .catch(error => {
        console.log(error.config);
      });
  };

  getTokens = () => {
    AsyncStorage.multiGet(['oauth_token', 'oauth_secret']).then(values => {
      const user_token = values[0][1];
      const user_secret = values[1][1];
      this.setState({ oauthToken: user_token, oauthSecret: user_secret });
    });
  };

  render() {
    console.log('props user provider', this.state);

    return (
      <UserProvider value={{ name: 'chris' }}>
        {this.props.children}
      </UserProvider>
    );
  }
}

export default IdentityLayer;