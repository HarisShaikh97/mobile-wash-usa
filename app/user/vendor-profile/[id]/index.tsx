import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useFonts } from "expo-font"
import { useRouter, useLocalSearchParams } from "expo-router"
import Ratings from "../../../../components/ratings/Ratings"
import FormButton from "../../../../components/form-button/FormButton"
import ReviewCard from "../../../../components/review-card/ReviewCard"
import { theme } from "../../../../utils/constants"
import { Review } from "../../../../utils/types"

export default function Page(): React.ReactElement | null {
	const { id } = useLocalSearchParams()

	const router = useRouter()

	const [selectedTab, setSelectedTab] = useState<"about" | "rating">("about")

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Montserrat-SemiBold": require("../../../../assets/fonts/Montserrat/Montserrat SemiBold 600.ttf"),
		"Roboto-Bold": require("../../../../assets/fonts/Roboto/Roboto Bold 700.ttf"),
		"Roboto-Medium": require("../../../../assets/fonts/Roboto/Roboto Medium 500.ttf"),
		"Roboto-Regular": require("../../../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	const handleSendMessage = useCallback((): void => {
		router.navigate(`/user/chat/${id}`)
	}, [router])

	const reviews: Review[] = [
		{
			vendor_id: "1",
			userName: "Kurt Mullins",
			image: require("../../../../assets/images/profile2.png"),
			review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
			rating: 4.5,
			time: "8 days ago"
		},
		{
			vendor_id: "1",
			userName: "Kurt Mullins",
			image: require("../../../../assets/images/profile2.png"),
			review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
			rating: 4.5,
			time: "8 days ago"
		},
		{
			vendor_id: "1",
			userName: "Kurt Mullins",
			image: require("../../../../assets/images/profile2.png"),
			review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
			rating: 4.5,
			time: "8 days ago"
		},
		{
			vendor_id: "1",
			userName: "Kurt Mullins",
			image: require("../../../../assets/images/profile2.png"),
			review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
			rating: 4.5,
			time: "8 days ago"
		},
		{
			vendor_id: "1",
			userName: "Kurt Mullins",
			image: require("../../../../assets/images/profile2.png"),
			review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
			rating: 4.5,
			time: "8 days ago"
		}
	]

	return (
		<View style={styles.container}>
			<View style={styles.profileImageContainer}>
				<Image
					source={require("../../../../assets/images/vendor-profile.png")}
					style={styles.profileImage}
					contentFit="cover"
				/>
			</View>
			{fontsLoaded && (
				<Text style={styles.userNameText}>Michael Guzzi</Text>
			)}
			<View style={styles.statsWrapper}>
				<View style={styles.statsCardContainer}>
					{fontsLoaded && (
						<Text style={styles.statsQuantityText}>4.5</Text>
					)}
					<Ratings ratings={4.5} size={15} />
				</View>
				<View style={styles.statsCardContainer}>
					{fontsLoaded && (
						<Text style={styles.statsQuantityText}>135</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.statsTitleText}>Reviews</Text>
					)}
				</View>
				<View style={styles.statsCardContainer}>
					{fontsLoaded && (
						<Text style={styles.statsQuantityText}>15</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.statsTitleText}>Jobs Done</Text>
					)}
				</View>
			</View>
			<FormButton
				length="half"
				theme="dark"
				title="Send Message"
				onPress={handleSendMessage}
			/>
			<View style={styles.tabsWrapper}>
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
					{fontsLoaded && (
						<Text style={styles.tabTitleText}>About</Text>
					)}
				</TouchableOpacity>
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
					{fontsLoaded && (
						<Text style={styles.tabTitleText}>Rating</Text>
					)}
				</TouchableOpacity>
			</View>
			{selectedTab === "about" ? (
				<View style={styles.tabSectionContainer}>
					<View style={styles.aboutDetailsWrapper}>
						{fontsLoaded && (
							<Text style={styles.aboutHeadingText}>
								About The Vendor
							</Text>
						)}
						{fontsLoaded && (
							<Text style={styles.aboutDescriptionText}>
								Michael Guzzi specializes in high-quality
								vehicle detailing with 5 years of experience in
								providing car wash, wax, and interior cleaning
								services.
							</Text>
						)}
					</View>
					<View style={styles.aboutDetailsWrapper}>
						<View style={styles.vendorDetailsContainer}>
							<Image
								source={require("../../../../assets/icons/location2.svg")}
								style={styles.vendorDetailsIcon}
								contentFit="contain"
							/>
							<View style={styles.vendorTextWrapper}>
								{fontsLoaded && (
									<Text
										style={styles.vendorDetailsHeadingText}
									>
										From
									</Text>
								)}
								{fontsLoaded && (
									<Text style={styles.vendorDetailText}>
										California, United States
									</Text>
								)}
							</View>
						</View>
						<View style={styles.vendorDetailsContainer}>
							<Image
								source={require("../../../../assets/icons/user2.svg")}
								style={styles.vendorDetailsIcon}
								contentFit="contain"
							/>
							<View style={styles.vendorTextWrapper}>
								{fontsLoaded && (
									<Text
										style={styles.vendorDetailsHeadingText}
									>
										Member Since
									</Text>
								)}
								{fontsLoaded && (
									<Text style={styles.vendorDetailText}>
										Oct 2023
									</Text>
								)}
							</View>
						</View>
						<View style={styles.vendorDetailsContainer}>
							<Image
								source={require("../../../../assets/icons/my-jobs.svg")}
								style={styles.vendorDetailsIcon}
								contentFit="contain"
							/>
							<View style={styles.vendorTextWrapper}>
								{fontsLoaded && (
									<Text
										style={styles.vendorDetailsHeadingText}
									>
										Jobs Completed
									</Text>
								)}
								{fontsLoaded && (
									<Text style={styles.vendorDetailText}>
										15
									</Text>
								)}
							</View>
						</View>
					</View>
				</View>
			) : (
				<View style={styles.tabSectionContainer}>
					<View style={styles.ratingsWrapper}>
						{fontsLoaded && (
							<Text style={styles.ratingsHeadingText}>
								Overall Rating
							</Text>
						)}
						{fontsLoaded && (
							<Text style={styles.ratingsValueText}>4.5</Text>
						)}
						<Ratings ratings={4.5} size={35} />
						{fontsLoaded && (
							<Text style={styles.ratingsDescriptionText}>
								Base on 135 Reviews
							</Text>
						)}
					</View>
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
