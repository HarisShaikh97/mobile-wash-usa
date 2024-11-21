import { useCallback } from "react"
import { Modal, View, Text, StyleSheet } from "react-native"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import FormButton from "../form-button/FormButton"
import { theme } from "../../utils/constants"

interface AccountErrorModalProps {
	openModal: boolean
	setOpenModal: (value: boolean) => void
	type: "verification-pending" | "verification-rejected" | "payment-required"
}

export default function AccountErrorModal({
	openModal,
	setOpenModal,
	type
}: AccountErrorModalProps): React.ReactElement | null {
	const router = useRouter()

	const [fontsLoaded] = useFonts({
		"Montserrat-SemiBold": require("../../assets/fonts/Montserrat/Montserrat SemiBold 600.ttf"),
		"Roboto-Regular": require("../../assets/fonts/Roboto/Roboto 400.ttf")
	})

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
				<View style={styles.modalContainer}>
					{fontsLoaded && (
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
					)}
					{fontsLoaded && (
						<Text style={styles.descriptionText}>
							{type === "verification-pending"
								? "Your account is not yet verified. The admin is currently reviewing your documents. If you need assistance, please contact support."
								: type === "verification-rejected"
								? "Your submitted documents have been rejected. Please upload the required documents again to proceed with job applications."
								: "You are verified, but you need to add a payment method to proceed with job applications."}
						</Text>
					)}
					<View style={styles.actionButtonsWrapper}>
						<FormButton
							theme="light"
							title="Cancel"
							length="half"
							onPress={handleCancel}
						/>
						<FormButton
							theme="dark"
							title={
								type === "payment-required"
									? "Add Payment Method"
									: "Contact Support"
							}
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
		width: "95%",
		borderRadius: 30,
		backgroundColor: "white",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 15,
		paddingVertical: 25,
		paddingHorizontal: 15
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
