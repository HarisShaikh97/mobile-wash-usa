import { View, StyleSheet } from "react-native"
import ChatCard from "../../../../components/chat-card/ChatCard"
import { Chat } from "../../../../utils/types"

export default function Tab(): React.ReactElement | null {
	const chats: Chat[] = []

	return (
		// Main container for the chat messages page
		<View style={styles.bodyContainer}>
			{/* Mapping through the chats array to render each chat */}
			{chats.map((chat, index): React.ReactElement | null => {
				return (
					<ChatCard
						id={chat.id}
						fullName={chat.full_name}
						image={chat.profile_pic}
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
