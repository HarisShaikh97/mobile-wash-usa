import { useState } from "react"
import { ScrollView, View, StyleSheet } from "react-native"
import { Slot, useRouter } from "expo-router"
import ProfileCardWeb from "../../../../../../components/profile-card-web/ProfileCardWeb"
import NotificationButton from "../../../../../../components/notification-button/NotificationButton"
import SearchBar from "../../../../../../components/search-bar/SearchBar"
import BackButton from "../../../../../../components/back-button/BackButton"
import { WEB_SIDE_NAV_WIDTH } from "../../../../../../utils/constants"

export default function Layout(): React.ReactElement | null {
	const router = useRouter() // Use useRouter hook to get the router instance

	const [searchValue, setSearchValue] = useState<string>("") // State to manage the search value

	return (
		// Main scrollable container for the layout
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			{/* Container for the scrollable content */}
			<View style={styles.scrollContainer}>
				{/* Header container for the layout */}
				<View style={styles.headerContainer}>
					{/* Wrapper for the header items */}
					<View style={styles.headerItemsWrapper}>
						{/* Back button for navigation */}
						<BackButton
							size="large"
							color="#000000"
							backgroundColor="#ffffff"
							borderColor="#F5F5F5"
						/>
						{/* Search bar for filtering content */}
						<SearchBar
							placeholder="Search"
							color="#CACACA"
							backgroundColor="#ffffff"
							borderColor="transparent"
							value={searchValue}
							onChangeText={setSearchValue}
							filterEnabled={false}
							mode="web"
						/>
					</View>
					{/* Wrapper for the header items */}
					<View style={styles.headerItemsWrapper}>
						{/* Profile card for the user */}
						<ProfileCardWeb
							imageSource={require("../../../../../../assets/images/profile.png")}
							userName="John Cosby"
							onPress={() => {
								router.navigate("/user/home/profile")
							}}
						/>
						{/* Notification button for displaying notifications */}
						<NotificationButton mode="web" />
					</View>
				</View>
				{/* Render dynamic content using the Slot component */}
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
