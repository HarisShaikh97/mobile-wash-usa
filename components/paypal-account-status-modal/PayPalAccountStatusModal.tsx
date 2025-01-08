import { useCallback } from "react"
import { Modal, View, Text, StyleSheet } from "react-native"
import { ImageBackground } from "expo-image"
import { useRouter } from "expo-router"
import FormButton from "../form-button/FormButton"
import { theme } from "../../utils/constants"

interface PayPalAccountStatusModalProps {
	openModal: boolean
	setOpenModal: (value: boolean) => void
	status: "success" | "invalid"
	mode: "web" | "app"
}

export default function PayPalAccountStatusModal({
	openModal,
	setOpenModal,
	status,
	mode
}: PayPalAccountStatusModalProps): React.ReactElement | null {
	const router = useRouter()

	const handleSubmit = useCallback((): void => {
		if (status === "success") {
			router.navigate("/vendor/home")
		}
		setOpenModal(false)
	}, [setOpenModal])

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
				<ImageBackground
					source={require("../../assets/images/modal-background.png")}
					style={[
						styles.modalContainer,
						mode === "app"
							? styles.modalContainerApp
							: styles.modalContainerWeb
					]}
					contentFit="fill"
				>
					<Text
						style={[
							styles.titleText,
							status === "success"
								? styles.successTitleText
								: styles.invalidTitleText
						]}
					>
						{status === "success"
							? "PayPal Account Linked!"
							: "Invalid Confirmation Code"}
					</Text>
					<Text style={styles.descriptionText}>
						{status === "success"
							? "Your PayPal account has been successfully linked. You can now receive payments directly to your PayPal account."
							: "The confirmation code you entered is incorrect. Please check your email and try again."}
					</Text>
					<FormButton
						length="half"
						theme="dark"
						title={status === "success" ? "Ok" : "Resend Code"}
						onPress={handleSubmit}
					/>
				</ImageBackground>
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
		borderRadius: 35,
		backgroundColor: "white",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 15
	},
	modalContainerApp: {
		width: "90%",
		padding: 25
	},
	modalContainerWeb: {
		width: 365,
		padding: 35
	},
	titleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-SemiBold",
		textAlign: "center",
		lineHeight: 30,
		paddingTop: 25
	},
	successTitleText: {
		color: theme.colors.primary
	},
	invalidTitleText: {
		color: "#DC3545"
	},
	descriptionText: {
		fontSize: 15,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		textAlign: "center",
		lineHeight: 22.5,
		maxWidth: 300,
		textTransform: "capitalize"
	}
})
