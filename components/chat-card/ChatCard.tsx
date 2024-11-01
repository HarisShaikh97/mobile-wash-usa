import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import { theme } from "../../utils/constants"
import { Chat } from "../../utils/types"

interface ChatCardProps {
	_id: Chat["_id"]
	fullName: Chat["fullName"]
	image: Chat["image"]
	lastMessage: Chat["lastMessage"]
	lastMessageTime: Chat["lastMessageTime"]
	unreadMessages: Chat["unreadMessages"]
}

export default function ChatCard({
	_id,
	fullName,
	image,
	lastMessage,
	lastMessageTime,
	unreadMessages
}: ChatCardProps): React.ReactElement | null {
	const router = useRouter()

	const [fontsLoaded] = useFonts({
		"Montserrat-SemiBold": require("../../assets/fonts/Montserrat/Montserrat SemiBold 600.ttf"),
		"Roboto-Regular": require("../../assets/fonts/Roboto/Roboto 400.ttf"),
		"Roboto-Light": require("../../assets/fonts/Roboto/Roboto Light 300.ttf")
	})

	return (
		<TouchableOpacity style={styles.container}>
			<View style={styles.horizontalWrapper}>
				<View style={styles.profileImageContainer}>
					<Image
						source={image}
						style={styles.profileImage}
						contentFit="cover"
					/>
				</View>
				<View style={styles.verticalWrapper}>
					{fontsLoaded && (
						<Text
							style={styles.userNameText}
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							{fullName}
						</Text>
					)}
					{fontsLoaded && (
						<Text
							style={styles.lastMessageText}
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							{lastMessage}
						</Text>
					)}
				</View>
			</View>
			<View
				style={[
					styles.verticalWrapper,
					styles.verticallyCenteredWrapper
				]}
			>
				{fontsLoaded && (
					<Text
						style={styles.lastMessageTimeText}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{lastMessageTime}
					</Text>
				)}
				{unreadMessages > 0 ? (
					<View style={styles.unreadMessagesContainer}>
						{fontsLoaded && (
							<Text style={styles.unreadMessagesCount}>
								{unreadMessages}
							</Text>
						)}
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
		overflow: "hidden"
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
