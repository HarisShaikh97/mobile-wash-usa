import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { useFonts } from "expo-font"
import { theme } from "../../utils/constants"

interface FormButtonProps {
	title: string
	onPress: () => void
}

export default function FormButton({
	title,
	onPress
}: FormButtonProps): React.ReactElement | null {
	const [fontsLoaded] = useFonts({
		"Roboto-Medium": require("../../assets/fonts/Roboto/Roboto Medium 500.ttf")
	})

	return (
		<TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
			{fontsLoaded && <Text style={styles.loginButtonText}>{title}</Text>}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		width: "100%",
		height: 50,
		borderRadius: 10,
		backgroundColor: theme.colors.primary,
		alignItems: "center",
		justifyContent: "center"
	},
	loginButtonText: {
		fontFamily: "Roboto-Medium",
		fontSize: 15,
		color: "white"
	}
})
