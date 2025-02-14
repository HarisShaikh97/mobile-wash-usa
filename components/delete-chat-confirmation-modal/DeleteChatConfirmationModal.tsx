import { useCallback } from "react"
import { Modal, View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import FormButton from "../form-button/FormButton"
import { theme } from "../../utils/constants"

// Interface for the props of the component
interface DeleteChatConfirmationModalProps {
	openModal: boolean
	setOpenModal: (value: boolean) => void
	mode: "web" | "app"
}

export default function DeleteChatConfirmationModal({
	openModal,
	setOpenModal,
	mode
}: DeleteChatConfirmationModalProps): React.ReactElement | null {
	// Initialize the router instance for navigation
	const router = useRouter()

	// Memoized callback for handling the "Proceed" action
	const handleProceed = useCallback((): void => {
		setOpenModal(false) // Close the modal
		router.back() // Navigate back to the previous screen
	}, [setOpenModal, router])

	// Memoized callback for handling the "Cancel" action
	const handleCancel = useCallback((): void => {
		setOpenModal(false) // Close the modal
	}, [setOpenModal])

	return (
		// Modal component for delete chat confirmation
		<Modal
			animationType="fade"
			transparent
			visible={openModal}
			onRequestClose={() => {
				setOpenModal(false)
			}}
		>
			{/* Wrapper view for modal with semi-transparent background */}
			<View style={styles.modalWrapper}>
				{/* Container for modal content with responsive styling */}
				<View
					style={[
						styles.modalContainer,
						mode === "app"
							? styles.modalContainerApp
							: styles.modalContainerWeb
					]}
				>
					{/* Modal title */}
					<Text style={styles.titleText}>Delete Chat</Text>
					{/* Warning message */}
					<Text style={styles.descriptionText}>
						Are you sure you want to delete this chat? This action
						cannot be undone.
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
						{/* Delete confirmation button */}
						<FormButton
							colorTheme="danger"
							title="Delete Chat"
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
		width: 375,
		padding: 35
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
