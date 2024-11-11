import { useCallback } from "react"
import { Modal, View, Text, StyleSheet } from "react-native"
import { ImageBackground } from "expo-image"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import FormButton from "../form-button/FormButton"
import { theme } from "../../utils/constants"

interface PaymentInformationModalProps {
	openModal: boolean
	setOpenModal: (value: boolean) => void
	selectedOption: number
}

export default function PaymentInformationModal({
	openModal,
	setOpenModal,
	selectedOption
}: PaymentInformationModalProps): React.ReactElement | null {
	const router = useRouter()

	const [fontsLoaded] = useFonts({
		"Montserrat-Medium": require("../../assets/fonts/Montserrat/Montserrat Medium 500.ttf"),
		"Montserrat-SemiBold": require("../../assets/fonts/Montserrat/Montserrat SemiBold 600.ttf"),
		"Roboto-Regular": require("../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	const handleProceed = useCallback((): void => {
		setOpenModal(false)
		router.navigate(
			selectedOption === 3
				? "/user/home"
				: "/user/add-job/payment-card-details"
		)
	}, [openModal, router])

	const handleChangeMethod = useCallback((): void => {
		setOpenModal(false)
	}, [openModal])

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
					style={styles.modalContainer}
					contentFit="fill"
				>
					{fontsLoaded && (
						<Text style={styles.titleText}>
							{selectedOption === 3 ? "Cash" : "Online"} Payment
							Information
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.descriptionText}>
							{selectedOption === 3
								? "You’ve selected to pay the vendor in cash upon job completion. Please ensure the correct amount is ready when the service provider arrives."
								: "The system supports pre-payments, where customers pay through the app. Funds are securely held and will only be released to the vendor after you confirm job completion using an OTP."}
						</Text>
					)}
					<View style={styles.actionButtonsWrapper}>
						<FormButton
							length="full"
							theme="dark"
							title={
								selectedOption === 3
									? "Confirm and Post Job"
									: "Proceed with Payment"
							}
							onPress={handleProceed}
						/>
						<FormButton
							length="full"
							theme="light"
							title="Change Payment Method"
							onPress={handleChangeMethod}
						/>
					</View>
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
		width: "90%",
		borderRadius: 35,
		backgroundColor: "white",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		padding: 25
	},
	titleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.primary,
		textAlign: "center",
		lineHeight: 30,
		paddingTop: 25
	},
	descriptionText: {
		fontSize: 15,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		textAlign: "center",
		lineHeight: 22.5,
		maxWidth: 300,
		textTransform: "capitalize"
	},
	actionButtonsWrapper: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 10,
		marginTop: 35
	}
})
