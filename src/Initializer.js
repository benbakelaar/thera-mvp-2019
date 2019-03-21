/**
 * Componnt used for app initialization tasks
 */
import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import Amplify from 'aws-amplify';

import awsmobile from '../aws-exports';

export class Initializer extends React.Component {
  componentDidMount() {
		//Configure and initialize AWS resources
		Amplify.configure(awsmobile);

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
