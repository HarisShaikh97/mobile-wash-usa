import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useFonts } from "expo-font"
import Entypo from "@expo/vector-icons/Entypo"
import { Notification } from "../../utils/types"
import { theme } from "../../utils/constants"

interface NotificationCardProps {
	theme: "light" | "dark"
	type: Notification["type"]
	title: Notification["title"]
	description: Notification["description"]
	time: Notification["time"]
	setOpenModal: (value: boolean) => void
}

export default function NotificationCard({
	theme,
	type,
	title,
	description,
	time,
	setOpenModal
}: NotificationCardProps): React.ReactElement | null {
	const [fontsLoaded] = useFonts({
		"Montserrat-SemiBold": require("../../assets/fonts/Montserrat/Montserrat SemiBold 600.ttf"),
		"Roboto-Regular": require("../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor:
						theme === "dark" ? "rgba(47, 116, 250, 0.1)" : "white",
					borderColor:
						theme === "dark"
							? "transparent"
							: "rgba(173, 173, 173, 0.1)"
				}
			]}
		>
			<Image
				source={
					type === "message"
						? require("../../assets/icons/message.svg")
						: type === "security"
						? require("../../assets/icons/security2.svg")
						: require("../../assets/icons/alert.svg")
				}
				style={styles.iconImage}
				contentFit="contain"
			/>
			<View style={styles.notificationDetailsWrapper}>
				<View style={styles.horizontalWrapper}>
					<View style={styles.verticalWrapper}>
						{fontsLoaded && (
							<Text
								style={styles.titleText}
								numberOfLines={1}
								ellipsizeMode="tail"
							>
								{title}
							</Text>
						)}
						{fontsLoaded && (
							<Text
								style={[
									styles.textSmall,
									styles.descriptionText
								]}
							>
								{description}
							</Text>
						)}
					</View>
					<TouchableOpacity
						onPress={() => {
							setOpenModal(true)
						}}
					>
						<Entypo
							name="dots-three-vertical"
							size={15}
							color="black"
						/>
					</TouchableOpacity>
				</View>
				<View style={[styles.centerAligned, styles.horizontalWrapper]}>
					{type === "security" ? (
						<View />
					) : (
						<TouchableOpacity style={styles.viewButtonContainer}>
							{fontsLoaded && (
								<Text
									style={[
										styles.textSmall,
										styles.viewButtonText
									]}
								>
									{type === "message"
										? "View Message"
										: "View Bid"}
								</Text>
							)}
						</TouchableOpacity>
					)}
					{fontsLoaded && (
						<Text style={[styles.textSmall, styles.timeText]}>
							{time}
						</Text>
					)}
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		borderRadius: 12.5,
		borderWidth: 1,
		padding: 15,
		flexDirection: "row",
		gap: 25
	},
	iconImage: {
		height: 30,
		width: 30
	},
	notificationDetailsWrapper: {
		flexGrow: 1,
		flexDirection: "column",
		gap: 15
	},
	horizontalWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 15
	},
	verticalWrapper: {
		flex: 1,
		flexDirection: "column",
		gap: 5
	},
	centerAligned: {
		alignItems: "center"
	},
	titleText: {
		fontSize: 13.5,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary
	},
	textSmall: {
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	descriptionText: {
		fontSize: 10
	},
	timeText: {
		fontSize: 8.5
	},
	viewButtonContainer: {
		height: 30,
		borderRadius: 8.5,
		borderWidth: 0.75,
		borderColor: theme.colors.secondary,
		paddingHorizontal: 22.5,
		alignItems: "center",
		justifyContent: "center"
	},
	viewButtonText: {
		fontSize: 11.5
	}
})
