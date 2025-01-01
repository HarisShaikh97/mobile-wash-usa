import { View, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
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
	mode: "web" | "app"
}

export default function ReviewCard({
	vendor_id,
	userName,
	image,
	review,
	rating,
	time,
	alignSelf,
	mode
}: ReviewCardProps): React.ReactElement | null {
	return (
		<View
			style={[
				styles.cardContainer,
				mode === "app"
					? styles.cardContainerApp
					: styles.cardContainerWeb,
				{ alignSelf: alignSelf }
			]}
		>
			<Image
				source={image}
				style={styles.profileImage}
				contentFit="cover"
			/>
			<View style={styles.reviewDetailsContainer}>
				<Text style={styles.userNameText}>{userName}</Text>
				<Text style={styles.reviewText}>{review}</Text>
				<Ratings ratings={rating} size={15} />
				<Text style={styles.reviewText}>{time}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	cardContainer: {
		borderRadius: 12.5,
		borderWidth: 1,
		borderColor: "#F4F5F8",
		padding: 15,
		flexDirection: "row",
		gap: 15
	},
	cardContainerApp: {
		width: "90%"
	},
	cardContainerWeb: {
		width: "45%"
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
