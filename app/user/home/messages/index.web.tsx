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
	const chats: Chat[] = [
		{
			_id: "1",
			fullName: "Michael Guzzi",
			image: require("../../../../assets/images/vendor-profile.png"),
			lastMessage: "tempor incididunt ut labore et dolore",
			lastMessageTime: "10:45",
			unreadMessages: 1,
			online: true
		},
		{
			_id: "2",
			fullName: "Emmet Perry",
			image: require("../../../../assets/images/vendor-profile2.png"),
			lastMessage: "Excepteur sint occaecat cupidatat non",
			lastMessageTime: "12:50",
			unreadMessages: 0,
			online: true
		},
		{
			_id: "3",
			fullName: "Oliver A",
			image: require("../../../../assets/images/vendor-profile3.png"),
			lastMessage: "tempor incididunt ut labore et dolore",
			lastMessageTime: "11:35",
			unreadMessages: 2,
			online: false
		},
		{
			_id: "4",
			fullName: "Michael Guzzi",
			image: require("../../../../assets/images/vendor-profile.png"),
			lastMessage: "tempor incididunt ut labore et dolore",
			lastMessageTime: "10:45",
			unreadMessages: 1,
			online: true
		},
		{
			_id: "5",
			fullName: "Emmet Perry",
			image: require("../../../../assets/images/vendor-profile2.png"),
			lastMessage: "Excepteur sint occaecat cupidatat non",
			lastMessageTime: "12:50",
			unreadMessages: 0,
			online: true
		},
		{
			_id: "6",
			fullName: "Oliver A",
			image: require("../../../../assets/images/vendor-profile3.png"),
			lastMessage: "tempor incididunt ut labore et dolore",
			lastMessageTime: "11:35",
			unreadMessages: 2,
			online: false
		},
		{
			_id: "7",
			fullName: "Michael Guzzi",
			image: require("../../../../assets/images/vendor-profile.png"),
			lastMessage: "tempor incididunt ut labore et dolore",
			lastMessageTime: "10:45",
			unreadMessages: 1,
			online: true
		},
		{
			_id: "8",
			fullName: "Emmet Perry",
			image: require("../../../../assets/images/vendor-profile2.png"),
			lastMessage: "Excepteur sint occaecat cupidatat non",
			lastMessageTime: "12:50",
			unreadMessages: 0,
			online: true
		},
		{
			_id: "9",
			fullName: "Oliver A",
			image: require("../../../../assets/images/vendor-profile3.png"),
			lastMessage: "tempor incididunt ut labore et dolore",
			lastMessageTime: "11:35",
			unreadMessages: 2,
			online: false
		},
		{
			_id: "10",
			fullName: "Michael Guzzi",
			image: require("../../../../assets/images/vendor-profile.png"),
			lastMessage: "tempor incididunt ut labore et dolore",
			lastMessageTime: "10:45",
			unreadMessages: 1,
			online: true
		}
	]

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

	// State to manage the search value
	const [searchValue, setSearchValue] = useState<string>("")
	// State to manage the selected chat's ID
	const [selectedChat, setSelectedChat] = useState<Chat["_id"]>(chats[0]._id)
	// State to manage the message text
	const [message, setMessage] = useState<string>("")
	// State to manage the visibility of the chat action modal
	const [openChatActionModal, setOpenChatActionModal] =
		useState<boolean>(false)
	// State to manage the visibility of the delete chat confirmation modal
	const [
		openDeleteChatConfirmationModal,
		setOpenDeleteChatConfirmationModal
	] = useState<boolean>(false)

	// Memoized function to handle opening the chat action modal
	const handleOpenChatActionModal = useCallback((): void => {
		setOpenChatActionModal(true) // Setting the state to true
	}, [setOpenChatActionModal])

	// Memoized function to handle form submission
	const handleSubmit = useCallback((): void => {}, [])

	return (
		<View style={styles.container}>
			{/* Chat Actions Modal component */}
			<ChatActionsModal
				openModal={openChatActionModal}
				setOpenModal={setOpenChatActionModal}
				setOpenDeleteChatModal={setOpenDeleteChatConfirmationModal}
				mode="web"
			/>
			{/* Delete Chat Confirmation Modal component */}
			<DeleteChatConfirmationModal
				openModal={openDeleteChatConfirmationModal}
				setOpenModal={setOpenDeleteChatConfirmationModal}
				mode="web"
			/>
			{/* Header Container for Notification Button */}
			<View style={styles.headerContainer}>
				<NotificationButton mode="web" />
			</View>
			{/* Body Container for all chats and chat box */}
			<View style={styles.bodyContainer}>
				{/* Container for all chats */}
				<View style={styles.allChatsCardContainer}>
					{/* Image Background for all chats header */}
					<ImageBackground
						source={require("../../../../assets/images/chat-header-bg.png")}
						style={styles.allChatsCardHeader}
						contentFit="fill"
					>
						<Text style={styles.allChatsTitleText}>All chats</Text>
					</ImageBackground>
					{/* Scroll View for all chats */}
					<ScrollView
						style={styles.allChatsScrollView}
						showsVerticalScrollIndicator={false}
					>
						{/* Container for all chats scroll view */}
						<View style={styles.allChatsScrollContainer}>
							{/* Search Bar for chats */}
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
							{/* Mapping through chats array to render each chat */}
							{chats.map(
								(chat, index): React.ReactElement | null => {
									return (
										<ChatCard
											_id={chat._id}
											fullName={chat.fullName}
											image={chat.image}
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
				{/* Container for chat box */}
				<View style={styles.chatBoxContainer}>
					{/* Header Container for chat box */}
					<View style={styles.chatBoxHeaderContainer}>
						{/* Profile Wrapper for chat box */}
						<View style={styles.chatBoxProfileWrapper}>
							{/* Profile Image Wrapper for chat box */}
							<View style={styles.chatBoxProfileImageWrapper}>
								{/* Profile Image for chat box */}
								<Image
									source={
										chats.find((chat): boolean => {
											return chat._id === selectedChat
										})?.image
									}
									style={styles.chatBoxProfileImage}
									contentFit="cover"
								/>
								{/* Online Marker for chat box */}
								{chats.find((chat): boolean => {
									return chat._id === selectedChat
								})?.online && (
									<View style={styles.onlineMarker} />
								)}
							</View>
							{/* Profile Details Wrapper for chat box */}
							<View style={styles.chatBoxProfileDetailsWrapper}>
								{/* User Name Text for chat box */}
								<Text style={styles.chatBoxUserNameText}>
									{
										chats.find((chat): boolean => {
											return chat._id === selectedChat
										})?.fullName
									}
								</Text>
								{/* Online Text for chat box */}
								<Text style={styles.chatBoxOnlineText}>
									{chats.find((chat): boolean => {
										return chat._id === selectedChat
									})?.online
										? "Online"
										: "Offline"}
								</Text>
							</View>
						</View>
						{/* Options Button Container for chat box */}
						<TouchableOpacity
							style={styles.chatBoxOptionsButtonContainer}
							onPress={handleOpenChatActionModal}
						>
							{/* Icon for chat box options */}
							<Entypo
								name="dots-three-vertical"
								size={15}
								color={theme.colors.secondary}
							/>
						</TouchableOpacity>
					</View>
					{/* Scroll View for chat cards */}
					<ScrollView
						style={styles.chatsCardScrollView}
						showsVerticalScrollIndicator={false}
					>
						{/* Container for chat cards scroll view */}
						<View style={styles.chatCardsScrollContainer}>
							{/* Job Card for demonstration */}
							<View style={styles.jobCard}>
								{/* Horizontal Wrapper for job card */}
								<View style={styles.horizontalWrapper}>
									{/* Job Title Text */}
									<Text
										style={styles.jobTitleText}
										numberOfLines={2}
										ellipsizeMode="tail"
									>
										Car Wash Service Needed
									</Text>
									{/* Amount Text */}
									<Text style={styles.amountText}>$500</Text>
								</View>
								{/* Job Description Text */}
								<Text
									style={styles.jobDescriptionText}
									numberOfLines={2}
									ellipsizeMode="tail"
								>
									Full exterior and interior wash needed for
									SUV. Preferably before noon...
								</Text>
							</View>
							{/* Chat Section Header */}
							<View style={styles.chatSectionHeader}>
								{/* Horizontal Separator */}
								<HorizontalSeparator color="#EDEDED" />
								{/* Chat Section Title Text */}
								<Text style={styles.chatSectionTitleText}>
									Yesterday
								</Text>
								{/* Horizontal Separator */}
								<HorizontalSeparator color="#EDEDED" />
							</View>
							{/* Mapping through messages array to render each message */}
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
							{/* Chat Section Header */}
							<View style={styles.chatSectionHeader}>
								{/* Horizontal Separator */}
								<HorizontalSeparator color="#EDEDED" />
								{/* Chat Section Title Text */}
								<Text style={styles.chatSectionTitleText}>
									Today
								</Text>
								{/* Horizontal Separator */}
								<HorizontalSeparator color="#EDEDED" />
							</View>
							{/* Mapping through messages array to render each message */}
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
					{/* Chat Input Field for sending messages */}
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
