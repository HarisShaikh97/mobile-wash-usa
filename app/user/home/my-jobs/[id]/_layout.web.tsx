import { ScrollView, View, StyleSheet } from "react-native"
import { Slot, useRouter } from "expo-router"
import ProfileCardWeb from "../../../../../components/profile-card-web/ProfileCardWeb"
import NotificationButton from "../../../../../components/notification-button/NotificationButton"
import { WEB_SIDE_NAV_WIDTH } from "../../../../../utils/constants"

export default function Layout(): React.ReactElement | null {
	const router = useRouter()

	return (
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.scrollContainer}>
				<View style={styles.headerContainer}>
					<ProfileCardWeb
						imageSource={require("../../../../../assets/images/profile.png")}
						userName="John Cosby"
						onPress={() => {
							router.navigate("/user/home/profile")
						}}
					/>
					<NotificationButton mode="web" />
				</View>
				<Slot />
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: "#F3F8FE",
		paddingLeft: WEB_SIDE_NAV_WIDTH
	},
	scrollContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 50,
		padding: 35
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		alignSelf: "flex-end"
	}
})
