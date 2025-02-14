import { useCallback } from "react"
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { theme } from "../../utils/constants"

// Interface for the props of the component
interface ChatActionsModalProps {
	openModal: boolean
	setOpenModal: (value: boolean) => void
	setOpenDeleteChatModal: (value: boolean) => void
	mode: "web" | "app"
}

export default function ChatActionsModal({
	openModal,
	setOpenModal,
	setOpenDeleteChatModal,
	mode
}: ChatActionsModalProps): React.ReactElement | null {
	// Memoized callback for handling the deletion of the chat
	const handleDeleteChat = useCallback((): void => {
		setOpenModal(false) // Close the modal
		setOpenDeleteChatModal(true) // Open the delete chat modal
	}, [setOpenModal, setOpenDeleteChatModal])

	// Memoized callback for handling the report of the chat
	const handleReportChat = useCallback((): void => {
		setOpenModal(false) // Close the modal
	}, [setOpenModal])

	return (
		// Modal component for displaying chat actions
		<Modal
			animationType={mode === "app" ? "slide" : "fade"}
			transparent
			visible={openModal}
			onRequestClose={() => {
				setOpenModal(false)
			}}
		>
			{/* Wrapper view with platform-specific styling */}
			<View
				style={[
					styles.modalWrapper,
					mode === "app"
						? styles.modalWrapperApp
						: styles.modalWrapperWeb
				]}
			>
				{/* Container for modal content */}
				<View
					style={[
						styles.modalContainer,
						mode === "app"
							? styles.modalContainerApp
							: styles.modalContainerWeb
					]}
				>
					{/* Horizontal bar indicator - only shown in mobile app */}
					{mode === "app" && <View style={styles.horizontalBar} />}
					{/* Wrapper for action buttons */}
					<View style={styles.actionButtonsWrapper}>
						{/* Delete chat button */}
						<TouchableOpacity
							style={[
								styles.actionButtonContainer,
								styles.deleteButton
							]}
							onPress={handleDeleteChat}
						>
							<Image
								source={require("../../assets/icons/delete2.svg")}
								style={styles.actionButtonIcon}
								contentFit="contain"
							/>
							<Text
								style={[
									styles.actionButtonText,
									styles.deleteButtonText
								]}
							>
								Delete
							</Text>
						</TouchableOpacity>
						{/* Report chat button */}
						<TouchableOpacity
							style={[
								styles.actionButtonContainer,
								styles.reportChatButton
							]}
							onPress={handleReportChat}
						>
							<Image
								source={require("../../assets/icons/warning.svg")}
								style={styles.actionButtonIcon}
								contentFit="contain"
							/>
							<Text
								style={[
									styles.actionButtonText,
									styles.reportChatButtonText
								]}
							>
								Report Chat
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalWrapper: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.65)"
	},
	modalWrapperApp: {
		justifyContent: "flex-end"
	},
	modalWrapperWeb: {
		alignItems: "center",
		justifyContent: "center"
	},
	modalContainer: {
		backgroundColor: "white",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between"
	},
	modalContainerApp: {
		height: 200,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		paddingHorizontal: 15,
		paddingVertical: 25
	},
	modalContainerWeb: {
		width: 385,
		borderRadius: 25,
		paddingHorizontal: 25,
		paddingVertical: 35
	},
	horizontalBar: {
		height: 4.5,
		width: 45,
		borderRadius: 2.5,
		backgroundColor: theme.colors.secondary
	},
	actionButtonsWrapper: {
		width: "100%",
		flexDirection: "column",
		gap: 7.5
	},
	actionButtonContainer: {
		height: 50,
		width: "100%",
		borderRadius: 15,
		flexDirection: "row",
		alignItems: "center",
		gap: 15,
		paddingHorizontal: 20
	},
	actionButtonIcon: {
		height: 22.5,
		width: 22.5
	},
	actionButtonText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Regular"
	},
	deleteButtonText: {
		color: theme.colors.secondary
	},
	reportChatButtonText: {
		color: "white"
	},
	deleteButton: {
		backgroundColor: "#F5F5F5"
	},
	reportChatButton: {
		backgroundColor: theme.colors.primary
	}
})
