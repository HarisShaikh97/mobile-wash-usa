import { useCallback } from "react"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter, usePathname } from "expo-router"
import { theme } from "../../utils/constants"
import { Chat } from "../../utils/types"

// Interface for the base props of the component
interface ChatCardBaseProps {
	id: Chat["id"]
	fullName: Chat["full_name"]
	image: Chat["profile_pic"]
	lastMessage: Chat["lastMessage"]
	lastMessageTime: Chat["lastMessageTime"]
	unreadMessages: Chat["unreadMessages"]
	online: Chat["online"]
}

// Interface for the app props of the component
interface ChatCardAppProps extends ChatCardBaseProps {
	mode: "app"
}

// Interface for the web props of the component
interface ChatCardWebProps extends ChatCardBaseProps {
	mode: "web"
	selectedChat: Chat["id"] | null
	setSelectedChat: (val: Chat["id"] | null) => void
}

// Type for the props of the component (union of app and web props)
type ChatCardProps = ChatCardAppProps | ChatCardWebProps

export default function ChatCard(
	props: ChatCardProps
): React.ReactElement | null {
	// Define base URL
	const BASE_URL = process.env.EXPO_PUBLIC_API_URL

	// Initialize the router instance for navigation
	const router = useRouter()

	// Get the current pathname from the router
	const pathname = usePathname()

	// Memoized callback for handling the selection of the chat
	const handleSelectChat = useCallback((): void => {
		// If the mode is web, set the selected chat, otherwise navigate to the chat screen
		if (props.mode === "web") {
			props.setSelectedChat(props.id)
		} else {
			router.navigate(
				pathname.includes("/user/")
					? `/user/chat/${props.id}`
					: `/vendor/chat/${props.id}`
			)
		}
	}, [props, pathname, router])

	return (
		// Main touchable container for the chat card
		<TouchableOpacity
			style={[
				styles.container,
				props.mode === "web"
					? styles.containerWeb
					: styles.containerApp,
				props.mode === "web" && props.id === props.selectedChat
					? styles.containerSelected
					: styles.containerUnSelected
			]}
			onPress={handleSelectChat}
		>
			{/* Left section containing profile image and user details */}
			<View style={styles.horizontalWrapper}>
				{/* Profile image container with online status indicator */}
				<View
					style={[
						styles.profileImageContainer,
						props.mode === "web"
							? styles.profileImageContainerWeb
							: styles.profileImageContainerApp
					]}
				>
					<Image
						source={
							props.image.length > 0
								? {
										uri: `${BASE_URL}/storage/${props.image}`
								  }
								: require("../../assets/images/profile.png")
						}
						style={styles.profileImage}
						contentFit="cover"
					/>
					{/* Online status indicator */}
					{props.online && <View style={styles.onlineMarker} />}
				</View>
				{/* User name and last message container */}
				<View style={styles.verticalWrapper}>
					{/* User name text */}
					<Text
						style={[
							styles.userNameText,
							props.mode === "web" &&
							props.id === props.selectedChat
								? styles.textSelected
								: styles.textUnSelected
						]}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{props.fullName}
					</Text>
					{/* Last message preview */}
					<Text
						style={[
							styles.lastMessageText,
							props.mode === "web" &&
							props.id === props.selectedChat
								? styles.textSelected
								: styles.textUnSelected
						]}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{props.lastMessage}
					</Text>
				</View>
			</View>
			{/* Right section containing time and unread messages count */}
			<View
				style={[
					styles.verticalWrapper,
					styles.verticallyCenteredWrapper
				]}
			>
				{/* Last message timestamp */}
				<Text
					style={[
						styles.lastMessageTimeText,
						props.mode === "web" && props.id === props.selectedChat
							? styles.textSelected
							: styles.textUnSelected
					]}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{props.lastMessageTime}
				</Text>
				{/* Unread messages counter or empty space */}
				{props.unreadMessages > 0 ? (
					<View
						style={[
							styles.unreadMessagesContainer,
							props.mode === "web" &&
							props.id === props.selectedChat
								? styles.unreadMessagesContainerSelected
								: styles.unreadMessagesContainerUnSelected
						]}
					>
						<Text
							style={[
								styles.unreadMessagesCount,
								props.mode === "web" &&
								props.id === props.selectedChat
									? styles.unreadMessagesCountSelected
									: styles.unreadMessagesCountUnSelected
							]}
						>
							{props.unreadMessages}
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
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 10,
		gap: 15
	},
	containerApp: {
		height: 65,
		borderRadius: 17.5
	},
	containerWeb: {
		height: 75,
		borderRadius: 20
	},
	containerUnSelected: {
		backgroundColor: "#F4F5F8"
	},
	containerSelected: {
		backgroundColor: theme.colors.primary
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
		borderWidth: 1.5,
		borderColor: "white",
		overflow: "hidden",
		position: "relative"
	},
	profileImageContainerApp: {
		height: 50,
		width: 50,
		borderRadius: 10
	},
	profileImageContainerWeb: {
		height: 55,
		width: 55,
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
		lineHeight: 15
	},
	textUnSelected: {
		color: theme.colors.secondary
	},
	textSelected: {
		color: "white"
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
		alignItems: "center",
		justifyContent: "center"
	},
	unreadMessagesContainerUnSelected: {
		backgroundColor: theme.colors.primary
	},
	unreadMessagesContainerSelected: {
		backgroundColor: "white"
	},
	unreadMessagesCount: {
		fontSize: 7.5,
		fontFamily: "Roboto-Regular"
	},
	unreadMessagesCountUnSelected: {
		color: "white"
	},
	unreadMessagesCountSelected: {
		color: theme.colors.primary
	},
	emptyView: {
		height: 15
	}
})
