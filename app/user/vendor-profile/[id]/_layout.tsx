import { ScrollView, View, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { Slot } from "expo-router"
import BackButton from "../../../../components/back-button/BackButton"
import NotificationButton from "../../../../components/notification-button/NotificationButton"
import { theme } from "../../../../utils/constants"

export default function Layout(): React.ReactElement | null {
	return (
		// Main scrollable container
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.container}>
				{/* Background image container */}
				<View style={styles.bgImageWrapper}>
					<Image
						source={require("../../../../assets/images/profile-bg.png")}
						style={styles.bgImage}
						contentFit="fill"
					/>
				</View>
				{/* Main content container */}
				<View style={styles.bodyContainer}>
					{/* Header with navigation and notification buttons */}
					<View style={styles.headerContainer}>
						<BackButton
							size="small"
							color="#ffffff"
							backgroundColor="rgba(255, 255, 255, 0.15)"
							borderColor="#ffffff"
						/>
						<NotificationButton theme="dark" mode="app" />
					</View>
					{/* Profile content card */}
					<View style={styles.profileCard}>
						{/* Dynamic content slot */}
						<Slot />
					</View>
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: "white"
	},
	container: {
		position: "relative"
	},
	bgImageWrapper: {
		height: 265,
		width: "100%",
		position: "absolute",
		top: 0,
		left: 0,
		backgroundColor: theme.colors.primary
	},
	bgImage: {
		height: "100%",
		width: "100%",
		opacity: 0.5
	},
	bodyContainer: {
		zIndex: 10,
		flexDirection: "column"
	},
	headerContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 25
	},
	profileCard: {
		backgroundColor: "white",
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		paddingHorizontal: 15,
		paddingBottom: 35,
		marginTop: 85
	}
})
