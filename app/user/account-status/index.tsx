import { useCallback, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import HorizontalSeparator from "../../../components/horizontal-separator/HorizontalSeparator"
import AccountActionModal from "../../../components/account-action-modal/AccountActionModal"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter() // Initializing the router instance for navigation

	// State variables for managing modal visibility and action type
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [type, setType] = useState<"delete" | "deactivate">("delete")

	// Memoized function to handle account deletion
	const handleDeleteAccount = useCallback((): void => {
		setType("delete") // Setting action type to 'delete'
		setOpenModal(true) // Opening the modal
	}, [setType, setOpenModal])

	// Memoized function to handle account deactivation
	const handleDeactivateAccount = useCallback((): void => {
		setType("deactivate") // Setting action type to 'deactivate'
		setOpenModal(true) // Opening the modal
	}, [setType, setOpenModal])

	// Memoized function to handle cancel action
	const handleCancel = useCallback((): void => {
		router.back() // Navigating back
	}, [router])

	return (
		// Main container for the account status page
		<View style={styles.container}>
			{/* Modal for account action */}
			<AccountActionModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				type={type}
				mode="app"
			/>
			{/* Title text for the account status page */}
			<Text style={styles.titleText}>Manage Your Account Status</Text>
			{/* Description text for the account status page */}
			<Text style={styles.descriptionText}>
				You can choose to deactivate your account temporarily or delete
				it permanently. Please select an option below.
			</Text>
			{/* Container for the account actions */}
			<View style={styles.accountActionsCard}>
				{/* Section for deactivating the account */}
				<View style={styles.accountActionSection}>
					{/* Title text for deactivating the account */}
					<Text style={styles.cardTitleText}>Deactivate Account</Text>
					{/* Description text for deactivating the account */}
					<Text style={styles.cardDescriptionText}>
						Temporarily deactivate your account. You won’t be able
						to access it, but all your data will remain saved. You
						can reactivate at any time by logging in again.
					</Text>
					{/* Button to deactivate the account */}
					<TouchableOpacity
						style={styles.accountActionButton}
						onPress={handleDeactivateAccount}
					>
						<Text style={styles.accountActionButtonText}>
							Deactivate Account
						</Text>
					</TouchableOpacity>
				</View>
				{/* Separator between deactivation and deletion */}
				<HorizontalSeparator color="#DBDBDB" />
				{/* Section for deleting the account */}
				<View style={styles.accountActionSection}>
					{/* Title text for deleting the account */}
					<Text style={styles.cardTitleText}>Delete Account</Text>
					{/* Description text for deleting the account */}
					<Text style={styles.cardDescriptionText}>
						Permanently delete your account. All your data will be
						erased, and this action cannot be undone.
					</Text>
					{/* Button to delete the account */}
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
			{/* Button to cancel the account action */}
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
