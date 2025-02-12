import { useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image, ImageBackground } from "expo-image"
import { useRouter, useLocalSearchParams } from "expo-router"
import BackButton from "../../../../../components/back-button/BackButton"
import { theme } from "../../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// Get job ID from URL params
	const { id } = useLocalSearchParams()

	// Initialize router object for navigation
	const router = useRouter()

	// Memoized callback for marking job as completed
	const handleMarkCompleted = useCallback((): void => {
		router.navigate(`/vendor/job-completion-verification/${id}`) // Navigate to job completion verification page
	}, [router, id])

	// Memoized callback for viewing job images
	const handleViewImage = useCallback((): void => {
		router.navigate(`/vendor/job-images/${id}`) // Navigate to job images page
	}, [router, id])

	return (
		<View style={styles.container}>
			{/* Header section with back button and action button */}
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
				{/* Mark as completed button */}
				<TouchableOpacity
					style={styles.headerActionButtonContainer}
					onPress={handleMarkCompleted}
				>
					<Text style={styles.headerActionButtonText}>
						Mark as completed
					</Text>
				</TouchableOpacity>
			</View>
			{/* Body content container */}
			<View style={styles.bodyContainer}>
				{/* Job details card section */}
				<View style={styles.jobDetailsCard}>
					{/* Job title */}
					<Text style={styles.jobTitleText}>
						Car wash service needed
					</Text>
					{/* Job metadata section (user, date, time) */}
					<View style={styles.jobDateTimeWrapper}>
						{/* User info */}
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
						{/* Date info */}
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
						{/* Time info */}
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
					{/* Budget section */}
					<View style={styles.budgetSection}>
						<Text style={styles.budgetTitleText}>Budget</Text>
						<Text style={styles.budgetPriceText}>$500</Text>
					</View>
					{/* Job description section */}
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
					{/* Gallery section */}
					<Text style={styles.sectionTitleText}>Gallery</Text>
					<View style={styles.galleryImagesWrapper}>
						{/* Gallery image 1 */}
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
						{/* Gallery image 2 */}
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
						{/* Gallery image 3 */}
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
						{/* Gallery image 4 with see more overlay */}
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
				{/* Location card section */}
				<View style={styles.locationCard}>
					<Text style={styles.sectionTitleText}>Location</Text>
					<Text style={styles.sectionDescriptionText}>
						Overlook Avenue, Belleville, NJ, USA
					</Text>
					<Image
						source={require("../../../../../assets/images/map3.png")}
						style={styles.mapView}
						contentFit="cover"
					/>
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
	headerActionButtonContainer: {
		height: 50,
		paddingHorizontal: 20,
		borderRadius: 6.5,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.colors.primary
	},
	headerActionButtonText: {
		fontSize: 15,
		fontFamily: "Roboto-Regular",
		textTransform: "capitalize",
		color: "white"
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
	locationCard: {
		flexShrink: 1,
		alignSelf: "flex-start",
		flexDirection: "column",
		gap: 5,
		width: 480,
		borderRadius: 6.5,
		backgroundColor: "white",
		padding: 25
	}
})
