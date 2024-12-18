import { useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image, ImageBackground } from "expo-image"
import { useRouter, useLocalSearchParams } from "expo-router"
import BackButton from "../../../../../components/back-button/BackButton"
import OfferCard from "../../../../../components/offer-card/OfferCard"
import OffersPopup from "../../../../../components/offers-popup/OffersPopup"
import { theme } from "../../../../../utils/constants"
import { Offer } from "../../../../../utils/types"

export default function Page(): React.ReactElement | null {
	const { id } = useLocalSearchParams()

	const router = useRouter()

	const offers: Offer[] = [
		{
			job_id: "1",
			vendor_id: "2",
			vendorName: "Michael Guzzi",
			vendorImage: require("../../../../../assets/images/vendor-profile.png"),
			vendorJobsCompleted: 26,
			ratings: 4.5,
			reviews: 26,
			amount: 450,
			location: "California, USA"
		},
		{
			job_id: "2",
			vendor_id: "2",
			vendorName: "Michael Guzzi",
			vendorImage: require("../../../../../assets/images/vendor-profile.png"),
			vendorJobsCompleted: 26,
			ratings: 4.5,
			reviews: 26,
			amount: 450,
			location: "California, USA"
		},
		{
			job_id: "3",
			vendor_id: "2",
			vendorName: "Michael Guzzi",
			vendorImage: require("../../../../../assets/images/vendor-profile.png"),
			vendorJobsCompleted: 26,
			ratings: 4.5,
			reviews: 26,
			amount: 450,
			location: "California, USA"
		},
		{
			job_id: "4",
			vendor_id: "2",
			vendorName: "Michael Guzzi",
			vendorImage: require("../../../../../assets/images/vendor-profile.png"),
			vendorJobsCompleted: 26,
			ratings: 4.5,
			reviews: 26,
			amount: 450,
			location: "California, USA"
		},
		{
			job_id: "5",
			vendor_id: "2",
			vendorName: "Michael Guzzi",
			vendorImage: require("../../../../../assets/images/vendor-profile.png"),
			vendorJobsCompleted: 26,
			ratings: 4.5,
			reviews: 26,
			amount: 450,
			location: "California, USA"
		}
	]

	const handleViewImage = useCallback((): void => {
		router.navigate(`/user/job-images/${id}`)
	}, [router])

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<View style={styles.headerTitleWrapper}>
					<BackButton
						size="large"
						color="#000000"
						backgroundColor="#ffffff"
						borderColor="#F5F5F5"
					/>
					<Text style={styles.headerTitleText}>Job Details</Text>
				</View>
				<View style={styles.headerActionButtonsWrapper}>
					<View
						style={[
							styles.headerActionButtonContainer,
							styles.statusTabContainer
						]}
					>
						<Text
							style={[
								styles.headerActionButtonText,
								styles.statusTabText
							]}
						>
							In progress
						</Text>
					</View>
					<TouchableOpacity
						style={[
							styles.headerActionButtonContainer,
							styles.deleteButtonContainer
						]}
					>
						<Image
							source={require("../../../../../assets/icons/delete3.svg")}
							style={styles.deleteButtonIcon}
							contentFit="contain"
						/>
						<Text
							style={[
								styles.headerActionButtonText,
								styles.deleteButtonText
							]}
						>
							Delete
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.bodyContainer}>
				<View style={styles.jobDetailsCard}>
					<Text style={styles.jobTitleText}>
						Car wash service needed
					</Text>
					<View style={styles.jobDateTimeWrapper}>
						<View style={styles.jobDateTimeTextIconWrapper}>
							<Image
								source={require("../../../../../assets/icons/user.svg")}
								style={styles.jobDateTimeTextIcon}
								contentFit="contain"
							/>
							<Text style={styles.sectionDescriptionText}>
								John Doe
							</Text>
						</View>
						<View style={styles.circularSeparator} />
						<View style={styles.jobDateTimeTextIconWrapper}>
							<Image
								source={require("../../../../../assets/icons/date.svg")}
								style={styles.jobDateTimeTextIcon}
								contentFit="contain"
							/>
							<Text style={styles.sectionDescriptionText}>
								28, Oct 2024
							</Text>
						</View>
						<View style={styles.circularSeparator} />
						<View style={styles.jobDateTimeTextIconWrapper}>
							<Image
								source={require("../../../../../assets/icons/time.svg")}
								style={styles.jobDateTimeTextIcon}
								contentFit="contain"
							/>
							<Text style={styles.sectionDescriptionText}>
								10am to 1pm
							</Text>
						</View>
					</View>
					<View style={styles.budgetSection}>
						<Text style={styles.budgetTitleText}>Budget</Text>
						<Text style={styles.budgetPriceText}>$500</Text>
					</View>
					<Text style={styles.sectionTitleText}>Job Description</Text>
					<Text style={styles.sectionDescriptionText}>
						Lorem Ipsum is simply dummy text of the printing and
						typesetting industry. Lorem Ipsum has been the
						industry's standard dummy text ever since the 1500s,
						when an unknown printer took a galley of type and
						scrambled it to make a type specimen book. Lorem Ipsum
						is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard
						dummy text ever since the 1500s, when an unknown printer
						took a galley of type and scrambled it to make a type
						specimen book.
					</Text>
					<Text style={styles.sectionTitleText}>Location</Text>
					<Text style={styles.sectionDescriptionText}>
						Overlook Avenue, Belleville, NJ, USA
					</Text>
					<Image
						source={require("../../../../../assets/images/map3.png")}
						style={styles.mapView}
						contentFit="cover"
					/>
					<Text style={styles.sectionTitleText}>Gallery</Text>
					<View style={styles.galleryImagesWrapper}>
						<TouchableOpacity
							style={styles.galleryImageItemContainer}
							onPress={handleViewImage}
						>
							<Image
								source={require("../../../../../assets/images/background1.png")}
								style={styles.galleryImage}
								contentFit="cover"
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.galleryImageItemContainer}
							onPress={handleViewImage}
						>
							<Image
								source={require("../../../../../assets/images/background2.png")}
								style={styles.galleryImage}
								contentFit="cover"
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.galleryImageItemContainer}
							onPress={handleViewImage}
						>
							<Image
								source={require("../../../../../assets/images/background3.png")}
								style={styles.galleryImage}
								contentFit="cover"
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.galleryImageItemContainer}
							onPress={handleViewImage}
						>
							<ImageBackground
								source={require("../../../../../assets/images/background4.png")}
								style={styles.galleryImage}
								contentFit="cover"
							>
								<View style={styles.seeMoreButton}>
									<Text style={styles.seeMoreButtonText}>
										see more
									</Text>
								</View>
							</ImageBackground>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.vendorOffersCard}>
					<Text style={styles.offersTitleText}>
						Offers by vendors
					</Text>
					<View style={styles.offerCardsWrapper}>
						{offers.map(
							(offer, index): React.ReactElement | null => {
								return (
									<OfferCard
										size="small"
										width="full"
										JobId={offer.job_id}
										vendorId={offer.vendor_id}
										vendorName={offer.vendorName}
										vendorImage={offer.vendorImage}
										vendorJobsCompleted={
											offer.vendorJobsCompleted
										}
										ratings={offer.ratings}
										reviews={offer.reviews}
										amount={offer.amount}
										location={offer.location}
										mode="web"
										key={index}
									/>
								)
							}
						)}
					</View>
					<OffersPopup job_id={`${id}`} mode="web" />
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "column",
		gap: 25
	},
	headerContainer: {
		height: 100,
		width: "100%",
		borderRadius: 8.5,
		backgroundColor: "white",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20
	},
	headerTitleWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 25
	},
	headerTitleText: {
		fontSize: 25,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary,
		textTransform: "capitalize"
	},
	headerActionButtonsWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 15
	},
	headerActionButtonContainer: {
		height: 50,
		paddingHorizontal: 20,
		borderRadius: 6.5,
		alignItems: "center",
		justifyContent: "center"
	},
	headerActionButtonText: {
		fontSize: 15,
		fontFamily: "Roboto-Regular",
		textTransform: "capitalize"
	},
	statusTabContainer: {
		backgroundColor: "rgba(255, 193, 7, 0.1)"
	},
	statusTabText: {
		color: "rgba(255, 193, 7, 1)"
	},
	deleteButtonContainer: {
		backgroundColor: "rgba(220, 53, 69, 0.1)",
		flexDirection: "row",
		gap: 10
	},
	deleteButtonText: {
		color: "rgba(220, 53, 69, 1)"
	},
	deleteButtonIcon: {
		height: 15,
		width: 15
	},
	bodyContainer: {
		flexDirection: "row",
		gap: 10
	},
	jobDetailsCard: {
		flex: 1,
		flexShrink: 1,
		alignSelf: "flex-start",
		flexDirection: "column",
		borderRadius: 6.5,
		backgroundColor: "white",
		padding: 35,
		gap: 15
	},
	jobTitleText: {
		fontSize: 30,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary,
		textTransform: "capitalize",
		letterSpacing: 0.5
	},
	jobDateTimeWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 25
	},
	jobDateTimeTextIconWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 15
	},
	jobDateTimeTextIcon: {
		height: 16.5,
		width: 16.5
	},
	circularSeparator: {
		height: 7,
		width: 7,
		borderRadius: 5,
		backgroundColor: theme.colors.primary
	},
	sectionTitleText: {
		fontSize: 20,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary,
		textTransform: "capitalize",
		letterSpacing: 0.5
	},
	sectionDescriptionText: {
		fontSize: 16.5,
		fontFamily: "Roboto-Light",
		color: theme.colors.secondary,
		lineHeight: 27.5
	},
	budgetSection: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginVertical: 15
	},
	budgetTitleText: {
		fontSize: 30,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary
	},
	budgetPriceText: {
		fontSize: 35,
		fontFamily: "Roboto-Bold",
		color: theme.colors.primary
	},
	mapView: {
		height: 250,
		width: "100%",
		borderRadius: 12.5,
		overflow: "hidden",
		marginVertical: 10
	},
	galleryImagesWrapper: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
		gap: 10
	},
	galleryImageItemContainer: {
		height: 135,
		width: 165,
		borderRadius: 12.5,
		overflow: "hidden"
	},
	galleryImage: {
		height: "100%",
		width: "100%"
	},
	seeMoreButton: {
		height: "100%",
		width: "100%",
		backgroundColor: "rgba(255, 255, 255, 0.65)",
		alignItems: "center",
		justifyContent: "center"
	},
	seeMoreButtonText: {
		fontSize: 15,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary,
		textTransform: "uppercase"
	},
	vendorOffersCard: {
		flexShrink: 1,
		alignSelf: "flex-start",
		flexDirection: "column",
		alignItems: "center",
		gap: 35,
		width: 480,
		borderRadius: 6.5,
		backgroundColor: "white",
		padding: 25
	},
	offersTitleText: {
		fontSize: 22.5,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary,
		textTransform: "capitalize",
		letterSpacing: 0.5
	},
	offerCardsWrapper: {
		width: "90%",
		flexDirection: "column",
		gap: 10,
		alignItems: "center"
	}
})
