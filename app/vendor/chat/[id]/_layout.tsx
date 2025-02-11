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
	// State for storing message text
	const [message, setMessage] = useState<string>("")
	// State for managing chat action modal visibility
	const [openChatActionModal, setOpenChatActionModal] =
		useState<boolean>(false)
	// State for managing delete chat confirmation modal visibility
	const [
		openDeleteChatConfirmationModal,
		setOpenDeleteChatConfirmationModal
	] = useState<boolean>(false)

	// Memoized function to handle opening the chat action modal
	const handleOpenChatActionModal = useCallback((): void => {
		setOpenChatActionModal(true) // Open the modal
	}, [setOpenChatActionModal])

	// Memoized function to handle form submission
	const handleSubmit = useCallback((): void => {}, [])

	return (
		// KeyboardAvoidingView handles keyboard behavior on different platforms
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			{/* Modal for chat actions like delete, block, etc */}
			<ChatActionsModal
				openModal={openChatActionModal}
				setOpenModal={setOpenChatActionModal}
				setOpenDeleteChatModal={setOpenDeleteChatConfirmationModal}
				mode="app"
			/>
			{/* Confirmation modal for deleting chat */}
			<DeleteChatConfirmationModal
				openModal={openDeleteChatConfirmationModal}
				setOpenModal={setOpenDeleteChatConfirmationModal}
				mode="app"
			/>
			{/* Main content container */}
			<View style={styles.bodyContainer}>
				{/* Chat header with user info and options */}
				<View style={styles.headerContainer}>
					<View style={styles.horizontalWrapper}>
						{/* Back navigation button */}
						<BackButton
							size="small"
							color="#ffffff"
							backgroundColor="rgba(255, 255, 255, 0.15)"
							borderColor="#ffffff"
						/>
						{/* Profile image container with online status indicator */}
						<View style={styles.profileImageContainer}>
							<Image
								source={require("../../../../assets/images/vendor-profile.png")}
								style={styles.profileImage}
								contentFit="cover"
							/>
							{/* Online status indicator */}
							<View style={styles.onlineMarker} />
						</View>
						{/* User info container */}
						<View style={styles.verticalWrapper}>
							<Text style={styles.vendorNameText}>
								Michael Guzzi
							</Text>
							<Text style={styles.onlineText}>Online</Text>
						</View>
					</View>
					{/* Chat options button */}
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
				{/* Chat messages and input container */}
				<View style={styles.chatsCard}>
					{/* Scrollable messages area */}
					<ScrollView
						style={styles.chatsCardScrollView}
						showsVerticalScrollIndicator={false}
					>
						<Slot />
					</ScrollView>
					{/* Message input field */}
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
