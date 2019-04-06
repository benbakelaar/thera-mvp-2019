/**
 * Confirmation - component used to confirm a new user's code
 */
import React from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import { H1, Text, Spinner, Toast } from 'native-base';
import { Auth } from 'aws-amplify';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

import { authStyles } from './styles';

export class Confirmation extends React.Component {
	pinInput = null;
	
	state = {
		code: '',
		loading: false,
	}

	onChangeCode = (code) => this.setState({ code });

	onFulfill = async ( completeCode ) => {
		try {
			this.setState({ loading: true });
			// Send confirmation request
			await Auth.confirmSignUp(
				this.props.navigation.state.params.username,
				completeCode,
			);
		
			// TODO: Save user to state (or navigate to login)
			// for now navigate into the app
			this.setState({ loading: false });
			this.props.navigation.navigate('App');
		} catch (err) {
			this.setState({ loading: false });
			Toast.show({
				text: typeof err === 'string' ? err : err.message,
				type: 'danger',
				position: 'top',
			})

			// Shake and reset the code
			this.pinInput.current.shake()
				.then(() => this.setState({ code: '', loading: false }));
			console.log(err);
		}
	}

  render() {
    return (
      <SafeAreaView style={authStyles.container}>
				<Image style={authStyles.headerLogo} source={require("../../../assets/logo-header-434px.png")}/>
				<H1 style={authStyles.header}>You're almost there!</H1>

				<View style={{ marginVertical: 50 }}>
					{!this.state.loading 
						? <SmoothPinCodeInput
								ref={c => this.pinInput = c}
								codeLength={6}
								cellStyle={{
									borderBottomWidth: 2,
									borderColor: 'gray',
								}}
								cellStyleFocused={{
									borderColor: 'black',
								}}
								value={this.state.code}
								onTextChange={this.onChangeCode}
								onFulfill={this.onFulfill}
							/>
						: <Spinner />
					}
				</View>
				<Text style={authStyles.description}>
					Please confirm your account by entering the code sent to your email address.
				</Text>
      </SafeAreaView>
    );
  }
}
