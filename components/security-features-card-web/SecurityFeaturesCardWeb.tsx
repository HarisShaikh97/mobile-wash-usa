import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter, usePathname } from "expo-router"
import Feather from "@expo/vector-icons/Feather"
import HorizontalSeparator from "../horizontal-separator/HorizontalSeparator"
import { theme } from "../../utils/constants"

export default function SecurityFeaturesCardWeb(): React.ReactElement | null {
	// Initialize the router instance for navigation
	const router = useRouter()

	// Get the current pathname for navigation
	const pathname = usePathname()

	return (
		// Main container for security features card
		<View style={styles.container}>
			{/* Card title */}
			<Text style={styles.cardTitleText}>Security Features</Text>
			{/* Horizontal line separator */}
			<HorizontalSeparator color="#DBDBDB" />
			{/* Container for security setting options */}
			<View style={styles.settingOptionContainer}>
				{/* Password Reset option */}
				<View style={styles.settingOption}>
					<Text style={styles.settingOptionText}>Password Reset</Text>
					{/* Navigation button for password reset */}
					<TouchableOpacity
						onPress={() => {
							// Determine route based on current user type (user/vendor)
							router.navigate(
								`/${
									pathname.includes("/user/")
										? "user"
										: "vendor"
								}/security/reset-password`
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
				{/* Report Abuse option */}
				<View style={styles.settingOption}>
					<Text style={styles.settingOptionText}>Report Abuse</Text>
					{/* Navigation button for report abuse (functionality to be implemented) */}
					<TouchableOpacity>
						<Feather
							name="chevron-right"
							size={17.5}
							color={theme.colors.secondary}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: 365,
		flexShrink: 1,
		alignSelf: "flex-start",
		flexDirection: "column",
		gap: 17.5,
		borderRadius: 17.5,
		backgroundColor: "white",
		padding: 25
	},
	cardTitleText: {
		fontSize: 15,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary
	},
	settingOptionContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 25,
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
	}
})
