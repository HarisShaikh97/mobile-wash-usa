import { useCallback, useMemo } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter, useLocalSearchParams } from "expo-router"
import Ratings from "../../../../components/ratings/Ratings"
import FormButton from "../../../../components/form-button/FormButton"
import ReviewCard from "../../../../components/review-card/ReviewCard"
import { theme } from "../../../../utils/constants"
import { Review } from "../../../../utils/types"

export default function Page(): React.ReactElement | null {
	const { id } = useLocalSearchParams()

	const router = useRouter()

	const handleSendMessage = useCallback((): void => {
		router.navigate(`/user/home/messages`)
	}, [router])

	const reviews: Review[] = [
		{
			vendor_id: `${id}`,
			userName: "Kurt Mullins",
			image: require("../../../../assets/images/profile2.png"),
			review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
			rating: 4.5,
			time: "8 days ago"
		},
		{
			vendor_id: `${id}`,
			userName: "Kurt Mullins",
			image: require("../../../../assets/images/profile2.png"),
			review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
			rating: 4.5,
			time: "8 days ago"
		},
		{
			vendor_id: `${id}`,
			userName: "Kurt Mullins",
			image: require("../../../../assets/images/profile2.png"),
			review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
			rating: 4.5,
			time: "8 days ago"
		},
		{
			vendor_id: `${id}`,
			userName: "Kurt Mullins",
			image: require("../../../../assets/images/profile2.png"),
			review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
			rating: 4.5,
			time: "8 days ago"
		},
		{
			vendor_id: `${id}`,
			userName: "Kurt Mullins",
			image: require("../../../../assets/images/profile2.png"),
			review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
			rating: 4.5,
			time: "8 days ago"
		},
		{
			vendor_id: `${id}`,
			userName: "Kurt Mullins",
			image: require("../../../../assets/images/profile2.png"),
			review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
			rating: 4.5,
			time: "8 days ago"
		}
	]

	const reviewsPairs = useMemo(() => {
		return reviews.reduce<Review[][]>((acc, _, index) => {
			if (index % 2 === 0) {
				acc.push(reviews.slice(index, index + 2))
			}
			return acc
		}, [])
	}, [reviews])

	return (
		<View style={styles.container}>
			<View style={styles.profileCardContainer}>
				<View style={styles.profileImageWrapper}>
					<Image
						source={require("../../../../assets/images/vendor-profile.png")}
						style={styles.profileImage}
						contentFit="cover"
					/>
					<Text
						style={styles.userNameText}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						Michael Guzzi
					</Text>
				</View>
				<View style={styles.statsWrapper}>
					<View style={styles.statsCardContainer}>
						<Text style={styles.statsQuantityText}>4.5</Text>
						<Ratings ratings={4.5} size={15} />
					</View>
					<View style={styles.statsCardContainer}>
						<Text style={styles.statsQuantityText}>135</Text>
						<Text style={styles.statsTitleText}>Reviews</Text>
					</View>
					<View style={styles.statsCardContainer}>
						<Text style={styles.statsQuantityText}>15</Text>
						<Text style={styles.statsTitleText}>Jobs Done</Text>
					</View>
				</View>
				<View style={styles.formButtonWrapper}>
					<FormButton
						length="half"
						colorTheme="dark"
						isLoading={false}
						title="Send Message"
						onPress={handleSendMessage}
					/>
				</View>
				<View style={styles.aboutDetailsWrapper}>
					<Text style={styles.aboutHeadingText}>
						About The Vendor
					</Text>
					<Text style={styles.aboutDescriptionText}>
						Michael Guzzi specializes in high-quality vehicle
						detailing with 5 years of experience in providing car
						wash, wax, and interior cleaning services.
					</Text>
				</View>
				<View style={styles.vendorDetailsWrapper}>
					<View style={styles.vendorDetailsContainer}>
						<Image
							source={require("../../../../assets/icons/user2.svg")}
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
					<View style={styles.vendorDetailsContainer}>
						<Image
							source={require("../../../../assets/icons/my-jobs.svg")}
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
					<View style={styles.vendorDetailsContainer}>
						<Image
							source={require("../../../../assets/icons/location2.svg")}
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
				</View>
			</View>
			<View style={styles.verticalCardsWrapper}>
				<View style={styles.ratingsCardContainer}>
					<Text style={styles.ratingsHeadingText}>
						Overall Rating
					</Text>
					<Text style={styles.ratingsValueText}>4.5</Text>
					<Ratings ratings={4.5} size={35} />
					<Text style={styles.ratingsDescriptionText}>
						Base on 135 Reviews
					</Text>
				</View>
				<View style={styles.reviewsCardContainer}>
					{reviewsPairs.map(
						(reviewPair, key): React.ReactElement | null => {
							return (
								<View
									style={[
										styles.reviewCardsWrapper,
										{
											justifyContent:
												key % 2 === 0
													? "flex-start"
													: "flex-end"
										}
									]}
									key={key}
								>
									{reviewPair.map(
										(
											review,
											index
										): React.ReactElement | null => {
											return (
												<ReviewCard
													vendor_id={review.vendor_id}
													userName={review.userName}
													image={review.image}
													review={review.review}
													rating={review.rating}
													time={review.time}
													alignSelf="center"
													mode="web"
													key={index}
												/>
											)
										}
									)}
								</View>
							)
						}
					)}
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		gap: 12.5
	},
	verticalCardsWrapper: {
		flexDirection: "column",
		gap: 12.5,
		flex: 1
	},
	profileCardContainer: {
		height: 685,
		width: 485,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 35,
		paddingHorizontal: 50,
		borderRadius: 15,
		backgroundColor: "white",
		flexGrow: 0,
		flexShrink: 1
	},
	profileImageWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 15
	},
	profileImage: {
		height: 140,
		width: 150,
		borderRadius: 15,
		overflow: "hidden"
	},
	userNameText: {
		fontSize: 25,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary,
		letterSpacing: 0.5
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
	formButtonWrapper: {
		width: "85%",
		alignItems: "center"
	},
	aboutDetailsWrapper: {
		width: "100%",
		flexDirection: "column",
		gap: 12.5,
		alignItems: "center",
		paddingTop: 10
	},
	aboutHeadingText: {
		fontSize: 20,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary,
		textTransform: "capitalize",
		textAlign: "center"
	},
	aboutDescriptionText: {
		fontSize: 15,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		textAlign: "center",
		lineHeight: 22.5
	},
	vendorDetailsWrapper: {
		width: "100%",
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12.5,
		alignItems: "center",
		justifyContent: "center"
	},
	vendorDetailsContainer: {
		width: 175,
		padding: 10,
		borderRadius: 8.5,
		borderColor: "#F4F5F8",
		borderWidth: 1,
		flexDirection: "row",
		gap: 10
	},
	vendorDetailsIcon: {
		height: 15,
		width: 15
	},
	vendorTextWrapper: {
		flexDirection: "column",
		gap: 5
	},
	vendorDetailsHeadingText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Medium",
		color: "#1A3D7C"
	},
	vendorDetailText: {
		fontSize: 11.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	ratingsCardContainer: {
		width: 315,
		flexDirection: "column",
		alignItems: "center",
		gap: 15,
		padding: 45,
		borderRadius: 15,
		backgroundColor: "white"
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
	reviewsCardContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 15,
		padding: 35,
		borderRadius: 15,
		backgroundColor: "white"
	},
	reviewCardsWrapper: {
		width: "100%",
		flexDirection: "row",
		gap: 15
	}
})
