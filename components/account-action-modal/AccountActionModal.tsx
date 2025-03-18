import { useCallback } from "react"
import { Modal, View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import FormButton from "../form-button/FormButton"
import { theme } from "../../utils/constants"

// Interface for the props of the component
interface AccountActionModalProps {
	openModal: boolean
	setOpenModal: (value: boolean) => void
	type: "delete" | "deactivate"
	mode: "app" | "web"
}

export default function AccountActionModal({
	openModal,
	setOpenModal,
	type,
	mode
}: AccountActionModalProps): React.ReactElement | null {
	// Initialize the router instance for navigation
	const router = useRouter()

	// Memoized callback for handling the "Proceed" action
	const handleProceed = useCallback((): void => {
		setOpenModal(false) // Close the modal
		router.navigate("/") // Navigate to the welcome page
	}, [setOpenModal, router])

	// Memoized callback for handling the "Cancel" action
	const handleCancel = useCallback((): void => {
		setOpenModal(false) // Close the modal
	}, [setOpenModal])

	return (
		// Modal component for account actions with fade animation
		<Modal
			animationType="fade"
			transparent
			visible={openModal}
			onRequestClose={() => {
				setOpenModal(false)
			}}
		>
			{/* Wrapper view with semi-transparent background */}
			<View style={styles.modalWrapper}>
				{/* Container view with responsive styling based on mode (app/web) */}
				<View
					style={[
						styles.modalContainer,
						mode === "app"
							? styles.modalContainerApp
							: styles.modalContainerWeb
					]}
				>
					{/* Warning title text */}
					<Text style={styles.titleText}>
						This is a permanent action.
					</Text>
					{/* Description text that changes based on action type */}
					<Text style={styles.descriptionText}>
						{type === "deactivate"
							? "You can choose to deactivate your account temporarily or delete it permanently. Please select an option below."
							: "Permanently delete your account. All your data will be erased, and this action cannot be undone."}
					</Text>
					{/* Container for action buttons */}
					<View style={styles.actionButtonsWrapper}>
						{/* Cancel button */}
						<FormButton
							colorTheme="black"
							title="Cancel"
							isLoading={false}
							length="half"
							onPress={handleCancel}
						/>
						{/* Action button (Deactivate/Delete) */}
						<FormButton
							colorTheme="danger"
							title={
								type === "deactivate"
									? "Deactivate Account"
									: "Delete Account"
							}
							isLoading={false}
							length="half"
							onPress={handleProceed}
						/>
					</View>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalWrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0, 0, 0, 0.65)"
	},
	modalContainer: {
		borderRadius: 30,
		backgroundColor: "white",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 15
	},
	modalContainerApp: {
		width: "95%",
		padding: 25
	},
	modalContainerWeb: {
		width: 385,
		paddingHorizontal: 25,
		paddingVertical: 50
	},
	titleText: {
		maxWidth: 275,
		fontSize: 27.5,
		fontFamily: "Montserrat-Bold",
		textAlign: "center",
		textTransform: "capitalize",
		letterSpacing: 0,
		lineHeight: 30,
		color: "#DC3545",
		marginTop: 10
	},
	descriptionText: {
		maxWidth: 300,
		fontSize: 15,
		fontFamily: "Roboto-Regular",
		textAlign: "center",
		color: theme.colors.secondary
	},
	actionButtonsWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	}
})
