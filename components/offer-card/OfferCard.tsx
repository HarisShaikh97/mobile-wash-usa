import { useCallback } from "react"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import Ratings from "../ratings/Ratings"
import { theme } from "../../utils/constants"
import { Offer } from "../../utils/types"

interface OfferCardProps {
	size: "small" | "large"
	JobId: Offer["job_id"]
	vendorId: Offer["vendor_id"]
	vendorName: Offer["vendorName"]
	vendorImage: Offer["vendorImage"]
	vendorJobsCompleted: Offer["vendorJobsCompleted"]
	ratings: Offer["ratings"]
	reviews: Offer["reviews"]
	amount: Offer["amount"]
	location: Offer["location"]
}

export default function OfferCard({
	size,
	JobId,
	vendorId,
	vendorName,
	vendorImage,
	vendorJobsCompleted,
	ratings,
	reviews,
	amount,
	location
}: OfferCardProps): React.ReactElement | null {
	const router = useRouter()

	const handleSendMessage = useCallback((): void => {
		router.navigate(`/user/chat/${vendorId}`)
	}, [router])

	const handleAcceptOffer = useCallback((): void => {
		router.navigate(`/user/offer-accepted/${JobId}`)
	}, [router])

	return (
		<View style={styles.cardContainer}>
			<View style={styles.horizontalWrapper}>
				<View style={styles.vendorProfileDetailsContainer}>
					<View style={styles.vendorProfileImageWrapper}>
						<Image
							source={vendorImage}
							style={styles.vendorProfileImage}
							contentFit="cover"
						/>
					</View>
					<Text
						style={styles.vendorNameText}
						numberOfLines={2}
						ellipsizeMode="tail"
					>
						{vendorName}
					</Text>
				</View>
				<TouchableOpacity
					style={styles.viewProfileButton}
					onPress={() => {
						router.navigate(`/user/vendor-profile/${vendorId}`)
					}}
				>
					<Text style={styles.viewProfileButtonText}>
						View Profile
					</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.horizontalWrapper}>
				<Text style={styles.sectionTitleText}>Bid Amount</Text>
				<Text style={styles.amountText}>${amount}</Text>
			</View>
			<View style={styles.verticalWrapper}>
				<Text style={styles.sectionTitleText}>About The Vendor</Text>
				<View style={styles.ratingsReviewsWrapper}>
					<Ratings ratings={ratings} size={16.5} />
					<Text style={styles.sectionDescriptionText}>
						{ratings} Of {reviews} Reviews
					</Text>
				</View>
			</View>
			{size === "large" && (
				<View style={styles.horizontalWrapper}>
					<View style={styles.jobsCompletedAndLocationContainer}>
						<Text
							style={styles.sectionTitleText}
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							Location
						</Text>
						<Text
							style={styles.sectionDescriptionText}
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							{location}
						</Text>
					</View>
					<View style={styles.jobsCompletedAndLocationContainer}>
						<Text
							style={styles.sectionTitleText}
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							Jobs Completed
						</Text>
						<Text
							style={styles.sectionDescriptionText}
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							{vendorJobsCompleted} Jobs Completed
						</Text>
					</View>
				</View>
			)}
			<View style={styles.horizontalWrapper}>
				<TouchableOpacity
					style={[
						styles.actionButtonContainer,
						styles.sendMessageButton
					]}
					onPress={handleSendMessage}
				>
					<Text
						style={[
							styles.actionButtonText,
							styles.sendMessageButtonText
						]}
					>
						Send Message
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.actionButtonContainer,
						styles.acceptOfferButton
					]}
					onPress={handleAcceptOffer}
				>
					<Text
						style={[
							styles.actionButtonText,
							styles.acceptOfferButtonText
						]}
					>
						Accept Offer
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	cardContainer: {
		width: "100%",
		borderRadius: 15,
		borderWidth: 1,
		borderColor: "#F5F5F5",
		padding: 15,
		flexDirection: "column",
		gap: 20
	},
	horizontalWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	verticalWrapper: {
		flexDirection: "column",
		gap: 7.5
	},
	vendorProfileDetailsContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10
	},
	vendorProfileImageWrapper: {
		height: 58.5,
		width: 58.5,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: theme.colors.secondary,
		alignItems: "center",
		justifyContent: "center"
	},
	vendorProfileImage: {
		height: 52.5,
		width: 52.5,
		borderRadius: 12.5
	},
	vendorNameText: {
		fontSize: 18.5,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary,
		width: 100,
		lineHeight: 20
	},
	viewProfileButton: {
		height: 30,
		width: 115,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: theme.colors.primary,
		alignItems: "center",
		justifyContent: "center"
	},
	viewProfileButtonText: {
		fontSize: 10,
		fontFamily: "Roboto-Medium",
		color: theme.colors.primary
	},
	sectionTitleText: {
		fontSize: 16.5,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary
	},
	sectionDescriptionText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	amountText: {
		fontSize: 22.5,
		fontFamily: "Roboto-Bold",
		color: theme.colors.primary
	},
	ratingsReviewsWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5
	},
	actionButtonContainer: {
		height: 50,
		width: "48.5%",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center"
	},
	actionButtonText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Medium"
	},
	sendMessageButton: {
		borderWidth: 1,
		borderColor: theme.colors.primary
	},
	sendMessageButtonText: {
		color: theme.colors.primary
	},
	acceptOfferButton: {
		backgroundColor: theme.colors.primary
	},
	acceptOfferButtonText: {
		color: "white"
	},
	jobsCompletedAndLocationContainer: {
		width: "48.5%",
		flexDirection: "column",
		gap: 5
	}
})
