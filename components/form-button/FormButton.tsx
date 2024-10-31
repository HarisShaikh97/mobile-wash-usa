import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { useFonts } from "expo-font"
import { theme } from "../../utils/constants"

interface FormButtonProps {
	length: "full" | "half"
	theme: "light" | "dark"
	title: string
	onPress: () => void
}

export default function FormButton({
	length,
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
				length === "full"
					? styles.buttonContainerFull
					: styles.buttonContainerHalf,
				theme === "dark"
					? styles.buttonDarkTheme
					: styles.buttonLightTheme
			]}
			onPress={onPress}
		>
			{fontsLoaded && (
				<Text
					style={[
						length === "full"
							? styles.buttonText
							: styles.buttonTextSmall,
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
	buttonContainerFull: {
		width: "100%"
	},
	buttonContainerHalf: {
		width: "48.5%"
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
	buttonTextSmall: {
		fontFamily: "Roboto-Medium",
		fontSize: 13.5
	},
	buttonLightThemeText: {
		color: theme.colors.primary
	},
	buttonDarkThemeText: {
		color: "white"
	}
})
