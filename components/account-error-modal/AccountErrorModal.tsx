import { useCallback } from "react"
import { Modal, View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import FormButton from "../form-button/FormButton"
import { theme } from "../../utils/constants"

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
	const router = useRouter()

	const handleProceed = useCallback((): void => {
		setOpenModal(false)
		if (type === "payment-required") {
			router.navigate("/vendor/payment")
		} else {
			router.back()
		}
	}, [openModal, router])

	const handleCancel = useCallback((): void => {
		setOpenModal(false)
		router.back()
	}, [openModal, router])

	return (
		<Modal
			animationType="fade"
			transparent
			visible={openModal}
			onRequestClose={() => {
				setOpenModal(false)
			}}
		>
			<View style={styles.modalWrapper}>
				<View
					style={[
						styles.modalContainer,
						mode === "app"
							? styles.modalContainerApp
							: styles.modalContainerWeb
					]}
				>
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
						{type === "verification-pending"
							? "Verification Pending"
							: type === "verification-rejected"
							? "Verification Required"
							: "Payment Method Required"}
					</Text>
					<Text style={styles.descriptionText}>
						{type === "verification-pending"
							? "Your account is not yet verified. The admin is currently reviewing your documents. If you need assistance, please contact support."
							: type === "verification-rejected"
							? "Your submitted documents have been rejected. Please upload the required documents again to proceed with job applications."
							: "You are verified, but you need to add a payment method to proceed with job applications."}
					</Text>
					<View style={styles.actionButtonsWrapper}>
						<FormButton
							colorTheme="light"
							title="Cancel"
							isLoading={false}
							length="half"
							onPress={handleCancel}
						/>
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
