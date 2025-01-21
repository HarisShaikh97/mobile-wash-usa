import { useCallback } from "react"
import { Modal, View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import FormButton from "../form-button/FormButton"
import { theme } from "../../utils/constants"

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
	const router = useRouter()

	const handleProceed = useCallback((): void => {
		setOpenModal(false)
		router.back()
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
					<Text style={styles.titleText}>Delete Chat</Text>
					<Text style={styles.descriptionText}>
						Are you sure you want to delete this chat? This action
						cannot be undone.
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
