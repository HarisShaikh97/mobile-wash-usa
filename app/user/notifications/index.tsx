import { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import NotificationCard from "../../../components/notification-card/NotificationCard"
import NotificationActionsModal from "../../../components/notification-actions-modal/NotificationActionsModal"
import { theme } from "../../../utils/constants"
import { Notification } from "../../../utils/types"

export default function Page(): React.ReactElement | null {
	// State to control notification actions modal visibility
	const [openModal, setOpenModal] = useState<boolean>(false)

	const notifications: Notification[] = [
		{
			_id: "1",
			type: "message",
			title: "Message",
			description:
				"You have a new message from John. Open the app to continue the conversation.",
			time: "1 hour ago"
		},
		{
			_id: "2",
			type: "offer",
			title: "Offer",
			description: "Vendor Jane Doe bid $45 on your Car Wash job.",
			time: "2 hour ago"
		},
		{
			_id: "3",
			type: "security",
			title: "Password Reset Request",
			description:
				"Hi John a, we received a request to reset your password. Click here to create a new one: Link. If you didn’t make this request, please contact support.",
			time: "3 hour ago"
		}
	]

	return (
		<View style={styles.container}>
			{/* Modal for notification actions like delete/mark as read */}
			<NotificationActionsModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				mode="app"
			/>
			{/* Page title */}
			<Text style={styles.titleText}>Notifications</Text>
			{/* Today's notifications section */}
			{/* Container for today's notifications section */}
			<View style={styles.sectionContainer}>
				{/* "Today" section header */}
				<Text style={styles.sectionTitleText}>Today</Text>
				{/* Wrapper for notification cards */}
				<View style={styles.notificationCardsWrapper}>
					{/* Map through notifications array to render notification cards */}
					{notifications.map(
						(notification, index): React.ReactElement | null => {
							return (
								// Individual notification card with alternating dark/light theme
								<NotificationCard
									theme={index % 2 === 0 ? "dark" : "light"}
									type={notification.type}
									title={notification.title}
									description={notification.description}
									time={notification.time}
									setOpenModal={setOpenModal}
									mode="app"
									key={index}
								/>
							)
						}
					)}
				</View>
			</View>
			{/* Yesterday's notifications section */}
			{/* Yesterday's notifications section container */}
			<View style={styles.sectionContainer}>
				{/* "Yesterday" section header */}
				<Text style={styles.sectionTitleText}>Yesterday</Text>
				{/* Wrapper for yesterday's notification cards */}
				<View style={styles.notificationCardsWrapper}>
					{/* Map through notifications array to render notification cards */}
					{notifications.map(
						(notification, index): React.ReactElement | null => {
							return (
								// Individual notification card with alternating dark/light theme
								<NotificationCard
									theme={index % 2 === 0 ? "dark" : "light"}
									type={notification.type}
									title={notification.title}
									description={notification.description}
									time={notification.time}
									setOpenModal={setOpenModal}
									mode="app"
									key={index}
								/>
							)
						}
					)}
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "column",
		gap: 25
	},
	titleText: {
		fontSize: 22.5,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary,
		alignSelf: "center",
		marginBottom: 10
	},
	sectionContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 15
	},
	sectionTitleText: {
		fontSize: 17.5,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary
	},
	notificationCardsWrapper: {
		width: "100%",
		flexDirection: "column",
		gap: 10
	}
})
