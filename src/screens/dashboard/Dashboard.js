/**
 * Dashboard
 */
import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Header, Container, Content, Text, Button, Icon } from "native-base";
import { Auth } from 'aws-amplify';

import styles from "./styles";
import { commonStyles } from '../../common/styles';

export class Dashboard extends Component {
	// TODO:  Move api calls and logic to redux
	focusSubscription = null;

	state = {
		totalPoints: '~',
		firstName: null,
	}
	async componentDidMount() {
  	try {
			const { attributes } = await Auth.currentAuthenticatedUser();
			console.log(attributes);
			this.setState({ firstName: attributes['custom:firstName'] });

			this.getDashboard();

		} catch (err) {
			console.log(err);
		}

		this.focusSubscription = this.props.navigation.addListener(
			'didFocus',
			() => this.getDashboard(),
		);
	}

	componentWillUnmount() {
		this.focusSubscription.remove();
	}

	getDashboard = async () => {
		try {
			const { attributes } = await Auth.currentAuthenticatedUser();
			const response = await fetch('https://pln0wlwznl.execute-api.us-east-2.amazonaws.com/development/dashboard/' + attributes.sub);
			console.log(response);
			const dashboard = await response.json();
			console.log(dashboard);
			this.setState({ totalPoints: dashboard.totalPoints.toString() });
		} catch (err) {
			console.log(err);
		}
	}

	navigateToDeck = () => this.props.navigation.navigate('Deck');

  render() {
    return (
      <Container>
				<Header transparent />
				<View style={commonStyles.headerContainer}>
					<Button
						style={commonStyles.headerButton}
						transparent
						onPress={() => this.props.navigation.openDrawer()}
					>
						<Icon name="menu" style={commonStyles.headerIcon}/>
					</Button>
					<Text style={commonStyles.headerText}>Thera for Stress</Text>
				</View>
        <Content>
					<View style={styles.welcomeContainer}>
						{this.state.firstName 
							? <Text style={styles.welcomeText}>Hi, {this.state.firstName}!</Text>
							: null
						}
					</View>
					<View style={styles.pointsContainer}>
						<View style={styles.pointsCircleContainer}>
							<View style={{ ...styles.smallPointsCircle, backgroundColor: '#fffaea', borderColor: '#F8DF9D' }}>
								<Text style={{ ...styles.smallPointsCircleText, color: '#F8DF9D' }}>10</Text>
							</View>
							<View style={styles.pointsLabelContainer}>
								<Text style={styles.smallPointsLabelText}>today</Text>
							</View>
						</View>
						<View style={styles.pointsCircleContainer}>
							<View style={styles.pointsCircle}>
								<Text style={styles.pointsCircleText}>{this.state.totalPoints}</Text>
							</View>
							<View style={styles.pointsLabelContainer}>
								<Text style={styles.pointsLabelText}>week</Text>
							</View>
						</View>
						<View style={styles.pointsCircleContainer}>
							<View style={styles.smallPointsCircle}>
								<Text style={styles.smallPointsCircleText}>20</Text>
							</View>
							<View style={styles.pointsLabelContainer}>
								<Text style={styles.smallPointsLabelText}>tomorrow</Text>
							</View>
						</View>
					</View>
					<View style={styles.decksContainer}>
						<Text style={styles.decksTitle}>This Month’s Decks</Text>
						<View style={styles.deckList}>
							<TouchableOpacity style={{ flex: .5 }} onPress={this.navigateToDeck}>
								<Image style={{ width: '100%', height: 240 }} resizeMode='contain' source={require("../../../assets/deck-cover-01-with-shadow.png")} />
							</TouchableOpacity>
							<TouchableOpacity style={{ flex: .5 }} onPress={this.navigateToDeck}>
								<Image style={{ width: '100%', height: 240 }} resizeMode='contain' source={require("../../../assets/deck-cover-02-with-shadow.png")} />
							</TouchableOpacity>
						</View>
					</View>
				</Content>
      </Container>
    );
  }
}
