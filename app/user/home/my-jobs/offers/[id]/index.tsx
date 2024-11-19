import { View, Text, StyleSheet } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { useFonts } from "expo-font"
import OfferCard from "../../../../../../components/offer-card/OfferCard"
import { theme } from "../../../../../../utils/constants"
import { Offer } from "../../../../../../utils/types"

export default function Page(): React.ReactElement | null {
	const { id } = useLocalSearchParams()

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../../../../../assets/fonts/Montserrat/Montserrat Bold 700.ttf")
	})

	const offers: Offer[] = [
		{
			job_id: "1",
			vendor_id: "2",
			vendorName: "Michael Guzzi",
			vendorImage: require("../../../../../../assets/images/vendor-profile.png"),
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
			vendorImage: require("../../../../../../assets/images/vendor-profile.png"),
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
			vendorImage: require("../../../../../../assets/images/vendor-profile.png"),
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
			vendorImage: require("../../../../../../assets/images/vendor-profile.png"),
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
			vendorImage: require("../../../../../../assets/images/vendor-profile.png"),
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
			vendorImage: require("../../../../../../assets/images/vendor-profile.png"),
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
			vendorImage: require("../../../../../../assets/images/vendor-profile.png"),
			vendorJobsCompleted: 26,
			ratings: 4.5,
			reviews: 26,
			amount: 450,
			location: "California, USA"
		}
	]

	return (
		<View style={styles.bodyContainer}>
			{fontsLoaded && (
				<Text style={styles.titleText}>
					You Have {offers.length} Offers
				</Text>
			)}
			<View style={styles.offerCardsWrapper}>
				{offers.map((offer, index): React.ReactElement | null => {
					return (
						<OfferCard
							size="large"
							JobId={offer.job_id}
							vendorId={offer.vendor_id}
							vendorName={offer.vendorName}
							vendorImage={offer.vendorImage}
							vendorJobsCompleted={offer.vendorJobsCompleted}
							ratings={offer.ratings}
							reviews={offer.reviews}
							amount={offer.amount}
							location={offer.location}
							key={index}
						/>
					)
				})}
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
