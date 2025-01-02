import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
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
	mode: "app" | "web"
}

export default function NotificationCard({
	theme,
	type,
	title,
	description,
	time,
	setOpenModal,
	mode
}: NotificationCardProps): React.ReactElement | null {
	return (
		<View
			style={[
				styles.container,
				mode === "app" ? styles.containerApp : styles.containerWeb,
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
				style={
					mode === "app" ? styles.iconImageApp : styles.iconImageWeb
				}
				contentFit="contain"
			/>
			<View
				style={[
					styles.notificationDetailsWrapper,
					mode === "app"
						? styles.notificationDetailsWrapperApp
						: styles.notificationDetailsWrapperWeb
				]}
			>
				<View style={styles.horizontalWrapper}>
					<View style={styles.verticalWrapper}>
						<Text
							style={[
								styles.titleText,
								mode === "app"
									? styles.titleTextApp
									: styles.titleTextWeb
							]}
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							{title}
						</Text>
						<Text
							style={[
								styles.descriptionText,
								mode === "app"
									? styles.descriptionTextApp
									: styles.descriptionTextWeb
							]}
						>
							{description}
						</Text>
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
						<TouchableOpacity
							style={[
								styles.viewButtonContainer,
								mode === "app"
									? styles.viewButtonContainerApp
									: styles.viewButtonContainerWeb
							]}
						>
							<Text
								style={[
									styles.textSmall,
									mode === "app"
										? styles.viewButtonTextApp
										: styles.viewButtonTextWeb
								]}
							>
								{type === "message"
									? "View Message"
									: "View Bid"}
							</Text>
						</TouchableOpacity>
					)}
					<Text
						style={[
							styles.textSmall,
							mode === "app"
								? styles.timeTextApp
								: styles.timeTextWeb
						]}
					>
						{time}
					</Text>
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
		flexDirection: "row"
	},
	containerApp: {
		padding: 15,
		gap: 25
	},
	containerWeb: {
		padding: 25,
		gap: 50
	},
	iconImageApp: {
		height: 30,
		width: 30
	},
	iconImageWeb: {
		height: 45,
		width: 45,
		marginLeft: 17.5
	},
	notificationDetailsWrapper: {
		flexGrow: 1,
		flexDirection: "column"
	},
	notificationDetailsWrapperApp: {
		gap: 15
	},
	notificationDetailsWrapperWeb: {
		gap: 25
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
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary
	},
	titleTextApp: {
		fontSize: 13.5
	},
	titleTextWeb: {
		fontSize: 17.5,
		letterSpacing: 0.5
	},
	textSmall: {
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	descriptionText: {
		color: theme.colors.secondary
	},
	descriptionTextApp: {
		fontFamily: "Roboto-Regular",
		fontSize: 10
	},
	descriptionTextWeb: {
		fontFamily: "Roboto-Light",
		fontSize: 15,
		maxWidth: 725
	},
	timeTextApp: {
		fontSize: 8.5
	},
	timeTextWeb: {
		fontSize: 12.5
	},
	viewButtonContainer: {
		borderWidth: 0.75,
		borderColor: theme.colors.secondary,
		alignItems: "center",
		justifyContent: "center"
	},
	viewButtonContainerApp: {
		borderRadius: 8.5,
		height: 30,
		paddingHorizontal: 22.5
	},
	viewButtonContainerWeb: {
		borderRadius: 6.5,
		height: 40,
		paddingHorizontal: 25
	},
	viewButtonTextApp: {
		fontSize: 11.5
	},
	viewButtonTextWeb: {
		fontSize: 13.5
	}
})
