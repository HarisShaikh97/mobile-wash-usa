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

	const [searchValue, setSearchValue] = useState<string>("")
	const [selectedChat, setSelectedChat] = useState<Chat["_id"]>(chats[0]._id)
	const [message, setMessage] = useState<string>("")

	const handleSubmit = useCallback((): void => {}, [])

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<NotificationButton mode="web" />
			</View>
			<View style={styles.bodyContainer}>
				<View style={styles.allChatsCardContainer}>
					<ImageBackground
						source={require("../../../../assets/images/chat-header-bg.png")}
						style={styles.allChatsCardHeader}
						contentFit="fill"
					>
						<Text style={styles.allChatsTitleText}>All chats</Text>
					</ImageBackground>
					<ScrollView
						style={styles.allChatsScrollView}
						showsVerticalScrollIndicator={false}
					>
						<View style={styles.allChatsScrollContainer}>
							<SearchBar
								placeholder="Search"
								color="#F5F5F5"
								backgroundColor="#ffffff"
								value={searchValue}
								onChangeText={setSearchValue}
								filterEnabled={false}
								mode="app"
							/>
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
				<View style={styles.chatBoxContainer}>
					<View style={styles.chatBoxHeaderContainer}>
						<View style={styles.chatBoxProfileWrapper}>
							<View style={styles.chatBoxProfileImageWrapper}>
								<Image
									source={
										chats.find((chat): boolean => {
											return chat._id === selectedChat
										})?.image
									}
									style={styles.chatBoxProfileImage}
									contentFit="cover"
								/>
								{chats.find((chat): boolean => {
									return chat._id === selectedChat
								})?.online && (
									<View style={styles.onlineMarker} />
								)}
							</View>
							<View style={styles.chatBoxProfileDetailsWrapper}>
								<Text style={styles.chatBoxUserNameText}>
									{
										chats.find((chat): boolean => {
											return chat._id === selectedChat
										})?.fullName
									}
								</Text>
								<Text style={styles.chatBoxOnlineText}>
									{chats.find((chat): boolean => {
										return chat._id === selectedChat
									})?.online
										? "Online"
										: "Offline"}
								</Text>
							</View>
						</View>
						<TouchableOpacity
							style={styles.chatBoxOptionsButtonContainer}
						>
							<Entypo
								name="dots-three-vertical"
								size={15}
								color={theme.colors.secondary}
							/>
						</TouchableOpacity>
					</View>
					<ScrollView
						style={styles.chatsCardScrollView}
						showsVerticalScrollIndicator={false}
					>
						<View style={styles.chatCardsScrollContainer}>
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
							<View style={styles.chatSectionHeader}>
								<HorizontalSeparator color="#EDEDED" />
								<Text style={styles.chatSectionTitleText}>
									Yesterday
								</Text>
								<HorizontalSeparator color="#EDEDED" />
							</View>
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
							<View style={styles.chatSectionHeader}>
								<HorizontalSeparator color="#EDEDED" />
								<Text style={styles.chatSectionTitleText}>
									Today
								</Text>
								<HorizontalSeparator color="#EDEDED" />
							</View>
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
