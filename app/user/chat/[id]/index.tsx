import { View, Text, StyleSheet } from "react-native"
import { useFonts } from "expo-font"
import { useLocalSearchParams } from "expo-router"
import HorizontalSeparator from "../../../../components/horizontal-separator/HorizontalSeparator"
import MessageCard from "../../../../components/message-card/MessageCard"
import { theme } from "../../../../utils/constants"
import { Message } from "../../../../utils/types"

export default function Page(): React.ReactElement | null {
	const { id } = useLocalSearchParams()

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Roboto-Bold": require("../../../../assets/fonts/Roboto/Roboto Bold 700.ttf"),
		"Roboto-Regular": require("../../../../assets/fonts/Roboto/Roboto 400.ttf")
	})

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

	return (
		<View style={styles.bodyContainer}>
			<View style={styles.jobCard}>
				<View style={styles.horizontalWrapper}>
					{fontsLoaded && (
						<Text
							style={styles.jobTitleText}
							numberOfLines={2}
							ellipsizeMode="tail"
						>
							Car Wash Service Needed
						</Text>
					)}
					{fontsLoaded && <Text style={styles.amountText}>$500</Text>}
				</View>
				{fontsLoaded && (
					<Text
						style={styles.jobDescriptionText}
						numberOfLines={2}
						ellipsizeMode="tail"
					>
						Full exterior and interior wash needed for SUV.
						Preferably before noon...
					</Text>
				)}
			</View>
			<View style={styles.chatSectionHeader}>
				<HorizontalSeparator color="#EDEDED" />
				{fontsLoaded && (
					<Text style={styles.chatSectionTitleText}>Yesterday</Text>
				)}
				<HorizontalSeparator color="#EDEDED" />
			</View>
			{messages.map(
				(
					message: Message,
					index: number
				): React.ReactElement | null => {
					return (
						<MessageCard
							_id={message._id}
							text={message.text}
							time={message.time}
							user={message.user}
							key={index}
						/>
					)
				}
			)}
			<View style={styles.chatSectionHeader}>
				<HorizontalSeparator color="#EDEDED" />
				{fontsLoaded && (
					<Text style={styles.chatSectionTitleText}>Today</Text>
				)}
				<HorizontalSeparator color="#EDEDED" />
			</View>
			{messages.map(
				(
					message: Message,
					index: number
				): React.ReactElement | null => {
					return (
						<MessageCard
							_id={message._id}
							text={message.text}
							time={message.time}
							user={message.user}
							key={index}
						/>
					)
				}
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	bodyContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 20,
		paddingTop: 30,
		paddingBottom: 25
	},
	jobCard: {
		width: "100%",
		borderRadius: 17.5,
		borderWidth: 1,
		borderColor: "#F5F5F5",
		padding: 20,
		flexDirection: "column",
		gap: 7.5
	},
	horizontalWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	jobTitleText: {
		fontSize: 16.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		width: 165
	},
	amountText: {
		fontSize: 22.5,
		fontFamily: "Roboto-Bold",
		color: theme.colors.primary
	},
	jobDescriptionText: {
		fontSize: 11.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		width: 250
	},
	chatSectionHeader: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		gap: 15
	},
	chatSectionTitleText: {
		fontSize: 11.5,
		fontFamily: "Roboto-Regular",
		color: "#ADB5BD"
	}
})
