/**
 * Login
 */
import React from 'react';
import { SafeAreaView, Image } from 'react-native';
import { Form, Item, Input, Button, Text, H1, Spinner, Toast } from 'native-base';
import { Auth } from 'aws-amplify';

import { authStyles } from './styles';

export class Login extends React.Component {
	state = {
		username: '',
		password: '',
		loading: false,
	}

	onChangeUsername = (username) => this.setState({ username });

	onChangePassword = (password) => this.setState({ password });

	onSignInPress = async () => {
		const { username, password } = this.state;
		try {
			this.setState({ loading: true });
			// Verify the user
			const user = await Auth.signIn(username, password);

			// TODO: Save the user object to session so the app can use it.
			this.setState({ loading: false });
			console.log(user);

			// Navigate into the app
			this.props.navigation.navigate('App');
		} catch (err) {
			// TODO: Handle auth errors
			this.setState({ loading: false });
			Toast.show({
				text: typeof err === 'string' ? err : err.message,
				type: 'danger',
				position: 'top',
			});
			console.log(err);
		}
	}

	navigateToSignup = () => this.props.navigation.navigate('Signup');

  render() {
    return (
      <SafeAreaView style={authStyles.container}>
				<Image style={authStyles.headerLogo} source={require("../../../assets/logo-header-434px.png")}/>
				<Form style={authStyles.form}>
				<Item style={authStyles.inputField} regular>
						<Input
							autoCapitalize="none"
							placeholder="Email"
							value={this.state.username}
							keyboardType="email-address"
							onChangeText={this.onChangeUsername}
						/>
					</Item>
					<Item style={authStyles.inputField} regular>
						<Input
							placeholder="Password"
							value={this.state.password}
							onChangeText={this.onChangePassword}
							secureTextEntry
						/>
					</Item>
					<Button block onPress={this.onSignInPress} style={authStyles.button}>
						{!this.state.loading
							? <Text>LOGIN</Text>
							: <Spinner />
						}
					</Button>
					<Button block onPress={this.navigateToSignup} light>
						<Text>SIGN UP</Text>
					</Button>
				</Form>
      </SafeAreaView>
    );
  }
}
