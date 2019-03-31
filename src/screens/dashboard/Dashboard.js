/**
 * Dashboard
 */
import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Header, Container, Content, Text } from "native-base";

import styles from "./styles";
import { commonStyles } from '../../common/styles';

export class Dashboard extends Component {
	navigateToDeck = () => this.props.navigation.navigate('Deck');

  render() {
    return (
      <Container>
				<Header transparent />
        <Content>
						<View style={commonStyles.headerContainer}>
							<Text style={commonStyles.headerText}>Thera for Stress</Text>
						</View>
						<View style={styles.pointsCircle}>
							<Text style={styles.pointsCircleText}>0</Text>
						</View>
						<View style={styles.pointsLabelContainer}>
							<Text style={styles.pointsLabelText}>weekly points</Text>
						</View>
						<View style={styles.decksContainer}>
							<Text style={styles.decksTitle}>This Month’s Decks</Text>
							<TouchableOpacity style={styles.deckPlaceholder} onPress={this.navigateToDeck}>
								<Text style={styles.deckPlaceholderText}>What Are Core Beliefs</Text>
								<Text style={styles.deckPlaceholderText}>Chris Lerro</Text>
								<Text style={styles.deckPlaceholderText}>LCSW</Text>
							</TouchableOpacity>
						</View>
				</Content>
      </Container>
    );
  }
}
