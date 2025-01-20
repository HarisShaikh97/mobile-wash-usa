import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useSharedValue } from "react-native-reanimated"
import { Image, ImageBackground } from "expo-image"
import { useRouter } from "expo-router"
import Feather from "@expo/vector-icons/Feather"
import CustomerEditProfileCardWeb from "../../../../components/customer-edit-profile-card-web/CustomerEditProfileCardWeb"
import SecurityFeaturesCardWeb from "../../../../components/security-features-card-web/SecurityFeaturesCardWeb"
import AccountStatusCardWeb from "../../../../components/account-status-card-web/AccountStatusCardWeb"
import HelpAndSupportCardWeb from "../../../../components/help-and-support-card-web/HelpAndSupportCardWeb"
import PrivacyPolicyCardWeb from "../../../../components/privacy-policy-card-web/PrivacyPolicyCardWeb"
import AccountActionModal from "../../../../components/account-action-modal/AccountActionModal"
import Switch from "../../../../components/switch/Switch"
import { theme } from "../../../../utils/constants"

export default function Tab(): React.ReactElement | null {
	// Initialize router for navigation
	const router = useRouter()

	// State to track which settings tab is currently selected
	const [selectedTab, setSelectedTab] = useState<
		| "Edit Account"
		| "Security"
		| "Account Status"
		| "Help & Support"
		| "Privacy Policy"
	>("Edit Account")

	// State to control visibility of account action modal (delete/deactivate)
	const [openAccountActionModal, setOpenAccountActionModal] =
		useState<boolean>(false)

	// State to track which type of account action is selected (delete or deactivate)
	const [accountActiontype, setAccountActionType] = useState<
		"delete" | "deactivate"
	>("delete")

	// Shared value to track notification enabled/disabled state
	const notificationsEnabled = useSharedValue(false)

	// Memoized function to handle updating the notification status
	const handleUpdatedNotificationStatus = useCallback(() => {
		notificationsEnabled.value = !notificationsEnabled.value // Toggle the notification status
	}, [notificationsEnabled])

	// Memoized function to handle logging out
	const handleLogout = useCallback((): void => {
		router.navigate("/") // Navigate to home page on logout
	}, [router])

	return (
		<View style={styles.container}>
			{/* Account action modal for delete/deactivate */}
			<AccountActionModal
				openModal={openAccountActionModal}
				setOpenModal={setOpenAccountActionModal}
				type={accountActiontype}
				mode="web"
			/>
			{/* Header section with background image */}
			<ImageBackground
				source={require("../../../../assets/images/profile-header-bg-web.png")}
				style={styles.headerContainer}
				contentFit="fill"
			>
				<Text style={styles.titleText}>{selectedTab}</Text>
			</ImageBackground>
			{/* Main content container */}
			<View style={styles.bodyContainer}>
				{/* Settings sidebar */}
				<View style={styles.settingsCardContainer}>
					<Text style={styles.settingsTitleText}>Setting</Text>
					{/* Edit Profile option */}
					<TouchableOpacity
						style={styles.settingOptionContainer}
						onPress={() => {
							setSelectedTab("Edit Account")
						}}
					>
						<View style={styles.settingOptionTitleWrapper}>
							<Image
								source={
									selectedTab === "Edit Account"
										? require("../../../../assets/icons/edit-profile-blue.svg")
										: require("../../../../assets/icons/edit-profile.svg")
								}
								style={styles.settingOptionIcon}
								contentFit="contain"
							/>
							<Text
								style={[
									styles.settingOptionText,
									{
										color:
											selectedTab === "Edit Account"
												? theme.colors.primary
												: theme.colors.secondary
									}
								]}
							>
								Edit Profile
							</Text>
						</View>
						<Feather
							name="chevron-right"
							size={17.5}
							color={
								selectedTab === "Edit Account"
									? theme.colors.primary
									: theme.colors.secondary
							}
						/>
					</TouchableOpacity>
					{/* Security option */}
					<TouchableOpacity
						style={styles.settingOptionContainer}
						onPress={() => {
							setSelectedTab("Security")
						}}
					>
						<View style={styles.settingOptionTitleWrapper}>
							<Image
								source={
									selectedTab === "Security"
										? require("../../../../assets/icons/security-blue.svg")
										: require("../../../../assets/icons/security.svg")
								}
								style={styles.settingOptionIcon}
								contentFit="contain"
							/>
							<Text
								style={[
									styles.settingOptionText,
									{
										color:
											selectedTab === "Security"
												? theme.colors.primary
												: theme.colors.secondary
									}
								]}
							>
								Security
							</Text>
						</View>
						<Feather
							name="chevron-right"
							size={17.5}
							color={
								selectedTab === "Security"
									? theme.colors.primary
									: theme.colors.secondary
							}
						/>
					</TouchableOpacity>
					{/* Account Status option */}
					<TouchableOpacity
						style={styles.settingOptionContainer}
						onPress={() => {
							setSelectedTab("Account Status")
						}}
					>
						<View style={styles.settingOptionTitleWrapper}>
							<Image
								source={
									selectedTab === "Account Status"
										? require("../../../../assets/icons/account-status-blue.svg")
										: require("../../../../assets/icons/account-status.svg")
								}
								style={styles.settingOptionIcon}
								contentFit="contain"
							/>
							<Text
								style={[
									styles.settingOptionText,
									{
										color:
											selectedTab === "Account Status"
												? theme.colors.primary
												: theme.colors.secondary
									}
								]}
							>
								Account Status
							</Text>
						</View>
						<Feather
							name="chevron-right"
							size={17.5}
							color={
								selectedTab === "Account Status"
									? theme.colors.primary
									: theme.colors.secondary
							}
						/>
					</TouchableOpacity>
					{/* Notifications toggle */}
					<View style={styles.settingOptionContainer}>
						<View style={styles.settingOptionTitleWrapper}>
							<Image
								source={require("../../../../assets/icons/notification-outline.svg")}
								style={styles.settingOptionIcon}
								contentFit="contain"
							/>
							<Text
								style={[
									styles.settingOptionText,
									{
										color: theme.colors.secondary
									}
								]}
							>
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
					{/* Help & Support option */}
					<TouchableOpacity
						style={styles.settingOptionContainer}
						onPress={() => {
							setSelectedTab("Help & Support")
						}}
					>
						<View style={styles.settingOptionTitleWrapper}>
							<Image
								source={
									selectedTab === "Help & Support"
										? require("../../../../assets/icons/help-and-support-blue.svg")
										: require("../../../../assets/icons/help-and-support.svg")
								}
								style={styles.settingOptionIcon}
								contentFit="contain"
							/>
							<Text
								style={[
									styles.settingOptionText,
									{
										color:
											selectedTab === "Help & Support"
												? theme.colors.primary
												: theme.colors.secondary
									}
								]}
							>
								Help & Support
							</Text>
						</View>
						<Feather
							name="chevron-right"
							size={17.5}
							color={
								selectedTab === "Help & Support"
									? theme.colors.primary
									: theme.colors.secondary
							}
						/>
					</TouchableOpacity>
					{/* Privacy Policy option */}
					<TouchableOpacity
						style={styles.settingOptionContainer}
						onPress={() => {
							setSelectedTab("Privacy Policy")
						}}
					>
						<View style={styles.settingOptionTitleWrapper}>
							<Image
								source={
									selectedTab === "Privacy Policy"
										? require("../../../../assets/icons/privacy-policy-blue.svg")
										: require("../../../../assets/icons/privacy-policy.svg")
								}
								style={styles.settingOptionIcon}
								contentFit="contain"
							/>
							<Text
								style={[
									styles.settingOptionText,
									{
										color:
											selectedTab === "Privacy Policy"
												? theme.colors.primary
												: theme.colors.secondary
									}
								]}
							>
								Privacy Policy
							</Text>
						</View>
						<Feather
							name="chevron-right"
							size={17.5}
							color={
								selectedTab === "Privacy Policy"
									? theme.colors.primary
									: theme.colors.secondary
							}
						/>
					</TouchableOpacity>
					{/* Logout button */}
					<TouchableOpacity
						style={styles.logOutButton}
						onPress={handleLogout}
					>
						<Image
							source={require("../../../../assets/icons/logout.svg")}
							style={styles.logoutButtonIcon}
							contentFit="contain"
						/>
						<Text style={styles.logoutButtonText}>Log Out</Text>
					</TouchableOpacity>
				</View>
				{/* Conditional rendering of content based on selected tab */}
				{selectedTab === "Edit Account" ? (
					<CustomerEditProfileCardWeb />
				) : selectedTab === "Security" ? (
					<SecurityFeaturesCardWeb />
				) : selectedTab === "Account Status" ? (
					<AccountStatusCardWeb
						setType={setAccountActionType}
						setOpenModal={setOpenAccountActionModal}
					/>
				) : selectedTab === "Help & Support" ? (
					<HelpAndSupportCardWeb />
				) : (
					selectedTab === "Privacy Policy" && <PrivacyPolicyCardWeb />
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		gap: 15,
		paddingTop: 15
	},
	headerContainer: {
		height: 165,
		width: "100%",
		borderRadius: 17.5,
		backgroundColor: theme.colors.primary,
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center"
	},
	titleText: {
		fontSize: 35,
		fontFamily: "Montserrat-SemiBold",
		color: "white",
		letterSpacing: 0.5
	},
	bodyContainer: {
		flex: 1,
		flexDirection: "row",
		gap: 15
	},
	settingsCardContainer: {
		flexShrink: 1,
		alignSelf: "flex-start",
		width: 460,
		paddingVertical: 25,
		paddingHorizontal: 35,
		borderRadius: 17.5,
		backgroundColor: "white",
		flexDirection: "column",
		gap: 40
	},
	settingsTitleText: {
		fontSize: 25,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary,
		letterSpacing: 0.5
	},
	settingOptionContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	settingOptionTitleWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 20
	},
	settingOptionIcon: {
		height: 17.5,
		width: 17.5
	},
	settingOptionText: {
		fontSize: 17.5,
		fontFamily: "Roboto-Regular",
		textTransform: "capitalize"
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
		gap: 15
	},
	logoutButtonIcon: {
		height: 17.5,
		width: 17.5
	},
	logoutButtonText: {
		fontSize: 17.5,
		fontFamily: "Roboto-Regular",
		textTransform: "capitalize",
		color: theme.colors.secondary
	}
})
