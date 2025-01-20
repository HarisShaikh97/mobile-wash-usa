import { useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useSharedValue } from "react-native-reanimated"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import Feather from "@expo/vector-icons/Feather"
import ProfileImageBox from "../../../../components/profile-image-box/ProfileImageBox"
import Switch from "../../../../components/switch/Switch"
import { theme } from "../../../../utils/constants"

export default function Tab(): React.ReactElement | null {
	// Using useRouter hook to navigate
	const router = useRouter()

	// Shared value to track notification enabled/disabled state
	const notificationsEnabled = useSharedValue(false)

	// Memoized function to handle updating the notification status
	const handleUpdatedNotificationStatus = useCallback(() => {
		notificationsEnabled.value = !notificationsEnabled.value // Toggle the notification status
	}, [notificationsEnabled])

	// Memoized function to handle logging out
	const handleLogout = useCallback((): void => {
		router.navigate("/") // Navigate to the home page
	}, [router])

	return (
		<View style={styles.accountSettingsSection}>
			{/* Account section heading */}
			<Text style={styles.headingText}>Account</Text>
			<View style={styles.profileTab}>
				<View style={styles.profileIconWrapper}>
					{/* User profile image */}
					<ProfileImageBox
						source={require("../../../../assets/images/profile.png")}
						mode="app"
					/>
					<View style={styles.profileTextWrapper}>
						{/* Username display */}
						<Text style={styles.usernameText}>John Doe</Text>
						{/* Personal info label */}
						<Text style={styles.personalInfoText}>
							Personal Info
						</Text>
					</View>
				</View>
				<TouchableOpacity
					style={styles.nextButton}
					onPress={() => {
						router.navigate("/user/edit-account")
					}}
				>
					{/* Navigation chevron icon */}
					<Feather
						name="chevron-right"
						size={17.5}
						color={theme.colors.secondary}
					/>
				</TouchableOpacity>
			</View>

			{/* Settings section heading */}
			<Text style={styles.headingText}>Setting</Text>
			<View style={styles.settingOptionContainer}>
				{/* Edit Profile option */}
				<View style={styles.settingOption}>
					<View style={styles.settingOptionNameWrapper}>
						{/* Edit profile icon */}
						<Image
							source={require("../../../../assets/icons/edit-profile.svg")}
							style={styles.settingOptionIcon}
							contentFit="contain"
						/>
						{/* Edit profile text */}
						<Text style={styles.settingOptionText}>
							Edit Profile
						</Text>
					</View>
					<TouchableOpacity
						style={styles.nextButton}
						onPress={() => {
							router.navigate("/user/edit-account")
						}}
					>
						{/* Navigation chevron icon */}
						<Feather
							name="chevron-right"
							size={17.5}
							color={theme.colors.secondary}
						/>
					</TouchableOpacity>
				</View>

				{/* Security option */}
				<View style={styles.settingOption}>
					<View style={styles.settingOptionNameWrapper}>
						{/* Security icon */}
						<Image
							source={require("../../../../assets/icons/security.svg")}
							style={styles.settingOptionIcon}
							contentFit="contain"
						/>
						{/* Security text */}
						<Text style={styles.settingOptionText}>Security</Text>
					</View>
					<TouchableOpacity
						style={styles.nextButton}
						onPress={() => {
							router.navigate("/user/security")
						}}
					>
						{/* Navigation chevron icon */}
						<Feather
							name="chevron-right"
							size={17.5}
							color={theme.colors.secondary}
						/>
					</TouchableOpacity>
				</View>

				{/* Account Status option */}
				<View style={styles.settingOption}>
					<View style={styles.settingOptionNameWrapper}>
						{/* Account status icon */}
						<Image
							source={require("../../../../assets/icons/account-status.svg")}
							style={styles.settingOptionIcon}
							contentFit="contain"
						/>
						{/* Account status text */}
						<Text style={styles.settingOptionText}>
							Account Status
						</Text>
					</View>
					<TouchableOpacity
						style={styles.nextButton}
						onPress={() => {
							router.navigate("/user/account-status")
						}}
					>
						{/* Navigation chevron icon */}
						<Feather
							name="chevron-right"
							size={17.5}
							color={theme.colors.secondary}
						/>
					</TouchableOpacity>
				</View>

				{/* Notification toggle */}
				<View style={styles.settingOption}>
					<View style={styles.settingOptionNameWrapper}>
						{/* Notification icon */}
						<Image
							source={require("../../../../assets/icons/notification-outline.svg")}
							style={styles.settingOptionIcon}
							contentFit="contain"
						/>
						{/* Notification text */}
						<Text style={styles.settingOptionText}>
							Notification
						</Text>
					</View>
					{/* Notification toggle switch */}
					<Switch
						value={notificationsEnabled}
						onPress={handleUpdatedNotificationStatus}
						containerStyles={styles.switch}
						duration={250}
					/>
				</View>

				{/* Help & Support option */}
				<View style={styles.settingOption}>
					<View style={styles.settingOptionNameWrapper}>
						{/* Help and support icon */}
						<Image
							source={require("../../../../assets/icons/help-and-support.svg")}
							style={styles.settingOptionIcon}
							contentFit="contain"
						/>
						{/* Help and support text */}
						<Text style={styles.settingOptionText}>
							Help & Support
						</Text>
					</View>
					<TouchableOpacity
						style={styles.nextButton}
						onPress={() => {
							router.navigate("/user/help-and-support")
						}}
					>
						{/* Navigation chevron icon */}
						<Feather
							name="chevron-right"
							size={17.5}
							color={theme.colors.secondary}
						/>
					</TouchableOpacity>
				</View>

				{/* Privacy Policy option */}
				<View style={styles.settingOption}>
					<View style={styles.settingOptionNameWrapper}>
						{/* Privacy policy icon */}
						<Image
							source={require("../../../../assets/icons/privacy-policy.svg")}
							style={styles.settingOptionIcon}
							contentFit="contain"
						/>
						{/* Privacy policy text */}
						<Text style={styles.settingOptionText}>
							Privacy Policy
						</Text>
					</View>
					<TouchableOpacity
						style={styles.nextButton}
						onPress={() => {
							router.navigate("/user/privacy-policy")
						}}
					>
						{/* Navigation chevron icon */}
						<Feather
							name="chevron-right"
							size={17.5}
							color={theme.colors.secondary}
						/>
					</TouchableOpacity>
				</View>

				{/* Logout button */}
				<TouchableOpacity
					style={styles.logOutButton}
					onPress={handleLogout}
				>
					{/* Logout icon */}
					<Image
						source={require("../../../../assets/icons/logout.svg")}
						style={styles.settingOptionIcon}
						contentFit="contain"
					/>
					{/* Logout text */}
					<Text style={styles.settingOptionText}>Log Out</Text>
				</TouchableOpacity>
			</View>
		</View>
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
