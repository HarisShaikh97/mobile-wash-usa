import { useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useSharedValue } from "react-native-reanimated"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import Feather from "@expo/vector-icons/Feather"
import ProfileImageBox from "../../../../components/profile-image-box/ProfileImageBox"
import ProfileLayout from "../../../../components/profile-layout/ProfileLayout"
import Switch from "../../../../components/switch/Switch"
import { theme } from "../../../../utils/constants"

export default function Tab(): React.ReactElement | null {
	const router = useRouter()

	const notificationsEnabled = useSharedValue(false)

	const handleUpdatedNotificationStatus = () => {
		notificationsEnabled.value = !notificationsEnabled.value
	}

	const handleLogout = useCallback((): void => {
		router.navigate("/")
	}, [router])

	return (
		<ProfileLayout title="Profile">
			<View style={styles.accountSettingsSection}>
				<Text style={styles.headingText}>Account</Text>
				<View style={styles.profileTab}>
					<View style={styles.profileIconWrapper}>
						<ProfileImageBox
							source={require("../../../../assets/images/vendor-profile.png")}
						/>
						<View style={styles.profileTextWrapper}>
							<Text style={styles.usernameText}>
								Michael Guzzi
							</Text>
							<Text style={styles.personalInfoText}>
								Personal Info
							</Text>
						</View>
					</View>
					<TouchableOpacity
						style={styles.nextButton}
						onPress={() => {
							router.navigate("/vendor/home/profile/preview")
						}}
					>
						<Feather
							name="chevron-right"
							size={17.5}
							color={theme.colors.secondary}
						/>
					</TouchableOpacity>
				</View>
				<Text style={styles.headingText}>Setting</Text>
				<View style={styles.settingOptionContainer}>
					<View style={styles.settingOption}>
						<View style={styles.settingOptionNameWrapper}>
							<Image
								source={require("../../../../assets/icons/edit-profile.svg")}
								style={styles.settingOptionIcon}
								contentFit="contain"
							/>
							<Text style={styles.settingOptionText}>
								Edit Profile
							</Text>
						</View>
						<TouchableOpacity
							style={styles.nextButton}
							onPress={() => {
								router.navigate("/vendor/edit-account")
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
						<View style={styles.settingOptionNameWrapper}>
							<Image
								source={require("../../../../assets/icons/security.svg")}
								style={styles.settingOptionIcon}
								contentFit="contain"
							/>
							<Text style={styles.settingOptionText}>
								Security
							</Text>
						</View>
						<TouchableOpacity
							style={styles.nextButton}
							onPress={() => {
								router.navigate("/vendor/security")
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
						<View style={styles.settingOptionNameWrapper}>
							<Image
								source={require("../../../../assets/icons/card2.svg")}
								style={styles.settingOptionIcon}
								contentFit="contain"
							/>
							<Text style={styles.settingOptionText}>
								Payment Details
							</Text>
						</View>
						<TouchableOpacity
							style={styles.nextButton}
							onPress={() => {
								router.navigate("/vendor/payment")
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
						<View style={styles.settingOptionNameWrapper}>
							<Image
								source={require("../../../../assets/icons/account-status.svg")}
								style={styles.settingOptionIcon}
								contentFit="contain"
							/>
							<Text style={styles.settingOptionText}>
								Account Status
							</Text>
						</View>
						<TouchableOpacity
							style={styles.nextButton}
							onPress={() => {
								router.navigate("/vendor/account-status")
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
						<View style={styles.settingOptionNameWrapper}>
							<Image
								source={require("../../../../assets/icons/notification-outline.svg")}
								style={styles.settingOptionIcon}
								contentFit="contain"
							/>
							<Text style={styles.settingOptionText}>
								Notification
							</Text>
						</View>
						<Switch
							value={notificationsEnabled}
							onPress={handleUpdatedNotificationStatus}
							containerStyles={styles.switch}
							duration={250}
						/>
					</View>
					<View style={styles.settingOption}>
						<View style={styles.settingOptionNameWrapper}>
							<Image
								source={require("../../../../assets/icons/help-and-support.svg")}
								style={styles.settingOptionIcon}
								contentFit="contain"
							/>
							<Text style={styles.settingOptionText}>
								Help & Support
							</Text>
						</View>
						<TouchableOpacity
							style={styles.nextButton}
							onPress={() => {
								router.navigate("/vendor/help-and-support")
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
						<View style={styles.settingOptionNameWrapper}>
							<Image
								source={require("../../../../assets/icons/privacy-policy.svg")}
								style={styles.settingOptionIcon}
								contentFit="contain"
							/>
							<Text style={styles.settingOptionText}>
								Privacy Policy
							</Text>
						</View>
						<TouchableOpacity
							style={styles.nextButton}
							onPress={() => {
								router.navigate("/vendor/privacy-policy")
							}}
						>
							<Feather
								name="chevron-right"
								size={17.5}
								color={theme.colors.secondary}
							/>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						style={styles.logOutButton}
						onPress={handleLogout}
					>
						<Image
							source={require("../../../../assets/icons/logout.svg")}
							style={styles.settingOptionIcon}
							contentFit="contain"
						/>
						<Text style={styles.settingOptionText}>Log Out</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ProfileLayout>
	)
}

const styles = StyleSheet.create({
	accountSettingsSection: {
		flexDirection: "column",
		gap: 30
	},
	headingText: {
		fontSize: 22.5,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary
	},
	profileTab: {
		height: 75,
		width: "100%",
		borderRadius: 10,
		backgroundColor: "#F5F5F5",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 10
	},
	profileIconWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12.5
	},
	profileTextWrapper: {
		flexDirection: "column"
	},
	usernameText: {
		fontSize: 20,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary
	},
	personalInfoText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	nextButton: {
		marginRight: 5
	},
	settingOptionContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 35,
		paddingBottom: 125
	},
	settingOption: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	settingOptionNameWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 17.5
	},
	settingOptionIcon: {
		height: 15,
		width: 15
	},
	settingOptionText: {
		fontSize: 15,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	switch: {
		width: 30,
		height: 15,
		padding: 1.5
	},
	logOutButton: {
		height: 50,
		width: 135,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#F5F5F5",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 15,
		alignSelf: "center"
	}
})
