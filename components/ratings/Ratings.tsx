import { View, StyleSheet } from "react-native"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Offer } from "../../utils/types"

interface RatingsProps {
	ratings: Offer["ratings"]
}

export default function Ratings({
	ratings
}: RatingsProps): React.ReactElement | null {
	return (
		<View style={styles.container}>
			<FontAwesome
				name={
					ratings > 0.5
						? "star"
						: ratings === 0
						? "star-o"
						: "star-half-o"
				}
				size={16.5}
				color="#FBBA1D"
			/>
			<FontAwesome
				name={
					ratings > 1.5
						? "star"
						: ratings <= 1
						? "star-o"
						: "star-half-o"
				}
				size={16.5}
				color="#FBBA1D"
			/>
			<FontAwesome
				name={
					ratings > 2.5
						? "star"
						: ratings <= 2
						? "star-o"
						: "star-half-o"
				}
				size={16.5}
				color="#FBBA1D"
			/>
			<FontAwesome
				name={
					ratings > 3.5
						? "star"
						: ratings <= 3
						? "star-o"
						: "star-half-o"
				}
				size={16.5}
				color="#FBBA1D"
			/>
			<FontAwesome
				name={
					ratings > 4.5
						? "star"
						: ratings <= 4
						? "star-o"
						: "star-half-o"
				}
				size={16.5}
				color="#FBBA1D"
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2.5
	}
})
