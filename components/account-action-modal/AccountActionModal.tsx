import { useCallback } from "react"
import { Modal, View, Text, StyleSheet } from "react-native"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import FormButton from "../form-button/FormButton"
import { theme } from "../../utils/constants"

interface AccountActionModalProps {
	openModal: boolean
	setOpenModal: (value: boolean) => void
	type: "delete" | "deactivate"
}

export default function AccountActionModal({
	openModal,
	setOpenModal,
	type
}: AccountActionModalProps): React.ReactElement | null {
	const router = useRouter()

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Montserrat-SemiBold": require("../../assets/fonts/Montserrat/Montserrat SemiBold 600.ttf"),
		"Roboto-Regular": require("../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	const handleProceed = useCallback((): void => {
		setOpenModal(false)
		router.navigate("/")
	}, [openModal, router])

	const handleCancel = useCallback((): void => {
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
				<View style={styles.modalContainer}>
					{fontsLoaded && (
						<Text style={styles.titleText}>
							This is a permanent action.
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.descriptionText}>
							{type === "deactivate"
								? "You can choose to deactivate your account temporarily or delete it permanently. Please select an option below."
								: "Permanently delete your account. All your data will be erased, and this action cannot be undone."}
						</Text>
					)}
					<View style={styles.actionButtonsWrapper}>
						<FormButton
							theme="black"
							title="Cancel"
							length="half"
							onPress={handleCancel}
						/>
						<FormButton
							theme="danger"
							title={
								type === "deactivate"
									? "Deactivate Account"
									: "Delete Account"
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
		padding: 25
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
