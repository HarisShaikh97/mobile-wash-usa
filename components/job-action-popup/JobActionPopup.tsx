import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { theme } from "../../utils/constants"

// Interface for the props of the component
interface JobActionPopupProps {
	title: string
	onPress: () => void
}

export default function JobActionPopup({
	title,
	onPress
}: JobActionPopupProps): React.ReactElement | null {
	return (
		// Container for the popup
		<TouchableOpacity style={styles.wrapper} onPress={onPress}>
			<View style={styles.container}>
				{/* Popup title */}
				<Text style={styles.titleText}>{title}</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		height: 65,
		width: 225,
		borderRadius: 10,
		backgroundColor: "rgba(47, 116, 250, 0.25)",
		position: "absolute",
		bottom: 115,
		left: "50%",
		transform: [{ translateX: -112.5 }],
		zIndex: 50,
		alignItems: "center",
		justifyContent: "center"
	},
	container: {
		height: 55,
		width: 215,
		borderRadius: 8.5,
		backgroundColor: theme.colors.primary,
		alignItems: "center",
		justifyContent: "center"
	},
	titleText: {
		fontSize: 15,
		fontFamily: "Montserrat-SemiBold",
		color: "white"
	}
})
