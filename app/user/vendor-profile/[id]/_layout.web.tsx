import { ScrollView, View, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { Slot } from "expo-router"
import BackButton from "../../../../components/back-button/BackButton"
import ProfileCardWeb from "../../../../components/profile-card-web/ProfileCardWeb"
import NotificationButton from "../../../../components/notification-button/NotificationButton"
import { theme } from "../../../../utils/constants"

export default function Layout(): React.ReactElement | null {
	return (
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.scrollContainer}>
				<View style={styles.headerContainer}>
					<BackButton
						size="large"
						color="#000000"
						backgroundColor="#ffffff"
						borderColor="transparent"
					/>
					<View style={styles.headerCardsWrapper}>
						<ProfileCardWeb
							imageSource={require("../../../../assets/images/profile.png")}
							userName="John Cosby"
						/>
						<NotificationButton mode="web" />
					</View>
				</View>
				<View style={styles.bodyWrapper}>
					<Image
						source={require("../../../../assets/images/profile-header-bg-web.png")}
						style={styles.backgroundCardContainer}
						contentFit="fill"
					/>
					<View style={styles.bodyContainer}>
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
		backgroundColor: "#F3F8FE"
	},
	scrollContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		padding: 35
	},
	headerContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	headerCardsWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10
	},
	bodyWrapper: {
		width: "80%",
		alignItems: "center",
		position: "relative"
	},
	backgroundCardContainer: {
		height: 200,
		width: "100%",
		borderRadius: 17.5,
		backgroundColor: theme.colors.primary,
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		top: 65,
		left: "50%",
		transform: [{ translateX: "-50%" }],
		zIndex: -10
	},
	bodyContainer: {
		width: "93.5%",
		zIndex: 10,
		paddingTop: 150
	}
})
