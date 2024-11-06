import { useCallback } from "react"
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Image, ImageBackground } from "expo-image"
import { useFonts } from "expo-font"
import { theme } from "../../utils/constants"

interface NotificationActionsModalProps {
	openModal: boolean
	setOpenModal: (value: boolean) => void
}

export default function NotificationActionsModal({
	openModal,
	setOpenModal
}: NotificationActionsModalProps): React.ReactElement | null {
	const [fontsLoaded] = useFonts({
		"Roboto-Regular": require("../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	const handleDeleteNotification = useCallback((): void => {
		setOpenModal(false)
	}, [openModal])

	const handleTurnOffNotifications = useCallback((): void => {
		setOpenModal(false)
	}, [openModal])

	return (
		<Modal
			animationType="slide"
			transparent
			visible={openModal}
			onRequestClose={() => {
				setOpenModal(false)
			}}
		>
			<View style={styles.modalWrapper}>
				<View style={styles.modalContainer}>
					<View style={styles.horizontalBar} />
					<View style={styles.actionButtonsWrapper}>
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
							{fontsLoaded && (
								<Text
									style={[
										styles.actionButtonText,
										styles.deleteButtonText
									]}
								>
									Delete
								</Text>
							)}
						</TouchableOpacity>
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
							{fontsLoaded && (
								<Text
									style={[
										styles.actionButtonText,
										styles.notificationsOffButtonText
									]}
								>
									Turn off notifications
								</Text>
							)}
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
		justifyContent: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.65)"
	},
	modalContainer: {
		height: 200,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		backgroundColor: "white",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 15,
		paddingVertical: 25
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
