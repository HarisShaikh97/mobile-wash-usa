import { useState, useCallback } from "react"
import {
	ScrollView,
	View,
	KeyboardAvoidingView,
	Text,
	TouchableOpacity,
	Platform,
	StyleSheet
} from "react-native"
import { Image } from "expo-image"
import { Slot } from "expo-router"
import Entypo from "@expo/vector-icons/Entypo"
import BackButton from "../../../../components/back-button/BackButton"
import ChatInputField from "../../../../components/chat-input-field/ChatInputField"
import ChatActionsModal from "../../../../components/chat-actions-modal/ChatActionsModal"
import DeleteChatConfirmationModal from "../../../../components/delete-chat-confirmation-modal/DeleteChatConfirmationModal"
import { theme } from "../../../../utils/constants"

export default function Layout(): React.ReactElement | null {
	const [message, setMessage] = useState<string>("")
	const [openChatActionModal, setOpenChatActionModal] =
		useState<boolean>(false)
	const [
		openDeleteChatConfirmationModal,
		setOpenDeleteChatConfirmationModal
	] = useState<boolean>(false)

	const handleOpenChatActionModal = useCallback((): void => {
		setOpenChatActionModal(true)
	}, [setOpenChatActionModal])

	const handleSubmit = useCallback((): void => {}, [])

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ChatActionsModal
				openModal={openChatActionModal}
				setOpenModal={setOpenChatActionModal}
				setOpenDeleteChatModal={setOpenDeleteChatConfirmationModal}
				mode="app"
			/>
			<DeleteChatConfirmationModal
				openModal={openDeleteChatConfirmationModal}
				setOpenModal={setOpenDeleteChatConfirmationModal}
				mode="app"
			/>
			<View style={styles.bodyContainer}>
				<View style={styles.headerContainer}>
					<View style={styles.horizontalWrapper}>
						<BackButton
							size="small"
							color="#ffffff"
							backgroundColor="rgba(255, 255, 255, 0.15)"
							borderColor="#ffffff"
						/>
						<View style={styles.profileImageContainer}>
							<Image
								source={require("../../../../assets/images/vendor-profile.png")}
								style={styles.profileImage}
								contentFit="cover"
							/>
							<View style={styles.onlineMarker} />
						</View>
						<View style={styles.verticalWrapper}>
							<Text style={styles.vendorNameText}>
								Michael Guzzi
							</Text>
							<Text style={styles.onlineText}>Online</Text>
						</View>
					</View>
					<TouchableOpacity
						style={styles.optionsButton}
						onPress={handleOpenChatActionModal}
					>
						<Entypo
							name="dots-three-vertical"
							size={15}
							color="white"
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.chatsCard}>
					<ScrollView
						style={styles.chatsCardScrollView}
						showsVerticalScrollIndicator={false}
					>
						<Slot />
					</ScrollView>
					<ChatInputField
						value={message}
						onChangeText={setMessage}
						onSubmit={handleSubmit}
					/>
				</View>
			</View>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.primary,
		position: "relative"
	},
	bodyContainer: {
		flex: 1,
		zIndex: 10,
		flexDirection: "column"
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 25,
		marginTop: 15
	},
	profileImageContainer: {
		height: 55,
		width: 55,
		borderRadius: 12.5,
		borderWidth: 1.5,
		borderColor: "white",
		position: "relative"
	},
	profileImage: {
		height: "100%",
		width: "100%",
		overflow: "hidden",
		borderRadius: 12.5
	},
	onlineMarker: {
		height: 10,
		width: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "white",
		backgroundColor: "#8BC83F",
		position: "absolute",
		top: -2.5,
		right: -2.5
	},
	horizontalWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 15
	},
	verticalWrapper: {
		flexDirection: "column"
	},
	vendorNameText: {
		fontSize: 15,
		fontFamily: "Montserrat-SemiBold",
		color: "white"
	},
	onlineText: {
		fontSize: 11.5,
		fontFamily: "Roboto-Regular",
		color: "white"
	},
	optionsButton: {
		height: 35,
		width: 35,
		backgroundColor: "rgba(255, 255, 255, 0.15)",
		borderRadius: 7.5,
		alignItems: "center",
		justifyContent: "center"
	},
	chatsCard: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "white",
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		paddingHorizontal: 25,
		paddingBottom: 20
	},
	chatsCardScrollView: {
		flex: 1
	}
})
