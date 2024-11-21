import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { useFonts } from "expo-font"
import { theme } from "../../utils/constants"

interface FormButtonProps {
	length: "full" | "half"
	theme: "light" | "dark" | "danger" | "black" | "gray"
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
					: theme === "light"
					? styles.buttonLightTheme
					: theme === "danger"
					? styles.buttonDangerTheme
					: theme === "black"
					? styles.buttonBlackTheme
					: theme === "gray" && styles.buttonGrayTheme
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
							: theme === "light"
							? styles.buttonLightThemeText
							: theme === "danger"
							? styles.buttonDangerThemeText
							: theme === "black"
							? styles.buttonDarkThemeText
							: theme === "gray" && styles.buttonGrayThemeText
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
	buttonDangerTheme: {
		backgroundColor: "white",
		borderWidth: 1,
		borderColor: "#DC3545"
	},
	buttonBlackTheme: {
		backgroundColor: "black"
	},
	buttonGrayTheme: {
		backgroundColor: "#F5F5F5"
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
	},
	buttonDangerThemeText: {
		color: "#DC3545"
	},
	buttonGrayThemeText: {
		color: "black"
	}
})
