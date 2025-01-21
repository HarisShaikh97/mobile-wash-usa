import {
	TouchableOpacity,
	Text,
	ActivityIndicator,
	StyleSheet
} from "react-native"
import { theme } from "../../utils/constants"

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
		<TouchableOpacity
			style={[
				styles.buttonContainer,
				length === "full"
					? styles.buttonContainerFull
					: styles.buttonContainerHalf,
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
			{isLoading ? (
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
				<Text
					style={[
						length === "full"
							? styles.buttonText
							: styles.buttonTextSmall,
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
