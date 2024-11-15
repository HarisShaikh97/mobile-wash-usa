import { useState } from "react"
import {
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { Slot } from "expo-router"
import { useFonts } from "expo-font"
import BackButton from "../../../../components/back-button/BackButton"
import NotificationButton from "../../../../components/notification-button/NotificationButton"
import SearchBar from "../../../../components/search-bar/SearchBar"
import { theme } from "../../../../utils/constants"

type Tab = "Active" | "Pending" | "Completed"

export default function Layout(): React.ReactElement | null {
	const tabs: Tab[] = ["Active", "Pending", "Completed"]

	const [searchValue, setSearchValue] = useState<string>("")
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0])

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Roboto-Medium": require("../../../../assets/fonts/Roboto/Roboto Medium 500.ttf")
	})

	return (
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<BackButton
						color="#000000"
						backgroundColor="transparent"
						borderColor="#F5F5F5"
					/>
					<NotificationButton theme="dark" />
				</View>
				<View style={styles.bodyContainer}>
					{fontsLoaded && (
						<Text style={styles.titleText}>My Jobs</Text>
					)}
					<SearchBar
						placeholder="Search"
						color="#F5F5F5"
						value={searchValue}
						onChangeText={setSearchValue}
						filterEnabled
						setOpenFilterModal={setOpenModal}
					/>
					<View style={styles.tabsWrapper}>
						{tabs.map(
							(
								tab: Tab,
								index: number
							): React.ReactElement | null => {
								return (
									<TouchableOpacity
										style={[
											styles.tabContainer,
											tab === selectedTab
												? styles.selectedTab
												: styles.unSelectedTab
										]}
										onPress={() => {
											setSelectedTab(tab)
										}}
										key={index}
									>
										{fontsLoaded && (
											<Text
												style={[
													styles.tabText,
													tab === selectedTab
														? styles.selectedTabText
														: styles.unSelectedTabText
												]}
											>
												{tab}
											</Text>
										)}
									</TouchableOpacity>
								)
							}
						)}
					</View>
					<Slot />
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: 20
	},
	container: {
		flexDirection: "column"
	},
	headerContainer: {
		width: "100%",
		paddingVertical: 35,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	bodyContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 20,
		marginBottom: 125
	},
	titleText: {
		fontSize: 25,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary
	},
	tabsWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	tabContainer: {
		height: 45,
		width: "32%",
		borderRadius: 8.5,
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	selectedTab: {
		backgroundColor: theme.colors.primary,
		borderColor: "transparent"
	},
	unSelectedTab: {
		borderColor: theme.colors.primary
	},
	tabText: {
		fontSize: 11.5,
		fontFamily: "Roboto-Medium"
	},
	selectedTabText: {
		color: "white"
	},
	unSelectedTabText: {
		color: theme.colors.primary
	}
})
