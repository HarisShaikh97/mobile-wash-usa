import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter, usePathname } from "expo-router"
import { theme } from "../../utils/constants"
import { Chat } from "../../utils/types"

interface ChatCardProps {
	_id: Chat["_id"]
	fullName: Chat["fullName"]
	image: Chat["image"]
	lastMessage: Chat["lastMessage"]
	lastMessageTime: Chat["lastMessageTime"]
	unreadMessages: Chat["unreadMessages"]
	online: Chat["online"]
}

export default function ChatCard({
	_id,
	fullName,
	image,
	lastMessage,
	lastMessageTime,
	unreadMessages,
	online
}: ChatCardProps): React.ReactElement | null {
	const router = useRouter()
	const pathname = usePathname()

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => {
				router.navigate(
					pathname.includes("/user/")
						? `/user/chat/${_id}`
						: `/vendor/chat/${_id}`
				)
			}}
		>
			<View style={styles.horizontalWrapper}>
				<View style={styles.profileImageContainer}>
					<Image
						source={image}
						style={styles.profileImage}
						contentFit="cover"
					/>
					{online && <View style={styles.onlineMarker} />}
				</View>
				<View style={styles.verticalWrapper}>
					<Text
						style={styles.userNameText}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{fullName}
					</Text>
					<Text
						style={styles.lastMessageText}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{lastMessage}
					</Text>
				</View>
			</View>
			<View
				style={[
					styles.verticalWrapper,
					styles.verticallyCenteredWrapper
				]}
			>
				<Text
					style={styles.lastMessageTimeText}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{lastMessageTime}
				</Text>
				{unreadMessages > 0 ? (
					<View style={styles.unreadMessagesContainer}>
						<Text style={styles.unreadMessagesCount}>
							{unreadMessages}
						</Text>
					</View>
				) : (
					<View style={styles.emptyView} />
				)}
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 65,
		width: "100%",
		backgroundColor: "#F4F5F8",
		borderRadius: 17.5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 10,
		gap: 15
	},
	horizontalWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10
	},
	verticalWrapper: {
		flexDirection: "column",
		gap: 7.5
	},
	verticallyCenteredWrapper: {
		alignItems: "center"
	},
	profileImageContainer: {
		height: 50,
		width: 50,
		borderRadius: 10,
		borderWidth: 1.5,
		borderColor: "white",
		overflow: "hidden",
		position: "relative"
	},
	onlineMarker: {
		height: 10,
		width: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "white",
		backgroundColor: "#8BC83F",
		position: "absolute",
		top: 2.5,
		right: 2.5
	},
	profileImage: {
		height: "100%",
		width: "100%"
	},
	userNameText: {
		fontSize: 12.5,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary,
		lineHeight: 15
	},
	lastMessageText: {
		fontSize: 10,
		fontFamily: "Roboto-Light",
		color: theme.colors.secondary,
		lineHeight: 12.5
	},
	lastMessageTimeText: {
		fontSize: 8.5,
		fontFamily: "Roboto-Light",
		color: theme.colors.secondary,
		lineHeight: 10
	},
	unreadMessagesContainer: {
		height: 15,
		width: 15,
		borderRadius: 10,
		backgroundColor: theme.colors.primary,
		alignItems: "center",
		justifyContent: "center"
	},
	unreadMessagesCount: {
		fontSize: 7.5,
		fontFamily: "Roboto-Regular",
		color: "white"
	},
	emptyView: {
		height: 15
	}
})
