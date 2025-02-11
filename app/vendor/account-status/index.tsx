import { useCallback, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import HorizontalSeparator from "../../../components/horizontal-separator/HorizontalSeparator"
import AccountActionModal from "../../../components/account-action-modal/AccountActionModal"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// Initializing the router instance for navigation
	const router = useRouter()

	const [openModal, setOpenModal] = useState<boolean>(false) // State for managing modal visibility
	const [type, setType] = useState<"delete" | "deactivate">("delete") // State for managing modal type

	// Memoized function to handle deleting the account
	const handleDeleteAccount = useCallback((): void => {
		setType("delete") // Set modal type to delete
		setOpenModal(true) // Open the modal
	}, [setType, setOpenModal])

	// Memoized function to handle deactivating the account
	const handleDeactivateAccount = useCallback((): void => {
		setType("deactivate") // Set modal type to deactivate
		setOpenModal(true) // Open the modal
	}, [setType, setOpenModal])

	// Memoized function to handle canceling the action
	const handleCancel = useCallback((): void => {
		router.back() // Navigate back to the previous page
	}, [router])

	return (
		// Main container for the account status page
		<View style={styles.container}>
			{/* Modal component for account actions (delete/deactivate) */}
			<AccountActionModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				type={type}
				mode="app"
			/>
			{/* Page title */}
			<Text style={styles.titleText}>Manage Your Account Status</Text>
			{/* Description text explaining available options */}
			<Text style={styles.descriptionText}>
				You can choose to deactivate your account temporarily or delete
				it permanently. Please select an option below.
			</Text>
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
					{/* Deactivate account button */}
					<TouchableOpacity
						style={styles.accountActionButton}
						onPress={handleDeactivateAccount}
					>
						<Text style={styles.accountActionButtonText}>
							Deactivate Account
						</Text>
					</TouchableOpacity>
				</View>
				{/* Visual separator between sections */}
				<HorizontalSeparator color="#DBDBDB" />
				{/* Delete account section */}
				<View style={styles.accountActionSection}>
					<Text style={styles.cardTitleText}>Delete Account</Text>
					<Text style={styles.cardDescriptionText}>
						Permanently delete your account. All your data will be
						erased, and this action cannot be undone.
					</Text>
					{/* Delete account button */}
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
			{/* Cancel button to exit the page */}
			<TouchableOpacity
				style={styles.cancelButtonContainer}
				onPress={handleCancel}
			>
				<Text style={styles.cancelButtonText}>Cancel</Text>
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
