import { View, StyleSheet } from "react-native"
import ChatCard from "../../../../components/chat-card/ChatCard"
import { Chat } from "../../../../utils/types"

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

	return (
		// Main container for the chat messages page
		<View style={styles.bodyContainer}>
			{/* Mapping through the chats array to render each chat */}
			{chats.map((chat, index): React.ReactElement | null => {
				return (
					<ChatCard
						_id={chat._id}
						fullName={chat.fullName}
						image={chat.image}
						lastMessage={chat.lastMessage}
						lastMessageTime={chat.lastMessageTime}
						unreadMessages={chat.unreadMessages}
						online={chat.online}
						mode="app"
						key={index}
					/>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	bodyContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 15,
		paddingTop: 35,
		paddingBottom: 125
	}
})
