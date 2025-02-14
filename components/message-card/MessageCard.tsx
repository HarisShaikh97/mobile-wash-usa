import { View, Text, StyleSheet } from "react-native"
import { theme } from "../../utils/constants"
import { Message } from "../../utils/types"

// Interface for the props of the component
interface MessageCardProps {
	_id: Message["_id"]
	text: Message["text"]
	time: Message["time"]
	user: Message["user"]
	mode: "web" | "app"
}

export default function MessageCard({
	_id,
	text,
	time,
	user,
	mode
}: MessageCardProps): React.ReactElement | null {
	return (
		// Main container for the message card
		<View
			style={[
				styles.cardContainer,
				// Apply different styles based on mode (app or web)
				mode === "app"
					? styles.cardContainerApp
					: styles.cardContainerWeb,
				{
					// Set background color based on user (Self or other)
					backgroundColor:
						user === "Self" ? theme.colors.primary : "#F5F5F5",
					// Align message to right for Self, left for others
					alignSelf: user === "Self" ? "flex-end" : "flex-start",
					// Adjust bottom corners to create chat bubble effect
					borderBottomLeftRadius: user === "Self" ? 10 : 0,
					borderBottomRightRadius: user === "Self" ? 0 : 10
				}
			]}
		>
			{/* Message text content */}
			<Text
				style={[
					styles.messageText,
					// Apply different text styles based on mode
					mode === "app"
						? styles.messageTextApp
						: styles.messageTextWeb,
					{
						// Set text color based on user
						color:
							user === "Self" ? "white" : theme.colors.secondary
					}
				]}
			>
				{text}
			</Text>
			{/* Timestamp display */}
			<Text
				style={[
					styles.timeText,
					{
						// Set time text color and alignment based on user
						color:
							user === "Self" ? "white" : theme.colors.secondary,
						textAlign: user === "Self" ? "right" : "left"
					}
				]}
			>
				{time}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	cardContainer: {
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		padding: 15,
		flexDirection: "column"
	},
	cardContainerApp: {
		width: "70%"
	},
	cardContainerWeb: {
		width: 325
	},
	messageText: {
		fontFamily: "Roboto-Regular",
		paddingVertical: 5
	},
	messageTextApp: {
		fontSize: 11.5,
		lineHeight: 17.5
	},
	messageTextWeb: {
		fontSize: 13.5,
		lineHeight: 18.5
	},
	timeText: {
		fontSize: 10,
		fontFamily: "Montserrat-Regular",
		lineHeight: 15
	}
})
