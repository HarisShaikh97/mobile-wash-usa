import { View, Text, StyleSheet } from "react-native"
import { theme } from "../../utils/constants"
import { Message } from "../../utils/types"

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
		<View
			style={[
				styles.cardContainer,
				mode === "app"
					? styles.cardContainerApp
					: styles.cardContainerWeb,
				{
					backgroundColor:
						user === "Self" ? theme.colors.primary : "#F5F5F5",
					alignSelf: user === "Self" ? "flex-end" : "flex-start",
					borderBottomLeftRadius: user === "Self" ? 10 : 0,
					borderBottomRightRadius: user === "Self" ? 0 : 10
				}
			]}
		>
			<Text
				style={[
					styles.messageText,
					mode === "app"
						? styles.messageTextApp
						: styles.messageTextWeb,
					{
						color:
							user === "Self" ? "white" : theme.colors.secondary
					}
				]}
			>
				{text}
			</Text>
			<Text
				style={[
					styles.timeText,
					{
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
