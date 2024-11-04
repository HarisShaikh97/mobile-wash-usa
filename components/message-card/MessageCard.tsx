import { View, Text, StyleSheet } from "react-native"
import { useFonts } from "expo-font"
import { theme } from "../../utils/constants"
import { Message } from "../../utils/types"

interface MessageCardProps {
	_id: Message["_id"]
	text: Message["text"]
	time: Message["time"]
	user: Message["user"]
}

export default function MessageCard({
	_id,
	text,
	time,
	user
}: MessageCardProps): React.ReactElement | null {
	const [fontsLoaded] = useFonts({
		"Montserrat-Regular": require("../../assets/fonts/Montserrat/Montserrat Regular 400.ttf"),
		"Roboto-Regular": require("../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	return (
		<View
			style={[
				styles.cardContainer,
				{
					backgroundColor:
						user === "Self" ? theme.colors.primary : "#F5F5F5",
					alignSelf: user === "Self" ? "flex-end" : "flex-start",
					borderBottomLeftRadius: user === "Self" ? 10 : 0,
					borderBottomRightRadius: user === "Self" ? 0 : 10
				}
			]}
		>
			{fontsLoaded && (
				<Text
					style={[
						styles.messageText,
						{
							color:
								user === "Self"
									? "white"
									: theme.colors.secondary
						}
					]}
				>
					{text}
				</Text>
			)}
			{fontsLoaded && (
				<Text
					style={[
						styles.timeText,
						{
							color:
								user === "Self"
									? "white"
									: theme.colors.secondary,
							textAlign: user === "Self" ? "right" : "left"
						}
					]}
				>
					{time}
				</Text>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	cardContainer: {
		width: "70%",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		padding: 15,
		flexDirection: "column"
	},
	messageText: {
		fontSize: 11.5,
		fontFamily: "Roboto-Regular",
		lineHeight: 17.5,
		paddingVertical: 5
	},
	timeText: {
		fontSize: 10,
		fontFamily: "Montserrat-Regular",
		lineHeight: 15
	}
})
