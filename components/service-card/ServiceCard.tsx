import {
	View,
	TouchableOpacity,
	Text,
	ImageSourcePropType,
	StyleSheet
} from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { useFonts } from "expo-font"
import { theme } from "../../utils/constants"

interface ServiceCardProps {
	title: string
	image: ImageSourcePropType
}

export default function ServiceCard({
	title,
	image
}: ServiceCardProps): React.ReactElement | null {
	const router = useRouter()

	const [fontsLoaded] = useFonts({
		"Montserrat-SemiBold": require("../../assets/fonts/Montserrat/Montserrat SemiBold 600.ttf")
	})

	return (
		<TouchableOpacity
			style={styles.cardContainer}
			onPress={() => {
				router.navigate("/add-job")
			}}
		>
			<Image source={image} style={styles.bgImage} contentFit="cover" />
			<View style={styles.bodyContainer}>
				<View style={styles.textContainer}>
					{fontsLoaded && (
						<Text style={styles.titleText}>{title}</Text>
					)}
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	cardContainer: {
		height: 275,
		width: 225,
		borderRadius: 15,
		overflow: "hidden",
		position: "relative"
	},
	bgImage: {
		flex: 1
	},
	bodyContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		backgroundColor: "rgba(26, 61, 124, 0.35)",
		height: "100%",
		width: "100%",
		justifyContent: "flex-end"
	},
	textContainer: {
		height: 65,
		width: "100%",
		backgroundColor: theme.colors.primary,
		borderTopRightRadius: 15,
		borderTopLeftRadius: 15,
		paddingHorizontal: 20,
		paddingTop: 12.5
	},
	titleText: {
		fontSize: 15,
		fontFamily: "Montserrat-SemiBold",
		color: "white"
	}
})
