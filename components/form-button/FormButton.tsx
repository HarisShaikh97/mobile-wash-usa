import {
	TouchableOpacity,
	Text,
	ActivityIndicator,
	StyleSheet
} from "react-native"
import { theme } from "../../utils/constants"

// Interface for the props of the component
interface FormButtonProps {
	length: "full" | "half"
	colorTheme: "light" | "dark" | "danger" | "black" | "gray"
	isLoading: boolean
	title: string
	onPress: () => void
}

export default function FormButton({
	length,
	colorTheme,
	isLoading,
	title,
	onPress
}: FormButtonProps): React.ReactElement | null {
	return (
		// TouchableOpacity component that acts as a button
		<TouchableOpacity
			style={[
				styles.buttonContainer,
				// Set button width based on length prop
				length === "full"
					? styles.buttonContainerFull
					: styles.buttonContainerHalf,
				// Apply different theme styles based on colorTheme prop
				colorTheme === "dark"
					? styles.buttonDarkTheme
					: colorTheme === "light"
					? styles.buttonLightTheme
					: colorTheme === "danger"
					? styles.buttonDangerTheme
					: colorTheme === "black"
					? styles.buttonBlackTheme
					: colorTheme === "gray" && styles.buttonGrayTheme
			]}
			disabled={isLoading}
			onPress={onPress}
		>
			{/* Show loading indicator or button text based on isLoading prop */}
			{isLoading ? (
				// Loading spinner with color based on theme
				<ActivityIndicator
					size={25}
					color={
						colorTheme === "dark" ||
						colorTheme === "black" ||
						colorTheme === "gray"
							? "white"
							: colorTheme === "danger"
							? "#DC3545"
							: theme.colors.primary
					}
				/>
			) : (
				// Button text with styling based on length and theme
				<Text
					style={[
						// Text size based on button length
						length === "full"
							? styles.buttonText
							: styles.buttonTextSmall,
						// Text color based on theme
						colorTheme === "dark"
							? styles.buttonDarkThemeText
							: colorTheme === "light"
							? styles.buttonLightThemeText
							: colorTheme === "danger"
							? styles.buttonDangerThemeText
							: colorTheme === "black"
							? styles.buttonDarkThemeText
							: colorTheme === "gray" &&
							  styles.buttonGrayThemeText
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
		borderRadius: 12.5,
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
