import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useSharedValue } from "react-native-reanimated"
import { Image, ImageBackground } from "expo-image"
import { useRouter } from "expo-router"
import Feather from "@expo/vector-icons/Feather"
import EditProfileCardWeb from "../../../../components/edit-profile-card-web/EditProfileCardWeb"
import SecurityFeaturesCardWeb from "../../../../components/security-features-card-web/SecurityFeaturesCardWeb"
import AccountStatusCardWeb from "../../../../components/account-status-card-web/AccountStatusCardWeb"
import HelpAndSupportCardWeb from "../../../../components/help-and-support-card-web/HelpAndSupportCardWeb"
import PrivacyPolicyCardWeb from "../../../../components/privacy-policy-card-web/PrivacyPolicyCardWeb"
import Switch from "../../../../components/switch/Switch"
import { theme } from "../../../../utils/constants"

export default function Tab(): React.ReactElement | null {
	const router = useRouter()

	const [selectedTab, setSelectedTab] = useState<
		| "Edit Account"
		| "Security"
		| "Account Status"
		| "Help & Support"
		| "Privacy Policy"
	>("Edit Account")

	const notificationsEnabled = useSharedValue(false)

	const handleUpdatedNotificationStatus = () => {
		notificationsEnabled.value = !notificationsEnabled.value
	}

	const handleLogout = useCallback((): void => {
		router.navigate("/")
	}, [router])

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("../../../../assets/images/profile-header-bg-web.png")}
				style={styles.headerContainer}
				contentFit="fill"
			>
				<Text style={styles.titleText}>{selectedTab}</Text>
			</ImageBackground>
			<View style={styles.bodyContainer}>
				<View style={styles.settingsCardContainer}>
					<Text style={styles.settingsTitleText}>Setting</Text>
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
				{selectedTab === "Edit Account" ? (
					<EditProfileCardWeb />
				) : selectedTab === "Security" ? (
					<SecurityFeaturesCardWeb />
				) : selectedTab === "Account Status" ? (
					<AccountStatusCardWeb />
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
