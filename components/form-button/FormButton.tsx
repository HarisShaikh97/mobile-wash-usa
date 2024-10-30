import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { useFonts } from "expo-font"
import { theme } from "../../utils/constants"

interface FormButtonProps {
	theme: "light" | "dark"
	title: string
	onPress: () => void
}

export default function FormButton({
	theme,
	title,
	onPress
}: FormButtonProps): React.ReactElement | null {
	const [fontsLoaded] = useFonts({
		"Roboto-Medium": require("../../assets/fonts/Roboto/Roboto Medium 500.ttf")
	})

	return (
		<TouchableOpacity
			style={[
				styles.buttonContainer,
				theme === "dark"
					? styles.buttonDarkTheme
					: styles.buttonLightTheme
			]}
			onPress={onPress}
		>
			{fontsLoaded && (
				<Text
					style={[
						styles.buttonText,
						theme === "dark"
							? styles.buttonDarkThemeText
							: styles.buttonLightThemeText
					]}
				>
					{title}
				</Text>
			)}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		width: "100%",
		height: 50,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center"
	},
	buttonLightTheme: {
		backgroundColor: "white",
		borderWidth: 1,
		borderColor: theme.colors.primary
	},
	buttonDarkTheme: {
		backgroundColor: theme.colors.primary
	},
	buttonText: {
		fontFamily: "Roboto-Medium",
		fontSize: 15
	},
	buttonLightThemeText: {
		color: theme.colors.primary
	},
	buttonDarkThemeText: {
		color: "white"
	}
})
