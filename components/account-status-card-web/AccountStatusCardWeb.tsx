import { useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import HorizontalSeparator from "../horizontal-separator/HorizontalSeparator"
import { theme } from "../../utils/constants"

// Interface for the props of the component
interface AccountStatusCardProps {
	setType: (type: "delete" | "deactivate") => void
	setOpenModal: (open: boolean) => void
}

export default function AccountStatusCardWeb({
	setType,
	setOpenModal
}: AccountStatusCardProps): React.ReactElement | null {
	// Memoized callback for handling the "Delete Account" button
	const handleDeleteAccount = useCallback((): void => {
		setType("delete") // Set the action type to "delete"
		setOpenModal(true) // Open the modal
	}, [setType, setOpenModal])

	// Memoized callback for handling the "Deactivate Account" button
	const handleDeactivateAccount = useCallback((): void => {
		setType("deactivate") // Set the action type to "deactivate"
		setOpenModal(true) // Open the modal
	}, [setType, setOpenModal])

	return (
		// Main container for the account status card
		<View style={styles.container}>
			{/* Title section with heading and description */}
			<View style={styles.titleWrapper}>
				<Text style={styles.titleText}>Manage your account status</Text>
				<Text style={styles.descriptionText}>
					You can choose to deactivate your account temporarily or
					delete it permanently. Please select an option below.
				</Text>
			</View>
			{/* Card containing account action options */}
			<View style={styles.accountActionsCard}>
				{/* Deactivate account section */}
				<View style={styles.accountActionSection}>
					<Text style={styles.cardTitleText}>Deactivate Account</Text>
					<Text style={styles.cardDescriptionText}>
						Temporarily deactivate your account. You won't be able
						to access it, but all your data will remain saved. You
						can reactivate at any time by logging in again.
					</Text>
					{/* Button to trigger account deactivation */}
					<TouchableOpacity
						style={styles.accountActionButton}
						onPress={handleDeactivateAccount}
					>
						<Text style={styles.accountActionButtonText}>
							Deactivate Account
						</Text>
					</TouchableOpacity>
				</View>
				{/* Visual separator between actions */}
				<HorizontalSeparator color="#DBDBDB" />
				{/* Delete account section */}
				<View style={styles.accountActionSection}>
					<Text style={styles.cardTitleText}>Delete Account</Text>
					<Text style={styles.cardDescriptionText}>
						Permanently delete your account. All your data will be
						erased, and this action cannot be undone.
					</Text>
					{/* Button to trigger account deletion */}
					<TouchableOpacity
						style={styles.accountActionButton}
						onPress={handleDeleteAccount}
					>
						<Text style={styles.accountActionButtonText}>
							Delete Account
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: 775,
		flexShrink: 1,
		alignSelf: "flex-start",
		flexDirection: "row",
		gap: 25,
		borderRadius: 17.5,
		backgroundColor: "white",
		padding: 25
	},
	accountActionsCard: {
		flex: 1,
		flexDirection: "column",
		gap: 25,
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
	titleWrapper: {
		flex: 1,
		flexDirection: "column",
		gap: 10
	},
	titleText: {
		fontSize: 25,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary,
		textTransform: "capitalize",
		width: 200
	},
	descriptionText: {
		fontSize: 15,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		width: 300
	}
})
