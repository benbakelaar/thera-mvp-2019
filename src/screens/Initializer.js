import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';

export class Initializer extends React.Component {
  componentDidMount() {
		// Adds logic to display either the Auth stack or the App stack.
		// For now, just direct automatically to the Auth stack
    this.props.navigation.navigate('Auth');
	}

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}