import { useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import HorizontalSeparator from "../../components/horizontal-separator/HorizontalSeparator"
import { theme } from "../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Roboto-Medium": require("../../assets/fonts/Roboto/Roboto Medium 500.ttf"),
		"Roboto-Regular": require("../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	const handleCancel = useCallback(() => {
		router.back()
	}, [router])

	return (
		<View style={styles.container}>
			{fontsLoaded && (
				<Text style={styles.titleText}>Manage Your Account Status</Text>
			)}
			{fontsLoaded && (
				<Text style={styles.descriptionText}>
					You can choose to deactivate your account temporarily or
					delete it permanently. Please select an option below.
				</Text>
			)}
			<View style={styles.accountActionsCard}>
				<View style={styles.accountActionSection}>
					{fontsLoaded && (
						<Text style={styles.cardTitleText}>
							Deactivate Account
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardDescriptionText}>
							Temporarily deactivate your account. You won’t be
							able to access it, but all your data will remain
							saved. You can reactivate at any time by logging in
							again.
						</Text>
					)}
					<TouchableOpacity style={styles.accountActionButton}>
						{fontsLoaded && (
							<Text style={styles.accountActionButtonText}>
								Deactivate Account
							</Text>
						)}
					</TouchableOpacity>
				</View>
				<HorizontalSeparator />
				<View style={styles.accountActionSection}>
					{fontsLoaded && (
						<Text style={styles.cardTitleText}>Delete Account</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardDescriptionText}>
							Permanently delete your account. All your data will
							be erased, and this action cannot be undone.
						</Text>
					)}
					<TouchableOpacity style={styles.accountActionButton}>
						{fontsLoaded && (
							<Text style={styles.accountActionButtonText}>
								Delete Account
							</Text>
						)}
					</TouchableOpacity>
				</View>
			</View>
			<TouchableOpacity
				style={styles.cancelButtonContainer}
				onPress={handleCancel}
			>
				{fontsLoaded && (
					<Text style={styles.cancelButtonText}>Cancel</Text>
				)}
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		gap: 10
	},
	titleText: {
		fontSize: 22.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		width: 200,
		textAlign: "center"
	},
	descriptionText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		width: 300,
		textAlign: "center"
	},
	accountActionsCard: {
		width: "100%",
		flexDirection: "column",
		gap: 25,
		marginTop: 15,
		paddingHorizontal: 17.5,
		paddingVertical: 22.5,
		borderRadius: 15,
		backgroundColor: "#F4F6F9"
	},
	accountActionSection: {
		width: "100%",
		flexDirection: "column",
		alignItems: "flex-start",
		gap: 5
	},
	accountActionButton: {
		height: 40,
		borderRadius: 7.5,
		borderWidth: 1,
		borderColor: "#DBDBDB",
		paddingHorizontal: 20,
		justifyContent: "center",
		marginTop: 15
	},
	accountActionButtonText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Regular",
		lineHeight: 17.5,
		color: theme.colors.secondary
	},
	cardTitleText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary
	},
	cardDescriptionText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	cancelButtonContainer: {
		height: 50,
		width: 125,
		borderRadius: 8.5,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: theme.colors.secondary,
		marginTop: 35,
		alignSelf: "center"
	},
	cancelButtonText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary
	}
})
