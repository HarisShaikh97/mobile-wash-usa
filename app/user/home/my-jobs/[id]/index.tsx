import { useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image, ImageBackground } from "expo-image"
import { useRouter, useLocalSearchParams } from "expo-router"
import HorizontalSeparator from "../../../../../components/horizontal-separator/HorizontalSeparator"
import OfferCard from "../../../../../components/offer-card/OfferCard"
import { theme } from "../../../../../utils/constants"
import { Offer } from "../../../../../utils/types"

export default function Page(): React.ReactElement | null {
	// Using useLocalSearchParams to get the id from the URL
	const { id } = useLocalSearchParams()

	// Using useRouter hook to navigate
	const router = useRouter()

	const offers: Offer[] = [
		{
			job_id: 1,
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
			job_id: 2,
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
			job_id: 3,
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
			job_id: 4,
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
			job_id: 5,
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

	// Memoized function to handle viewing job images
	const handleViewImage = useCallback((): void => {
		// Navigate to the job images page with the current job's id.
		router.navigate(`/user/job-images/${id}`)
	}, [router, id])

	return (
		// Container for the entire job details
		<View style={styles.bodyContainer}>
			{/* Section for the job title */}
			<View style={styles.jobTitleSection}>
				{/* Job title text */}
				<Text
					style={styles.titleText}
					numberOfLines={2}
					ellipsizeMode="tail"
				>
					Car Wash Service Needed
				</Text>
				{/* Wrapper for job date and time */}
				<View style={styles.jobDateTimeWrapper}>
					{/* Wrapper for user icon and name */}
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
					{/* Circular separator */}
					<View style={styles.circularSeparator} />
					{/* Wrapper for date icon and text */}
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
					{/* Circular separator */}
					<View style={styles.circularSeparator} />
					{/* Wrapper for time icon and text */}
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
			</View>
			{/* Horizontal separator */}
			<HorizontalSeparator color="#F5F5F5" />
			{/* Section for the job budget */}
			<View style={styles.budgetSection}>
				<Text style={styles.budgetTitleText}>Budget</Text>
				<Text style={styles.budgetPriceText}>$500</Text>
			</View>
			{/* Horizontal separator */}
			<HorizontalSeparator color="#F5F5F5" />
			{/* Section for the job description */}
			<View style={styles.sectionContainer}>
				<Text style={styles.sectionTitleText}>Job Description</Text>
				<Text style={styles.sectionDescriptionText}>
					Lorem Ipsum is simply dummy text of the printing and
					typesetting industry. Lorem Ipsum has been the industry's
					standard dummy text ever since the 1500s, when an unknown
					printer took a galley of type and scrambled it to make a
					type specimen book. Lorem Ipsum is simply dummy text of the
					printing and typesetting industry. Lorem Ipsum has been the
					industry's standard dummy text ever since the 1500s, when an
					unknown printer took a galley of type and scrambled it to
					make a type specimen book.
				</Text>
			</View>
			{/* Horizontal separator */}
			<HorizontalSeparator color="#F5F5F5" />
			{/* Section for the job location */}
			<View style={styles.sectionContainer}>
				<Text style={styles.sectionTitleText}>Location</Text>
				{/* Wrapper for the map and location text */}
				<View style={styles.mapViewWrapper}>
					<Text style={styles.locationText}>
						Overlook Avenue, Belleville, NJ, USA
					</Text>
					<Image
						source={require("../../../../../assets/images/map.png")}
						style={styles.mapView}
						contentFit="cover"
					/>
				</View>
			</View>
			{/* Section for the job gallery */}
			<View style={styles.gallerySection}>
				<Text style={styles.galleryTitleText}>Gallery</Text>
				{/* Wrapper for the gallery images */}
				<View style={styles.galleryImagesWrapper}>
					{/* Gallery image item */}
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
					{/* Gallery image item */}
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
					{/* Gallery image item */}
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
					{/* Gallery image item */}
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
			{/* Horizontal separator */}
			<HorizontalSeparator color="#F5F5F5" />
			{/* Section for the job offers */}
			<View style={styles.offersSection}>
				<Text style={styles.offersTitleText}>Offers By Vendors</Text>
				{/* Wrapper for the offer cards */}
				<View style={styles.offerCardsWrapper}>
					{/* Mapping through the offers and rendering the offer card */}
					{offers.map((offer, index): React.ReactElement | null => {
						return (
							<OfferCard
								size="small"
								width="full"
								JobId={offer.job_id}
								vendorId={offer.vendor_id}
								vendorName={offer.vendorName}
								vendorImage={offer.vendorImage}
								vendorJobsCompleted={offer.vendorJobsCompleted}
								ratings={offer.ratings}
								reviews={offer.reviews}
								amount={offer.amount}
								location={offer.location}
								mode="app"
								key={index}
							/>
						)
					})}
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	bodyContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 22.5
	},
	jobTitleSection: {
		width: "100%",
		flexDirection: "column",
		gap: 15
	},
	titleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		width: 235,
		lineHeight: 30
	},
	jobDateTimeWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 15
	},
	jobDateTimeTextIconWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5
	},
	jobDateTimeTextIcon: {
		height: 13.5,
		width: 13.5
	},
	circularSeparator: {
		height: 4,
		width: 4,
		borderRadius: 2,
		backgroundColor: theme.colors.primary
	},
	budgetSection: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	budgetTitleText: {
		fontSize: 22.5,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary
	},
	budgetPriceText: {
		fontSize: 22.5,
		fontFamily: "Roboto-Bold",
		color: theme.colors.primary
	},
	sectionContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 10
	},
	sectionTitleText: {
		fontSize: 17.5,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary
	},
	sectionDescriptionText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		lineHeight: 17.5
	},
	mapViewWrapper: {
		width: "100%",
		flexDirection: "column",
		gap: 5
	},
	locationText: {
		fontSize: 11.5,
		fontFamily: "Roboto-Regular",
		color: "#524B6B"
	},
	mapView: {
		height: 150,
		width: "100%",
		borderRadius: 10,
		overflow: "hidden"
	},
	gallerySection: {
		width: "100%",
		flexDirection: "column",
		gap: 7.5
	},
	galleryTitleText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary
	},
	galleryImagesWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	galleryImageItemContainer: {
		height: 85,
		width: "24%",
		borderRadius: 7.5,
		overflow: "hidden"
	},
	galleryImage: {
		height: "100%",
		width: "100%"
	},
	seeMoreButton: {
		height: "100%",
		width: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.65)",
		alignItems: "center",
		justifyContent: "center"
	},
	seeMoreButtonText: {
		fontSize: 10,
		fontFamily: "Roboto-Medium",
		color: "white",
		textTransform: "uppercase"
	},
	offersSection: {
		width: "100%",
		flexDirection: "column",
		gap: 15
	},
	offersTitleText: {
		fontSize: 22.5,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary
	},
	offerCardsWrapper: {
		width: "100%",
		flexDirection: "column",
		gap: 10
	}
})
