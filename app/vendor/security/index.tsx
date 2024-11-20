import { useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import Feather from "@expo/vector-icons/Feather"
import HorizontalSeparator from "../../../components/horizontal-separator/HorizontalSeparator"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Roboto-Medium": require("../../../assets/fonts/Roboto/Roboto Medium 500.ttf"),
		"Roboto-Regular": require("../../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	return (
		<View style={styles.container}>
			{fontsLoaded && <Text style={styles.titleText}>Security</Text>}
			<View style={styles.featuresCard}>
				{fontsLoaded && (
					<Text style={styles.cardTitleText}>Security Features</Text>
				)}
				<HorizontalSeparator color="#DBDBDB" />
				<View style={styles.settingOptionContainer}>
					<View style={styles.settingOption}>
						{fontsLoaded && (
							<Text style={styles.settingOptionText}>
								Password Reset
							</Text>
						)}
						<TouchableOpacity
							style={styles.nextButton}
							onPress={() => {
								router.navigate(
									"/vendor/security/reset-password"
								)
							}}
						>
							<Feather
								name="chevron-right"
								size={17.5}
								color={theme.colors.secondary}
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.settingOption}>
						{fontsLoaded && (
							<Text style={styles.settingOptionText}>
								Report Abuse
							</Text>
						)}
						<TouchableOpacity style={styles.nextButton}>
							<Feather
								name="chevron-right"
								size={17.5}
								color={theme.colors.secondary}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		gap: 35
	},
	titleText: {
		fontSize: 22.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary
	},
	featuresCard: {
		width: "100%",
		flexDirection: "column",
		gap: 15,
		paddingHorizontal: 17.5,
		paddingVertical: 22.5,
		borderRadius: 15,
		backgroundColor: "#F4F6F9"
	},
	cardTitleText: {
		fontSize: 15,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary
	},
	settingOptionContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 30,
		paddingVertical: 10
	},
	settingOption: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	settingOptionText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	nextButton: {
		marginRight: 5
	}
})
