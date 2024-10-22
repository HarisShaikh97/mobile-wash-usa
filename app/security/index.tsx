import { useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import { useSharedValue } from "react-native-reanimated"
import Feather from "@expo/vector-icons/Feather"
import HorizontalSeparator from "../../components/horizontal-separator/HorizontalSeparator"
import Switch from "../../components/switch/Switch"
import { theme } from "../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const twoFactorAuthenticationEnabled = useSharedValue(false)

	const handleTwoFactorAuthenticationStatus = () => {
		twoFactorAuthenticationEnabled.value =
			!twoFactorAuthenticationEnabled.value
	}

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Roboto-Medium": require("../../assets/fonts/Roboto/Roboto Medium 500.ttf"),
		"Roboto-Regular": require("../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	const handleSave = useCallback(() => {
		router.back()
	}, [router])

	const handleCancel = useCallback(() => {
		router.back()
	}, [router])

	return (
		<View style={styles.container}>
			{fontsLoaded && <Text style={styles.titleText}>Security</Text>}
			<View style={styles.featuresCard}>
				{fontsLoaded && (
					<Text style={styles.cardTitleText}>Security Features</Text>
				)}
				<HorizontalSeparator />
				<View style={styles.settingOptionContainer}>
					<View style={styles.settingOption}>
						{fontsLoaded && (
							<Text style={styles.settingOptionText}>
								Two-Factor Authentication (2FA)
							</Text>
						)}
						<Switch
							value={twoFactorAuthenticationEnabled}
							onPress={handleTwoFactorAuthenticationStatus}
							containerStyles={styles.switch}
							duration={250}
						/>
					</View>
					<View style={styles.settingOption}>
						{fontsLoaded && (
							<Text style={styles.settingOptionText}>
								Password Reset
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
			<View style={styles.actionButtonsWrapper}>
				<TouchableOpacity
					style={[
						styles.actionButtonContainer,
						styles.cancelButtonContainer
					]}
					onPress={handleCancel}
				>
					{fontsLoaded && (
						<Text
							style={[
								styles.actionButtonText,
								styles.cancelButtonText
							]}
						>
							Cancel
						</Text>
					)}
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.actionButtonContainer,
						styles.saveButtonContainer
					]}
					onPress={handleSave}
				>
					{fontsLoaded && (
						<Text
							style={[
								styles.actionButtonText,
								styles.saveButtonText
							]}
						>
							Save
						</Text>
					)}
				</TouchableOpacity>
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
	},
	switch: {
		width: 30,
		height: 15,
		padding: 1.5
	},
	actionButtonsWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 15,
		marginTop: 10
	},
	actionButtonContainer: {
		height: 50,
		width: 125,
		borderRadius: 8.5,
		alignItems: "center",
		justifyContent: "center"
	},
	actionButtonText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Medium"
	},
	cancelButtonContainer: {
		borderWidth: 1,
		borderColor: theme.colors.secondary
	},
	cancelButtonText: {
		color: theme.colors.secondary
	},
	saveButtonContainer: {
		backgroundColor: theme.colors.primary
	},
	saveButtonText: {
		color: "white"
	}
})
