import { ScrollView, View, Text, StyleSheet } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { useFonts } from "expo-font"
import BackButton from "../../../../../components/back-button/BackButton"
import NotificationButton from "../../../../../components/notification-button/NotificationButton"
import OfferCard from "../../../../../components/offer-card/OfferCard"
import { theme } from "../../../../../utils/constants"
import { Offer } from "../../../../../utils/types"

export default function Page(): React.ReactElement | null {
	const { id } = useLocalSearchParams()

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../../../../assets/fonts/Montserrat/Montserrat Bold 700.ttf")
	})

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
		},
		{
			job_id: "6",
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
			job_id: "7",
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

	return (
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<BackButton
						color={theme.colors.secondary}
						backgroundColor="transparent"
						borderColor="#F5F5F5"
					/>
					<NotificationButton theme="dark" />
				</View>
				<View style={styles.bodyContainer}>
					{fontsLoaded && (
						<Text style={styles.titleText}>
							You Have {offers.length} Offers
						</Text>
					)}
					<View style={styles.offerCardsWrapper}>
						{offers.map(
							(
								offer: Offer,
								index: number
							): React.ReactElement | null => {
								return (
									<OfferCard
										size="large"
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
										key={index}
									/>
								)
							}
						)}
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
		paddingHorizontal: 25
	},
	container: {
		flexDirection: "column",
		paddingBottom: 125
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
		gap: 22.5
	},
	titleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		width: 150,
		lineHeight: 30
	},
	offerCardsWrapper: {
		width: "100%",
		flexDirection: "column",
		gap: 10
	}
})
