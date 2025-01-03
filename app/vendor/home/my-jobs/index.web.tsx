import { useState } from "react"
import {
	View,
	ScrollView,
	TouchableOpacity,
	Text,
	StyleSheet
} from "react-native"
import JobCard from "../../../../components/job-card/JobCard"
import NotificationButton from "../../../../components/notification-button/NotificationButton"
import ProfileCardWeb from "../../../../components/profile-card-web/ProfileCardWeb"
import SearchBar from "../../../../components/search-bar/SearchBar"
import { theme, WEB_SIDE_NAV_WIDTH } from "../../../../utils/constants"
import { Job } from "../../../../utils/types"

type Tab = "Active" | "Pending" | "Completed"

export default function Tab(): React.ReactElement | null {
	const tabs: Tab[] = ["Active", "Pending", "Completed"]

	const [searchValue, setSearchValue] = useState<string>("")
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0])

	const jobs: Job[] = [
		{
			_id: "1",
			title: "Car Wash Service Needed",
			clientName: "John Doe",
			date: "28, Oct 2024",
			time: "10am to 1pm",
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
			address: "California, USA",
			location: {
				lat: 36.7783,
				lng: 119.4179
			},
			budget: 500,
			images: [
				require("../../../../assets/images/background1.png"),
				require("../../../../assets/images/background2.png"),
				require("../../../../assets/images/background3.png"),
				require("../../../../assets/images/background4.png")
			],
			status: "incoming"
		},
		{
			_id: "2",
			title: "Car Wash Service Needed",
			clientName: "John Doe",
			date: "28, Oct 2024",
			time: "10am to 1pm",
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
			address: "California, USA",
			location: {
				lat: 36.7783,
				lng: 119.4179
			},
			budget: 500,
			images: [
				require("../../../../assets/images/background1.png"),
				require("../../../../assets/images/background2.png"),
				require("../../../../assets/images/background3.png"),
				require("../../../../assets/images/background4.png")
			],
			status: "incoming"
		},
		{
			_id: "3",
			title: "Car Wash Service Needed",
			clientName: "John Doe",
			date: "28, Oct 2024",
			time: "10am to 1pm",
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
			address: "California, USA",
			location: {
				lat: 36.7783,
				lng: 119.4179
			},
			budget: 500,
			images: [
				require("../../../../assets/images/background1.png"),
				require("../../../../assets/images/background2.png"),
				require("../../../../assets/images/background3.png"),
				require("../../../../assets/images/background4.png")
			],
			status: "incoming"
		}
	]

	return (
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.scrollContainer}>
				<View style={styles.headerContainer}>
					<ProfileCardWeb
						imageSource={require("../../../../assets/images/profile2.png")}
						userName="Michael Guzzi"
					/>
					<NotificationButton mode="web" />
				</View>
				<View style={styles.myJobsTitleBarContainer}>
					<Text style={styles.myJobsTitleText}>My jobs</Text>
					<View style={styles.searchBarWrapper}>
						<SearchBar
							placeholder="Search"
							color="#CACACA"
							backgroundColor="#ffffff"
							borderColor="#F5F5F5"
							value={searchValue}
							onChangeText={setSearchValue}
							filterEnabled={true}
							setOpenFilterModal={setOpenModal}
							mode="app"
						/>
					</View>
				</View>
				<View style={styles.tabsWrapper}>
					{tabs.map((tab, index): React.ReactElement | null => {
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
							</TouchableOpacity>
						)
					})}
				</View>
				<View style={styles.cardsWrapper}>
					{jobs.map((job): React.ReactElement | null => {
						return (
							<JobCard
								_id={job._id}
								title={job.title}
								description={job.description}
								date={job.date}
								address={job.address}
								budget={job.budget}
								status={job.status}
								showActionButtons
								mode="web"
								key={job._id}
							/>
						)
					})}
				</View>
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
		alignItems: "center",
		padding: 35,
		gap: 35
	},
	headerContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		gap: 10
	},
	cardsWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		gap: 20
	},
	myJobsTitleBarContainer: {
		height: 115,
		width: "100%",
		borderRadius: 15,
		backgroundColor: "white",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 30
	},
	myJobsTitleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary,
		textTransform: "capitalize"
	},
	myJobsDescriptionText: {
		fontSize: 15,
		fontFamily: "Roboto-Light",
		color: theme.colors.secondary,
		textTransform: "capitalize"
	},
	searchBarWrapper: {
		width: 400
	},
	tabsWrapper: {
		width: 400,
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
