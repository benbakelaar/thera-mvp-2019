/**
 * Styles for all Auth components
 */
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const authStyles = {
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	form: {
		margin: 20
	},
	inputField: {
		width: '100%',
		marginVertical: 15,
		borderColor: '#444'
	},
	button: {
		marginVertical: 10,
		backgroundColor: '#F8DF9D',
	},
	termsText: {
		textAlign: 'center',
		fontSize: 10,
		paddingHorizontal: 40,
		paddingVertical: 20,
	},
	header: {
		color: '#666',
	},
	headerLogo: {
		width: width - 40,
		resizeMode: 'contain',
		marginTop:15,
		marginBottom:30
	},
	description: {
		color: '#666',
		marginHorizontal: 40,
	}
};
