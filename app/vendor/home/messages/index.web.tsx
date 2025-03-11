import { useState, useCallback } from "react"
import {
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { Image, ImageBackground } from "expo-image"
import Entypo from "@expo/vector-icons/Entypo"
import NotificationButton from "../../../../components/notification-button/NotificationButton"
import SearchBar from "../../../../components/search-bar/SearchBar"
import ChatCard from "../../../../components/chat-card/ChatCard"
import ChatInputField from "../../../../components/chat-input-field/ChatInputField"
import HorizontalSeparator from "../../../../components/horizontal-separator/HorizontalSeparator"
import MessageCard from "../../../../components/message-card/MessageCard"
import ChatActionsModal from "../../../../components/chat-actions-modal/ChatActionsModal"
import DeleteChatConfirmationModal from "../../../../components/delete-chat-confirmation-modal/DeleteChatConfirmationModal"
import { Chat, Message } from "../../../../utils/types"
import { theme } from "../../../../utils/constants"

export default function Tab(): React.ReactElement | null {
	const chats: Chat[] = []

	const messages: Message[] = [
		{
			_id: "1",
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod?",
			time: "10:45",
			user: "Self"
		},
		{
			_id: "2",
			text: "Lorem ipsum dolor sit amet..",
			time: "10:45",
			user: "Michael Guzzi"
		},
		{
			_id: "3",
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod?",
			time: "10:45",
			user: "Self"
		},
		{
			_id: "4",
			text: "Lorem ipsum dolor sit amet..",
			time: "10:45",
			user: "Michael Guzzi"
		},
		{
			_id: "5",
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod?",
			time: "10:45",
			user: "Self"
		}
	]

	const [searchValue, setSearchValue] = useState<string>("") // State for search input
	const [selectedChat, setSelectedChat] = useState<Chat["id"] | null>(null) // State for managing selected chat
	const [message, setMessage] = useState<string>("") // State for managing message text
	const [openChatActionModal, setOpenChatActionModal] =
		useState<boolean>(false) // State for managing chat action modal visibility
	const [
		openDeleteChatConfirmationModal,
		setOpenDeleteChatConfirmationModal
	] = useState<boolean>(false) // State for managing delete chat confirmation modal visibility

	// Memoized function to handle opening the chat action modal
	const handleOpenChatActionModal = useCallback((): void => {
		setOpenChatActionModal(true) // Open the modal
	}, [setOpenChatActionModal])

	// Memoized function to handle form submission
	const handleSubmit = useCallback((): void => {}, [])

	return (
		<View style={styles.container}>
			{/* Modal for chat actions like delete, block etc */}
			<ChatActionsModal
				openModal={openChatActionModal}
				setOpenModal={setOpenChatActionModal}
				setOpenDeleteChatModal={setOpenDeleteChatConfirmationModal}
				mode="web"
			/>
			{/* Confirmation modal for deleting chats */}
			<DeleteChatConfirmationModal
				openModal={openDeleteChatConfirmationModal}
				setOpenModal={setOpenDeleteChatConfirmationModal}
				mode="web"
			/>
			{/* Header section with notification button */}
			<View style={styles.headerContainer}>
				<NotificationButton mode="web" />
			</View>
			{/* Main content container */}
			<View style={styles.bodyContainer}>
				{/* Left sidebar showing all chats */}
				<View style={styles.allChatsCardContainer}>
					{/* Chat header with background image */}
					<ImageBackground
						source={require("../../../../assets/images/chat-header-bg.png")}
						style={styles.allChatsCardHeader}
						contentFit="fill"
					>
						<Text style={styles.allChatsTitleText}>All chats</Text>
					</ImageBackground>
					{/* Scrollable list of chats */}
					<ScrollView
						style={styles.allChatsScrollView}
						showsVerticalScrollIndicator={false}
					>
						<View style={styles.allChatsScrollContainer}>
							{/* Search bar for filtering chats */}
							<SearchBar
								placeholder="Search"
								color="#F5F5F5"
								backgroundColor="#ffffff"
								borderColor="#F5F5F5"
								value={searchValue}
								onChangeText={setSearchValue}
								filterEnabled={false}
								mode="app"
							/>
							{/* List of chat cards */}
							{chats.map(
								(chat, index): React.ReactElement | null => {
									return (
										<ChatCard
											id={chat.id}
											fullName={chat.full_name}
											image={chat.profile_pic}
											lastMessage={chat.lastMessage}
											lastMessageTime={
												chat.lastMessageTime
											}
											unreadMessages={chat.unreadMessages}
											online={chat.online}
											mode="web"
											selectedChat={selectedChat}
											setSelectedChat={setSelectedChat}
											key={index}
										/>
									)
								}
							)}
						</View>
					</ScrollView>
				</View>
				{/* Main chat window */}
				<View style={styles.chatBoxContainer}>
					{/* Chat header with user profile */}
					<View style={styles.chatBoxHeaderContainer}>
						<View style={styles.chatBoxProfileWrapper}>
							{/* User profile image with online status */}
							<View style={styles.chatBoxProfileImageWrapper}>
								<Image
									source={
										chats.find((chat): boolean => {
											return chat.id === selectedChat
										})?.profile_pic
									}
									style={styles.chatBoxProfileImage}
									contentFit="cover"
								/>
								{/* Online status indicator */}
								{chats.find((chat): boolean => {
									return chat.id === selectedChat
								})?.online && (
									<View style={styles.onlineMarker} />
								)}
							</View>
							{/* User details section */}
							<View style={styles.chatBoxProfileDetailsWrapper}>
								<Text style={styles.chatBoxUserNameText}>
									{
										chats.find((chat): boolean => {
											return chat.id === selectedChat
										})?.full_name
									}
								</Text>
								<Text style={styles.chatBoxOnlineText}>
									{chats.find((chat): boolean => {
										return chat.id === selectedChat
									})?.online
										? "Online"
										: "Offline"}
								</Text>
							</View>
						</View>
						{/* Chat options button */}
						<TouchableOpacity
							style={styles.chatBoxOptionsButtonContainer}
							onPress={handleOpenChatActionModal}
						>
							<Entypo
								name="dots-three-vertical"
								size={15}
								color={theme.colors.secondary}
							/>
						</TouchableOpacity>
					</View>
					{/* Chat messages scroll view */}
					<ScrollView
						style={styles.chatsCardScrollView}
						showsVerticalScrollIndicator={false}
					>
						<View style={styles.chatCardsScrollContainer}>
							{/* Job details card */}
							<View style={styles.jobCard}>
								<View style={styles.horizontalWrapper}>
									<Text
										style={styles.jobTitleText}
										numberOfLines={2}
										ellipsizeMode="tail"
									>
										Car Wash Service Needed
									</Text>
									<Text style={styles.amountText}>$500</Text>
								</View>
								<Text
									style={styles.jobDescriptionText}
									numberOfLines={2}
									ellipsizeMode="tail"
								>
									Full exterior and interior wash needed for
									SUV. Preferably before noon...
								</Text>
							</View>
							{/* Yesterday's messages section */}
							<View style={styles.chatSectionHeader}>
								<HorizontalSeparator color="#EDEDED" />
								<Text style={styles.chatSectionTitleText}>
									Yesterday
								</Text>
								<HorizontalSeparator color="#EDEDED" />
							</View>
							{/* Yesterday's message list */}
							{messages.map(
								(message, index): React.ReactElement | null => {
									return (
										<MessageCard
											_id={message._id}
											text={message.text}
											time={message.time}
											user={message.user}
											mode="web"
											key={index}
										/>
									)
								}
							)}
							{/* Today's messages section */}
							<View style={styles.chatSectionHeader}>
								<HorizontalSeparator color="#EDEDED" />
								<Text style={styles.chatSectionTitleText}>
									Today
								</Text>
								<HorizontalSeparator color="#EDEDED" />
							</View>
							{/* Today's message list */}
							{messages.map(
								(message, index): React.ReactElement | null => {
									return (
										<MessageCard
											_id={message._id}
											text={message.text}
											time={message.time}
											user={message.user}
											mode="web"
											key={index}
										/>
									)
								}
							)}
						</View>
					</ScrollView>
					{/* Chat input field */}
					<ChatInputField
						value={message}
						onChangeText={setMessage}
						onSubmit={handleSubmit}
					/>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		gap: 30
	},
	headerContainer: {
		alignSelf: "flex-end"
	},
	bodyContainer: {
		flex: 1,
		flexDirection: "row",
		gap: 15
	},
	allChatsCardContainer: {
		height: "100%",
		width: 415,
		borderRadius: 27.5,
		backgroundColor: "white",
		overflow: "hidden"
	},
	allChatsCardHeader: {
		height: 150,
		width: "100%",
		backgroundColor: theme.colors.primary,
		alignItems: "center",
		justifyContent: "center"
	},
	allChatsTitleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-SemiBold",
		color: "white",
		textTransform: "capitalize",
		letterSpacing: 0.5
	},
	allChatsScrollView: {
		flex: 1,
		paddingHorizontal: 35
	},
	allChatsScrollContainer: {
		flexDirection: "column",
		gap: 15,
		paddingVertical: 25
	},
	chatBoxContainer: {
		flex: 1,
		flexDirection: "column",
		height: "100%",
		borderRadius: 27.5,
		backgroundColor: "white",
		padding: 30
	},
	chatBoxHeaderContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	chatBoxProfileWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 15
	},
	chatBoxProfileImageWrapper: {
		position: "relative"
	},
	chatBoxProfileDetailsWrapper: {
		flexDirection: "column",
		gap: 2.5
	},
	chatBoxProfileImage: {
		height: 80,
		width: 80,
		borderRadius: 12.5,
		overflow: "hidden"
	},
	onlineMarker: {
		height: 15,
		width: 15,
		borderRadius: 7.5,
		borderWidth: 1,
		borderColor: "white",
		backgroundColor: "#8BC83F",
		position: "absolute",
		top: -3.5,
		right: -3.5
	},
	chatBoxUserNameText: {
		fontSize: 18.5,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary
	},
	chatBoxOnlineText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Light",
		color: theme.colors.secondary
	},
	chatBoxOptionsButtonContainer: {
		height: 35,
		width: 35,
		borderRadius: 5,
		backgroundColor: "#E5F1FD",
		alignItems: "center",
		justifyContent: "center"
	},
	chatsCardScrollView: {
		flex: 1
	},
	chatCardsScrollContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 17.5,
		paddingVertical: 25
	},
	jobCard: {
		width: 550,
		borderRadius: 17.5,
		borderWidth: 1,
		borderColor: "#F5F5F5",
		padding: 25,
		flexDirection: "column",
		gap: 12.5,
		alignSelf: "center"
	},
	horizontalWrapper: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between"
	},
	jobTitleText: {
		fontSize: 22.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		width: 215
	},
	amountText: {
		fontSize: 22.5,
		fontFamily: "Roboto-Medium",
		color: theme.colors.primary
	},
	jobDescriptionText: {
		fontSize: 16.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		width: 350
	},
	chatSectionHeader: {
		width: 650,
		flexDirection: "row",
		alignItems: "center",
		gap: 15,
		alignSelf: "center",
		paddingVertical: 25
	},
	chatSectionTitleText: {
		fontSize: 11.5,
		fontFamily: "Roboto-Regular",
		color: "#ADB5BD"
	}
})
