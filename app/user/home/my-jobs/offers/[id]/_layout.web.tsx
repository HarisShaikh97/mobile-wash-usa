import { useState } from "react"
import { ScrollView, View, StyleSheet } from "react-native"
import { Slot } from "expo-router"
import ProfileCardWeb from "../../../../../../components/profile-card-web/ProfileCardWeb"
import NotificationButton from "../../../../../../components/notification-button/NotificationButton"
import SearchBar from "../../../../../../components/search-bar/SearchBar"
import BackButton from "../../../../../../components/back-button/BackButton"
import { WEB_SIDE_NAV_WIDTH } from "../../../../../../utils/constants"

export default function Layout(): React.ReactElement | null {
	const [searchValue, setSearchValue] = useState<string>("")

	return (
		<View style={styles.wrapper}>
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.scrollContainer}>
					<View style={styles.headerContainer}>
						<View style={styles.headerItemsWrapper}>
							<BackButton
								size="large"
								color="#000000"
								backgroundColor="#ffffff"
								borderColor="#F5F5F5"
							/>
							<SearchBar
								placeholder="Search"
								color="#CACACA"
								backgroundColor="#ffffff"
								value={searchValue}
								onChangeText={setSearchValue}
								filterEnabled={false}
								mode="web"
							/>
						</View>
						<View style={styles.headerItemsWrapper}>
							<ProfileCardWeb
								imageSource={require("../../../../../../assets/images/profile.png")}
								userName="John Cosby"
							/>
							<NotificationButton mode="web" />
						</View>
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
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	headerItemsWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10
	}
})
