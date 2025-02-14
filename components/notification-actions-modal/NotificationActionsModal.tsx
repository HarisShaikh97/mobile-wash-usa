import { useCallback } from "react"
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { theme } from "../../utils/constants"

// Interface for the props of the component
interface NotificationActionsModalProps {
	openModal: boolean
	setOpenModal: (value: boolean) => void
	mode: "app" | "web"
}

export default function NotificationActionsModal({
	openModal,
	setOpenModal,
	mode
}: NotificationActionsModalProps): React.ReactElement | null {
	// Memoized callback for handling the "Delete" action
	const handleDeleteNotification = useCallback((): void => {
		setOpenModal(false) // Close the modal
	}, [setOpenModal])

	// Memoized callback for handling the "Turn off notifications" action
	const handleTurnOffNotifications = useCallback((): void => {
		setOpenModal(false) // Close the modal
	}, [setOpenModal])

	return (
		// Modal component with conditional animation based on mode
		<Modal
			animationType={mode === "app" ? "slide" : "fade"}
			transparent
			visible={openModal}
			onRequestClose={() => {
				setOpenModal(false)
			}}
		>
			{/* Main modal wrapper with conditional styling for app/web */}
			<View
				style={[
					styles.modalWrapper,
					mode === "app"
						? styles.modalWrapperApp
						: styles.modalWrapperWeb
				]}
			>
				{/* Modal content container with mode-specific styling */}
				<View
					style={[
						styles.modalContainer,
						mode === "app"
							? styles.modalContainerApp
							: styles.modalContainerWeb
					]}
				>
					{/* Horizontal bar indicator shown only in app mode */}
					{mode === "app" && <View style={styles.horizontalBar} />}
					{/* Container for action buttons */}
					<View style={styles.actionButtonsWrapper}>
						{/* Delete notification button */}
						<TouchableOpacity
							style={[
								styles.actionButtonContainer,
								styles.deleteButton
							]}
							onPress={handleDeleteNotification}
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
						{/* Turn off notifications button */}
						<TouchableOpacity
							style={[
								styles.actionButtonContainer,
								styles.turnOffNotificationsButton
							]}
							onPress={handleTurnOffNotifications}
						>
							<Image
								source={require("../../assets/icons/notification-off.svg")}
								style={styles.actionButtonIcon}
								contentFit="contain"
							/>
							<Text
								style={[
									styles.actionButtonText,
									styles.notificationsOffButtonText
								]}
							>
								Turn off notifications
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
		justifyContent: "center",
		alignItems: "center"
	},
	modalContainer: {
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		backgroundColor: "white",
		flexDirection: "column",
		alignItems: "center"
	},
	modalContainerApp: {
		height: 200,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		justifyContent: "space-between",
		paddingHorizontal: 15,
		paddingVertical: 25
	},
	modalContainerWeb: {
		width: 450,
		borderRadius: 25,
		justifyContent: "center",
		paddingHorizontal: 25,
		paddingVertical: 50
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
	notificationsOffButtonText: {
		color: "white"
	},
	deleteButton: {
		backgroundColor: "#F5F5F5"
	},
	turnOffNotificationsButton: {
		backgroundColor: theme.colors.primary
	}
})
