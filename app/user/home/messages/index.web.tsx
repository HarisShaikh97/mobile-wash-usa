import { View, Text, StyleSheet } from "react-native"
import { ImageBackground } from "expo-image"
import NotificationButton from "../../../../components/notification-button/NotificationButton"
import ChatCard from "../../../../components/chat-card/ChatCard"
import { Chat } from "../../../../utils/types"
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
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column"
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
		width: 400,
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
	}
})
