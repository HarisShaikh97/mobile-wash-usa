import { ScrollView, View, StyleSheet } from "react-native"
import { Slot } from "expo-router"
import ProfileCardWeb from "../../../../../components/profile-card-web/ProfileCardWeb"
import NotificationButton from "../../../../../components/notification-button/NotificationButton"
import { WEB_SIDE_NAV_WIDTH } from "../../../../../utils/constants"

export default function Layout(): React.ReactElement | null {
	return (
		<View style={styles.wrapper}>
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.scrollContainer}>
					<View style={styles.headerContainer}>
						<ProfileCardWeb />
						<NotificationButton mode="web" />
					</View>
					<Slot />
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: "#F3F8FE",
		paddingLeft: WEB_SIDE_NAV_WIDTH
	},
	scrollView: {
		flex: 1,
		padding: 35
	},
	scrollContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 50
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		alignSelf: "flex-end"
	}
})
