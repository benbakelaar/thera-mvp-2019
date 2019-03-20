import React from 'react';
import { View, Button } from 'react-native';

export class Login extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
	};
	
	onSignInPress = () => this.props.navigation.navigate('App');

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Sign in!" onPress={this.onSignInPress} />
      </View>
    );
  }
}