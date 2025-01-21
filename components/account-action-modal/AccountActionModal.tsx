import { useCallback } from "react"
import { Modal, View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import FormButton from "../form-button/FormButton"
import { theme } from "../../utils/constants"

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
	const router = useRouter()

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
				<View
					style={[
						styles.modalContainer,
						mode === "app"
							? styles.modalContainerApp
							: styles.modalContainerWeb
					]}
				>
					<Text style={styles.titleText}>
						This is a permanent action.
					</Text>
					<Text style={styles.descriptionText}>
						{type === "deactivate"
							? "You can choose to deactivate your account temporarily or delete it permanently. Please select an option below."
							: "Permanently delete your account. All your data will be erased, and this action cannot be undone."}
					</Text>
					<View style={styles.actionButtonsWrapper}>
						<FormButton
							colorTheme="black"
							title="Cancel"
							isLoading={false}
							length="half"
							onPress={handleCancel}
						/>
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
