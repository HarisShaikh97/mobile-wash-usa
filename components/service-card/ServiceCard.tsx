import {
	View,
	TouchableOpacity,
	Text,
	ImageSourcePropType,
	StyleSheet
} from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { theme } from "../../utils/constants"

// Interface for the props of the component
interface ServiceCardProps {
	title: string
	image: ImageSourcePropType
	mode: "web" | "app"
}

export default function ServiceCard({
	title,
	image,
	mode
}: ServiceCardProps): React.ReactElement | null {
	// Initialize the router instance for navigation
	const router = useRouter()

	return (
		// Touchable card container with conditional styling based on mode
		<TouchableOpacity
			style={[
				styles.cardContainer,
				mode === "app"
					? styles.cardContainerApp
					: styles.cardContainerWeb
			]}
			onPress={() => {
				router.navigate("/user/add-job")
			}}
		>
			{/* Background image with cover fit */}
			<Image source={image} style={styles.bgImage} contentFit="cover" />
			{/* Overlay container with semi-transparent background */}
			<View style={styles.bodyContainer}>
				{/* Text container with conditional styling based on mode */}
				<View
					style={[
						styles.textContainer,
						mode === "app"
							? styles.textContainerApp
							: styles.textContainerWeb
					]}
				>
					{/* Title text with conditional styling based on mode */}
					<Text
						style={[
							styles.titleText,
							mode === "app"
								? styles.titleTextApp
								: styles.titleTextWeb
						]}
					>
						{title}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	cardContainer: {
		overflow: "hidden",
		position: "relative"
	},
	cardContainerApp: {
		height: 275,
		width: 225,
		borderRadius: 15
	},
	cardContainerWeb: {
		flex: 1,
		height: 350,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15
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
		width: "100%",
		backgroundColor: theme.colors.primary,
		borderTopRightRadius: 15,
		borderTopLeftRadius: 15
	},
	textContainerApp: {
		height: 65,
		paddingHorizontal: 20,
		paddingTop: 12.5
	},
	textContainerWeb: {
		height: 85,
		alignItems: "center",
		justifyContent: "center"
	},
	titleText: {
		fontFamily: "Montserrat-SemiBold",
		color: "white"
	},
	titleTextApp: {
		fontSize: 15
	},
	titleTextWeb: {
		fontSize: 17.5
	}
})
