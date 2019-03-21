/**
 * Signup - Component used to start the auth flow
 */
import React from 'react';
import { View, Button as RNButton } from 'react-native';
import { Form, Item, Input, Button, Text, H1 } from 'native-base';
import { Auth } from 'aws-amplify';

import { authStyles } from './styles';

export class Signup extends React.Component {
	state = {
		username: '',
		email: '',
		password: '',
	}

	onChangeUsername = (username) => this.setState({ username });

	onChangeEmail = (email) => this.setState({ email });

	onChangePassword = (password) => this.setState({ password });

	onSignUpPress = async () => {
		const { username, password, email } = this.state;
		try {
			// Send sign up requst
			await Auth.signUp({
				username,
				password,
				attributes: {
					email,
				}
			});

			// On success navigate to the confirmation screen, sending the username as a param
			this.props.navigation.navigate('Confirmation', { username });
		} catch (err) {
			console.log(err);
			// TODO: Display an error -- modal, toast, etc.
		}
	};

	navigateToLogin = () => this.props.navigation.navigate('Login');

  render() {
    return (
      <View style={authStyles.container}>
			<H1>Signup</H1>
				<Form style={authStyles.form}>
					<Item rounded style={authStyles.inputField}>
						<Input
							placeholder="Username"
							value={this.state.username}
							onChangeText={this.onChangeUsername}
						/>
					</Item>
					<Item rounded style={authStyles.inputField}>
						<Input
							placeholder="Email"
							value={this.state.email}
							keyboardType="email-address"
							onChangeText={this.onChangeEmail}
						/>
					</Item>
					<Item rounded style={authStyles.inputField}>
						<Input
							placeholder="Password"
							value={this.state.password}
							onChangeText={this.onChangePassword}
							secureTextEntry
						/>
					</Item>
					<Button block onPress={this.onSignUpPress} style={authStyles.button}>
						<Text>Signup</Text>
					</Button>
					<Text style={authStyles.or}>Or</Text>
					<RNButton title="Login" onPress={this.navigateToLogin} />
				</Form>
      </View>
    );
  }
}
