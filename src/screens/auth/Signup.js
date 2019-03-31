/**
 * Signup - Component used to start the auth flow
 */
import React from 'react';
import { SafeAreaView, Image } from 'react-native';
import { Form, Item, Input, Button, Text, H1, Spinner, Toast } from 'native-base';
import { Auth } from 'aws-amplify';

import { authStyles } from './styles';

export class Signup extends React.Component {
	state = {
		firstName: '',
		email: '',
		password: '',
		loading: false,
	}

	onChangeFirstName = (firstName) => this.setState({ firstName });

	onChangeEmail = (email) => this.setState({ email });

	onChangePassword = (password) => this.setState({ password });

	onSignUpPress = async () => {
		const { firstName, password, email } = this.state;
		try {
			this.setState({ loading: true });
			// Send sign up requst
			await Auth.signUp({
				username: email,
				password,
				attributes: {
					email,
					'custom:firstName': firstName,
				},
			});

			// On success navigate to the confirmation screen, sending the username as a param
			this.setState({ loading: false });
			this.props.navigation.navigate('Confirmation', { username: email });
		} catch (err) {
			console.log(err);
			Toast.show({
				text: typeof err === 'string' ? err : err.message,
				type: 'danger',
				position: 'top',
			});
			this.setState({ loading: false });
			// TODO: Display an error -- modal, toast, etc.
		}
	};

	navigateToLogin = () => this.props.navigation.navigate('Login');

  render() {
    return (
      <SafeAreaView style={authStyles.container}>
				<Image style={authStyles.headerLogo} source={require("../../../assets/logo-header-434px.png")}/>
				<H1 style={authStyles.header}>Create an account</H1>
				<Form style={authStyles.form}>
					<Item style={authStyles.inputField} regular>
						<Input
							placeholder="First Name"
							value={this.state.firstName}
							onChangeText={this.onChangeFirstName}
						/>
					</Item>
					<Item style={authStyles.inputField} regular>
						<Input
							autoCapitalize="none"
							placeholder="Email"
							value={this.state.email}
							keyboardType="email-address"
							onChangeText={this.onChangeEmail}
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
					<Text style={authStyles.termsText}>
						By creating an account you agree to our Terms of service and Privacy Policy
					</Text>
					<Button block onPress={this.onSignUpPress} style={authStyles.button}>
						{!this.state.loading
							? <Text style={{ color: '#000' }}>SIGN UP</Text>
							: <Spinner />
						}
					</Button>
					<Button block onPress={this.navigateToLogin} light>
						<Text>LOG IN</Text>
					</Button>
				</Form>
      </SafeAreaView>
    );
  }
}
