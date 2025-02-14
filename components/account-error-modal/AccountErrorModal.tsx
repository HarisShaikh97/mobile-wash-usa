import { useCallback } from "react"
import { Modal, View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import FormButton from "../form-button/FormButton"
import { theme } from "../../utils/constants"

// Interface for the props of the component
interface AccountErrorModalProps {
	openModal: boolean
	setOpenModal: (value: boolean) => void
	type: "verification-pending" | "verification-rejected" | "payment-required"
	mode: "app" | "web"
}

export default function AccountErrorModal({
	openModal,
	setOpenModal,
	type,
	mode
}: AccountErrorModalProps): React.ReactElement | null {
	// Initialize the router instance for navigation
	const router = useRouter()

	// Memoized callback for handling the "Proceed" action
	const handleProceed = useCallback((): void => {
		setOpenModal(false) // Close the modal
		// Navigate to the appropriate page based on the error type
		if (type === "payment-required") {
			router.navigate("/vendor/payment")
		} else {
			router.back()
		}
	}, [openModal, router])

	// Memoized callback for handling the "Cancel" action
	const handleCancel = useCallback((): void => {
		setOpenModal(false) // Close the modal
		router.back() // Navigate back
	}, [openModal, router])

	return (
		// Modal component for displaying account-related errors
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
					{/* Title text with conditional styling based on error type */}
					<Text
						style={[
							styles.titleText,
							type === "verification-pending"
								? styles.titleTextVerificationPending
								: type === "verification-rejected"
								? styles.titleTextVerificationRejected
								: styles.titleTextPaymentRequired
						]}
					>
						{/* Dynamic title based on error type */}
						{type === "verification-pending"
							? "Verification Pending"
							: type === "verification-rejected"
							? "Verification Required"
							: "Payment Method Required"}
					</Text>
					{/* Description text explaining the error situation */}
					<Text style={styles.descriptionText}>
						{type === "verification-pending"
							? "Your account is not yet verified. The admin is currently reviewing your documents. If you need assistance, please contact support."
							: type === "verification-rejected"
							? "Your submitted documents have been rejected. Please upload the required documents again to proceed with job applications."
							: "You are verified, but you need to add a payment method to proceed with job applications."}
					</Text>
					{/* Action buttons container */}
					<View style={styles.actionButtonsWrapper}>
						{/* Cancel button */}
						<FormButton
							colorTheme="light"
							title="Cancel"
							isLoading={false}
							length="half"
							onPress={handleCancel}
						/>
						{/* Action button with dynamic title based on error type */}
						<FormButton
							colorTheme="dark"
							title={
								type === "payment-required"
									? "Add Payment Method"
									: "Contact Support"
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
		justifyContent: "center"
	},
	modalContainerApp: {
		width: "95%",
		gap: 15,
		paddingVertical: 25,
		paddingHorizontal: 15
	},
	modalContainerWeb: {
		width: 450,
		gap: 25,
		paddingVertical: 50,
		paddingHorizontal: 35
	},
	titleText: {
		maxWidth: 275,
		fontSize: 27.5,
		fontFamily: "Montserrat-SemiBold",
		textAlign: "center",
		textTransform: "capitalize",
		letterSpacing: 0,
		lineHeight: 30,
		marginTop: 10
	},
	titleTextVerificationPending: {
		color: "#FBBA1D"
	},
	titleTextVerificationRejected: {
		color: "#DC3545"
	},
	titleTextPaymentRequired: {
		color: "#EF6C00"
	},
	descriptionText: {
		maxWidth: 350,
		fontSize: 15,
		fontFamily: "Roboto-Regular",
		textAlign: "center",
		textTransform: "capitalize",
		color: theme.colors.secondary
	},
	actionButtonsWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	}
})
