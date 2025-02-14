import { TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"

export default function DeleteButton(): React.ReactElement | null {
	return (
		// TouchableOpacity container for the delete button
		<TouchableOpacity style={styles.deleteButtonContainer}>
			<Image
				source={require("../../assets/icons/delete.svg")}
				style={styles.deleteIcon}
				contentFit="contain"
			/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	deleteButtonContainer: {
		height: 32.5,
		width: 32.5,
		borderRadius: 5,
		backgroundColor: "#F5F5F5",
		alignItems: "center",
		justifyContent: "center"
	},
	deleteIcon: {
		height: 17.5,
		width: 17.5
	}
})
