import { View, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useFonts } from "expo-font"
import Ratings from "../ratings/Ratings"
import { theme } from "../../utils/constants"
import { Review } from "../../utils/types"

interface ReviewCardProps {
	vendor_id: Review["vendor_id"]
	userName: Review["userName"]
	image: Review["image"]
	review: Review["review"]
	rating: Review["rating"]
	time: Review["time"]
	alignSelf: "flex-start" | "flex-end" | "center"
}

export default function ReviewCard({
	vendor_id,
	userName,
	image,
	review,
	rating,
	time,
	alignSelf
}: ReviewCardProps): React.ReactElement | null {
	const [fontsLoaded] = useFonts({
		"Roboto-Bold": require("../../assets/fonts/Roboto/Roboto Bold 700.ttf"),
		"Roboto-Regular": require("../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	return (
		<View style={[styles.cardContainer, { alignSelf: alignSelf }]}>
			<Image
				source={require("../../assets/images/profile2.png")}
				style={styles.profileImage}
				contentFit="cover"
			/>
			<View style={styles.reviewDetailsContainer}>
				{fontsLoaded && (
					<Text style={styles.userNameText}>{userName}</Text>
				)}
				{fontsLoaded && <Text style={styles.reviewText}>{review}</Text>}
				<Ratings ratings={rating} size={15} />
				{fontsLoaded && <Text style={styles.reviewText}>{time}</Text>}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	cardContainer: {
		width: "90%",
		borderRadius: 12.5,
		borderWidth: 1,
		borderColor: "#F4F5F8",
		padding: 15,
		flexDirection: "row",
		gap: 15
	},
	profileImage: {
		height: 50,
		width: 50,
		borderRadius: 25,
		overflow: "hidden"
	},
	reviewDetailsContainer: {
		flex: 1,
		flexDirection: "column",
		gap: 10
	},
	userNameText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Bold",
		color: theme.colors.secondary
	},
	reviewText: {
		fontSize: 8.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		letterSpacing: 0.5,
		lineHeight: 12.5
	}
})
