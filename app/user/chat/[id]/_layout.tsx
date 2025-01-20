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
	const [message, setMessage] = useState<string>("") // State for managing the chat message
	const [openChatActionModal, setOpenChatActionModal] =
		useState<boolean>(false) // State for managing the visibility of the chat actions modal
	const [
		openDeleteChatConfirmationModal,
		setOpenDeleteChatConfirmationModal
	] = useState<boolean>(false) // State for managing the visibility of the delete chat confirmation modal

	// Memoized function to chat actions modal
	const handleOpenChatActionModal = useCallback((): void => {
		setOpenChatActionModal(true) // Function to open the chat actions modal
	}, [setOpenChatActionModal])

	// Memoized function to handle form submission
	const handleSubmit = useCallback((): void => {}, [])

	return (
		// KeyboardAvoidingView is used to handle keyboard appearance and disappearance
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			{/* ChatActionsModal is used to manage chat actions */}
			<ChatActionsModal
				openModal={openChatActionModal}
				setOpenModal={setOpenChatActionModal}
				setOpenDeleteChatModal={setOpenDeleteChatConfirmationModal}
				mode="app"
			/>
			{/* DeleteChatConfirmationModal is used to confirm deletion of chat */}
			<DeleteChatConfirmationModal
				openModal={openDeleteChatConfirmationModal}
				setOpenModal={setOpenDeleteChatConfirmationModal}
				mode="app"
			/>
			{/* Container for the body content */}
			<View style={styles.bodyContainer}>
				{/* Container for the header content */}
				<View style={styles.headerContainer}>
					{/* Horizontal wrapper for the header content */}
					<View style={styles.horizontalWrapper}>
						<BackButton
							size="small"
							color="#ffffff"
							backgroundColor="rgba(255, 255, 255, 0.15)"
							borderColor="#ffffff"
						/>
						{/* Container for the profile image */}
						<View style={styles.profileImageContainer}>
							<Image
								source={require("../../../../assets/images/vendor-profile.png")}
								style={styles.profileImage}
								contentFit="cover"
							/>
							{/* View for the online marker */}
							<View style={styles.onlineMarker} />
						</View>
						{/* Vertical wrapper for the vendor information */}
						<View style={styles.verticalWrapper}>
							<Text style={styles.vendorNameText}>
								Michael Guzzi
							</Text>
							<Text style={styles.onlineText}>Online</Text>
						</View>
					</View>
					{/* Button to open chat actions modal */}
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
				{/* Container for the chats card */}
				<View style={styles.chatsCard}>
					{/* Scroll view for the chats */}
					<ScrollView
						style={styles.chatsCardScrollView}
						showsVerticalScrollIndicator={false}
					>
						{/* Placeholder for dynamic content */}
						<Slot />
					</ScrollView>
					{/* Input field for chat message */}
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
