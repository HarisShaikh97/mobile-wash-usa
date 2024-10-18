import { useCallback, useState } from "react"
import {
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { Image } from "expo-image"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import SwitchToggle from "react-native-switch-toggle"
import Feather from "@expo/vector-icons/Feather"
import BackButton from "../../../components/back-button/BackButton"
import NotificationButton from "../../../components/notification-button/NotificationButton"
import ProfileImageBox from "../../../components/profile-image-box/ProfileImageBox"
import { theme } from "../../../utils/constants"

export default function Tab(): React.ReactElement | null {
	const router = useRouter()

	const [notificationsEnabled, setNotificationsEnabled] =
		useState<boolean>(true)

	const [fontsLoaded] = useFonts({
		"Montserrat-SemiBold": require("../../../assets/fonts/Montserrat/Montserrat SemiBold 600.ttf"),
		"Montserrat-Regular": require("../../../assets/fonts/Montserrat/Montserrat Regular 400.ttf"),
		"Roboto-Regular": require("../../../assets/fonts/Roboto/Roboto 400.ttf"),
		"Roboto-Medium": require("../../../assets/fonts/Roboto/Roboto Medium 500.ttf")
	})

	const handleLogout = useCallback((): void => {
		router.navigate("/")
	}, [router])

	return (
		<ScrollView
			style={styles.scrollContainer}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.container}>
				<Image
					source={require("../../../assets/images/profile-bg.png")}
					style={styles.bgImage}
					contentFit="fill"
				/>
				<View style={styles.bodyContainer}>
					<View style={styles.headerContainer}>
						<BackButton
							color="white"
							backgroundColor="rgba(255, 255, 255, 0.15)"
							borderColor="white"
						/>
						<NotificationButton theme="dark" />
					</View>
					{fontsLoaded && (
						<Text style={styles.titleText}>Profile</Text>
					)}
					<View style={styles.accountSettingsSection}>
						{fontsLoaded && (
							<Text style={styles.headingText}>Account</Text>
						)}
						<View style={styles.profileTab}>
							<View style={styles.profileIconWrapper}>
								<ProfileImageBox />
								<View style={styles.profileTextWrapper}>
									{fontsLoaded && (
										<Text style={styles.usernameText}>
											John Doe
										</Text>
									)}
									{fontsLoaded && (
										<Text style={styles.personalInfoText}>
											Personal Info
										</Text>
									)}
								</View>
							</View>
							<TouchableOpacity style={styles.nextButton}>
								<Feather
									name="chevron-right"
									size={17.5}
									color="black"
								/>
							</TouchableOpacity>
						</View>
						{fontsLoaded && (
							<Text style={styles.headingText}>Setting</Text>
						)}
						<View style={styles.settingOptionContainer}>
							<View style={styles.settingOption}>
								<View style={styles.settingOptionNameWrapper}>
									<Image
										source={require("../../../assets/icons/edit-profile.svg")}
										style={styles.settingOptionIcon}
										contentFit="contain"
									/>
									{fontsLoaded && (
										<Text style={styles.settingOptionText}>
											Edit Profile
										</Text>
									)}
								</View>
								<TouchableOpacity style={styles.nextButton}>
									<Feather
										name="chevron-right"
										size={17.5}
										color="black"
									/>
								</TouchableOpacity>
							</View>
							<View style={styles.settingOption}>
								<View style={styles.settingOptionNameWrapper}>
									<Image
										source={require("../../../assets/icons/security.svg")}
										style={styles.settingOptionIcon}
										contentFit="contain"
									/>
									{fontsLoaded && (
										<Text style={styles.settingOptionText}>
											Security
										</Text>
									)}
								</View>
								<TouchableOpacity style={styles.nextButton}>
									<Feather
										name="chevron-right"
										size={17.5}
										color="black"
									/>
								</TouchableOpacity>
							</View>
							<View style={styles.settingOption}>
								<View style={styles.settingOptionNameWrapper}>
									<Image
										source={require("../../../assets/icons/account-status.svg")}
										style={styles.settingOptionIcon}
										contentFit="contain"
									/>
									{fontsLoaded && (
										<Text style={styles.settingOptionText}>
											Account Status
										</Text>
									)}
								</View>
								<TouchableOpacity style={styles.nextButton}>
									<Feather
										name="chevron-right"
										size={17.5}
										color="black"
									/>
								</TouchableOpacity>
							</View>
							<View style={styles.settingOption}>
								<View style={styles.settingOptionNameWrapper}>
									<Image
										source={require("../../../assets/icons/notification-outline.svg")}
										style={styles.settingOptionIcon}
										contentFit="contain"
									/>
									{fontsLoaded && (
										<Text style={styles.settingOptionText}>
											Notification
										</Text>
									)}
								</View>
								<SwitchToggle
									switchOn={notificationsEnabled}
									onPress={() =>
										setNotificationsEnabled((prev) => !prev)
									}
									circleColorOff="white"
									circleColorOn="white"
									backgroundColorOn={theme.colors.primary}
									backgroundColorOff="black"
									containerStyle={{
										height: 15,
										width: 30,
										borderRadius: 10,
										padding: 2.5
									}}
									circleStyle={{
										height: 10,
										width: 10,
										borderRadius: 5
									}}
								/>
							</View>
							<View style={styles.settingOption}>
								<View style={styles.settingOptionNameWrapper}>
									<Image
										source={require("../../../assets/icons/help-and-support.svg")}
										style={styles.settingOptionIcon}
										contentFit="contain"
									/>
									{fontsLoaded && (
										<Text style={styles.settingOptionText}>
											Help & Support
										</Text>
									)}
								</View>
								<TouchableOpacity style={styles.nextButton}>
									<Feather
										name="chevron-right"
										size={17.5}
										color="black"
									/>
								</TouchableOpacity>
							</View>
							<View style={styles.settingOption}>
								<View style={styles.settingOptionNameWrapper}>
									<Image
										source={require("../../../assets/icons/privacy-policy.svg")}
										style={styles.settingOptionIcon}
										contentFit="contain"
									/>
									{fontsLoaded && (
										<Text style={styles.settingOptionText}>
											Privacy Policy
										</Text>
									)}
								</View>
								<TouchableOpacity style={styles.nextButton}>
									<Feather
										name="chevron-right"
										size={17.5}
										color="black"
									/>
								</TouchableOpacity>
							</View>
						</View>
						<TouchableOpacity
							style={styles.logOutButton}
							onPress={handleLogout}
						>
							<Image
								source={require("../../../assets/icons/logout.svg")}
								style={styles.settingOptionIcon}
								contentFit="contain"
							/>
							{fontsLoaded && (
								<Text style={styles.settingOptionText}>
									Log Out
								</Text>
							)}
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scrollContainer: {
		flex: 1,
		backgroundColor: "white"
	},
	container: {
		width: "100%",
		position: "relative"
	},
	bgImage: {
		height: 300,
		width: "100%",
		position: "absolute",
		top: 0,
		left: 0,
		zIndex: -10,
		backgroundColor: theme.colors.primary
	},
	bodyContainer: {
		width: "100%",
		zIndex: 10,
		flexDirection: "column"
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 25
	},
	titleText: {
		fontSize: 25,
		fontFamily: "Montserrat-SemiBold",
		color: "white",
		alignSelf: "center"
	},
	accountSettingsSection: {
		width: "100%",
		backgroundColor: "white",
		flexDirection: "column",
		gap: 30,
		borderRadius: 25,
		paddingHorizontal: 25,
		paddingTop: 30,
		paddingBottom: 125,
		marginTop: 35
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
		gap: 35
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
		fontFamily: "Roboto-Regular"
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
