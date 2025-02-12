import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import Ratings from "../../../../../components/ratings/Ratings"
import FormButton from "../../../../../components/form-button/FormButton"
import ReviewCard from "../../../../../components/review-card/ReviewCard"
import { theme } from "../../../../../utils/constants"
import { Review } from "../../../../../utils/types"

export default function Page(): React.ReactElement | null {
	// Initialize router object for navigation
	const router = useRouter()

	// State for managing selected tab
	const [selectedTab, setSelectedTab] = useState<"about" | "rating">("about")

	// Memoized callback for editing profile
	const handleEditProfile = useCallback((): void => {
		router.navigate(`/vendor/edit-account`) // Navigate to edit profile page
	}, [router])

	const reviews: Review[] = [
		{
			vendor_id: "1",
			userName: "Kurt Mullins",
			image: require("../../../../../assets/images/profile2.png"),
			review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
			rating: 4.5,
			time: "8 days ago"
		},
		{
			vendor_id: "1",
			userName: "Kurt Mullins",
			image: require("../../../../../assets/images/profile2.png"),
			review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
			rating: 4.5,
			time: "8 days ago"
		},
		{
			vendor_id: "1",
			userName: "Kurt Mullins",
			image: require("../../../../../assets/images/profile2.png"),
			review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
			rating: 4.5,
			time: "8 days ago"
		},
		{
			vendor_id: "1",
			userName: "Kurt Mullins",
			image: require("../../../../../assets/images/profile2.png"),
			review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
			rating: 4.5,
			time: "8 days ago"
		},
		{
			vendor_id: "1",
			userName: "Kurt Mullins",
			image: require("../../../../../assets/images/profile2.png"),
			review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
			rating: 4.5,
			time: "8 days ago"
		}
	]

	return (
		<View style={styles.container}>
			{/* Profile Image Section */}
			<View style={styles.profileImageContainer}>
				<Image
					source={require("../../../../../assets/images/vendor-profile.png")}
					style={styles.profileImage}
					contentFit="cover"
				/>
			</View>
			{/* User Name */}
			<Text style={styles.userNameText}>Michael Guzzi</Text>
			{/* Stats Section */}
			<View style={styles.statsWrapper}>
				{/* Rating Stats */}
				<View style={styles.statsCardContainer}>
					<Text style={styles.statsQuantityText}>4.5</Text>
					<Ratings ratings={4.5} size={15} />
				</View>
				{/* Reviews Stats */}
				<View style={styles.statsCardContainer}>
					<Text style={styles.statsQuantityText}>135</Text>
					<Text style={styles.statsTitleText}>Reviews</Text>
				</View>
				{/* Jobs Stats */}
				<View style={styles.statsCardContainer}>
					<Text style={styles.statsQuantityText}>15</Text>
					<Text style={styles.statsTitleText}>Jobs Done</Text>
				</View>
			</View>
			{/* Edit Profile Button */}
			<FormButton
				length="half"
				colorTheme="dark"
				isLoading={false}
				title="Edit Profile"
				onPress={handleEditProfile}
			/>
			{/* Tab Navigation */}
			<View style={styles.tabsWrapper}>
				{/* About Tab */}
				<TouchableOpacity
					style={[
						styles.tabContainer,
						{
							backgroundColor:
								selectedTab === "about"
									? "white"
									: "transparent"
						}
					]}
					onPress={() => {
						setSelectedTab("about")
					}}
				>
					<Text style={styles.tabTitleText}>About</Text>
				</TouchableOpacity>
				{/* Rating Tab */}
				<TouchableOpacity
					style={[
						styles.tabContainer,
						{
							backgroundColor:
								selectedTab === "rating"
									? "white"
									: "transparent"
						}
					]}
					onPress={() => {
						setSelectedTab("rating")
					}}
				>
					<Text style={styles.tabTitleText}>Rating</Text>
				</TouchableOpacity>
			</View>
			{/* Tab Content */}
			{selectedTab === "about" ? (
				// About Section
				<View style={styles.tabSectionContainer}>
					{/* Vendor Description */}
					<View style={styles.aboutDetailsWrapper}>
						<Text style={styles.aboutHeadingText}>
							About The Vendor
						</Text>
						<Text style={styles.aboutDescriptionText}>
							Michael Guzzi specializes in high-quality vehicle
							detailing with 5 years of experience in providing
							car wash, wax, and interior cleaning services.
						</Text>
					</View>
					{/* Vendor Details */}
					<View style={styles.aboutDetailsWrapper}>
						{/* Location Info */}
						<View style={styles.vendorDetailsContainer}>
							<Image
								source={require("../../../../../assets/icons/location2.svg")}
								style={styles.vendorDetailsIcon}
								contentFit="contain"
							/>
							<View style={styles.vendorTextWrapper}>
								<Text style={styles.vendorDetailsHeadingText}>
									From
								</Text>
								<Text style={styles.vendorDetailText}>
									California, United States
								</Text>
							</View>
						</View>
						{/* Membership Info */}
						<View style={styles.vendorDetailsContainer}>
							<Image
								source={require("../../../../../assets/icons/user2.svg")}
								style={styles.vendorDetailsIcon}
								contentFit="contain"
							/>
							<View style={styles.vendorTextWrapper}>
								<Text style={styles.vendorDetailsHeadingText}>
									Member Since
								</Text>
								<Text style={styles.vendorDetailText}>
									Oct 2023
								</Text>
							</View>
						</View>
						{/* Jobs Completed Info */}
						<View style={styles.vendorDetailsContainer}>
							<Image
								source={require("../../../../../assets/icons/my-jobs.svg")}
								style={styles.vendorDetailsIcon}
								contentFit="contain"
							/>
							<View style={styles.vendorTextWrapper}>
								<Text style={styles.vendorDetailsHeadingText}>
									Jobs Completed
								</Text>
								<Text style={styles.vendorDetailText}>15</Text>
							</View>
						</View>
					</View>
				</View>
			) : (
				// Ratings Section
				<View style={styles.tabSectionContainer}>
					{/* Overall Rating Display */}
					<View style={styles.ratingsWrapper}>
						<Text style={styles.ratingsHeadingText}>
							Overall Rating
						</Text>
						<Text style={styles.ratingsValueText}>4.5</Text>
						<Ratings ratings={4.5} size={35} />
						<Text style={styles.ratingsDescriptionText}>
							Base on 135 Reviews
						</Text>
					</View>
					{/* Review Cards List */}
					<View style={styles.reviewCardsWrapper}>
						{reviews.map(
							(review, index): React.ReactElement | null => {
								return (
									<ReviewCard
										vendor_id={review.vendor_id}
										userName={review.userName}
										image={review.image}
										review={review.review}
										rating={review.rating}
										time={review.time}
										alignSelf={
											index % 2 === 0
												? "flex-end"
												: "flex-start"
										}
										mode="app"
										key={index}
									/>
								)
							}
						)}
					</View>
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 55,
		paddingBottom: 100,
		flexDirection: "column",
		alignItems: "center",
		gap: 25,
		position: "relative"
	},
	profileImageContainer: {
		height: 115,
		width: 115,
		borderRadius: 15,
		borderWidth: 2,
		borderColor: "white",
		position: "absolute",
		top: -70,
		left: "50%",
		transform: [{ translateX: -57.5 }],
		zIndex: 50,
		overflow: "hidden"
	},
	profileImage: {
		height: "100%",
		width: "100%"
	},
	userNameText: {
		fontSize: 18.5,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary
	},
	statsWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	statsCardContainer: {
		height: 75,
		width: "32%",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#F4F5F8",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 15
	},
	statsQuantityText: {
		fontSize: 13.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary
	},
	statsTitleText: {
		fontSize: 11.5,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary
	},
	tabsWrapper: {
		height: 60,
		width: 250,
		borderRadius: 10,
		backgroundColor: "#F4F5F8",
		marginVertical: 25,
		padding: 7.5,
		flexDirection: "row"
	},
	tabContainer: {
		flex: 1,
		borderRadius: 7.5,
		alignItems: "center",
		justifyContent: "center"
	},
	tabTitleText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary
	},
	tabSectionContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 50
	},
	aboutDetailsWrapper: {
		width: "85%",
		flexDirection: "column",
		gap: 15,
		alignSelf: "center"
	},
	aboutHeadingText: {
		fontSize: 17.5,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary
	},
	aboutDescriptionText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		lineHeight: 17.5
	},
	vendorDetailsContainer: {
		flexDirection: "row",
		gap: 12.5
	},
	vendorDetailsIcon: {
		height: 20,
		width: 20
	},
	vendorTextWrapper: {
		flexDirection: "column",
		gap: 5
	},
	vendorDetailsHeadingText: {
		fontSize: 15,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		lineHeight: 20
	},
	vendorDetailText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	ratingsWrapper: {
		flexDirection: "column",
		alignItems: "center",
		gap: 5
	},
	ratingsHeadingText: {
		fontSize: 15,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary
	},
	ratingsValueText: {
		fontSize: 70,
		fontFamily: "Roboto-Bold",
		color: theme.colors.secondary,
		lineHeight: 75
	},
	ratingsDescriptionText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	reviewCardsWrapper: {
		width: "95%",
		flexDirection: "column",
		gap: 15,
		alignSelf: "center"
	}
})
