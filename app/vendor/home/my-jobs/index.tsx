import { useState } from "react"
import {
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { useFonts } from "expo-font"
import BackButton from "../../../../components/back-button/BackButton"
import SearchBar from "../../../../components/search-bar/SearchBar"
import JobCard from "../../../../components/job-card/JobCard"
import NotificationButton from "../../../../components/notification-button/NotificationButton"
import { theme } from "../../../../utils/constants"
import { Job } from "../../../../utils/types"

type Tab = "Active" | "Pending" | "Completed"

export default function Page(): React.ReactElement | null {
	const tabs: Tab[] = ["Active", "Pending", "Completed"]

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
		},
		{
			_id: "4",
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
					<View style={styles.jobCardsContainer}>
						{jobs.map((job: Job): React.ReactElement | null => {
							return (
								<JobCard
									_id={job._id}
									title={job.title}
									description={job.description}
									date={job.date}
									address={job.address}
									budget={job.budget}
									status={job.status}
									key={job._id}
								/>
							)
						})}
					</View>
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
	jobCardsContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 10,
		marginTop: 10
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
