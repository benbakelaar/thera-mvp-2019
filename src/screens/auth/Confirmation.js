/**
 * Confirmation - component used to confirm a new user's code
 */
import React from 'react';
import { View } from 'react-native';
import { Form, Item, Input, Button, Text, H1 } from 'native-base';
import { Auth } from 'aws-amplify';

import { authStyles } from './styles';

export class Confirmation extends React.Component {
	state = {
		code: '',
	}

	onChangeCode = (code) => this.setState({ code });

	onConfirmPress = async () => {
		try {

			// Send confirmation request
			await Auth.confirmSignUp(
				this.props.navigation.state.params.username,
				this.state.code,
			);
		
			// TODO: Save user to state (or navigate to login)
			// for now navigate into the app
			this.props.navigation.navigate('App');
		} catch (err) {
			console.log(err);
		}
	}

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<H1>Confirmation Code</H1>
				<Form style={{ margin: 20 }}>
					<Item rounded style={authStyles.inputField}>
						<Input
							placeholder="Confirmation Code"
							value={this.state.code}
							onChangeText={this.onChangeCode}
						/>
					</Item>
					<Button block onPress={this.onConfirmPress} style={authStyles.button}>
						<Text>Confirm</Text>
					</Button>
				</Form>
      </View>
    );
  }
}
