import { useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { theme } from "../../utils/constants"
import { Offer } from "../../utils/types"

// Interface for the props of the component
interface OffersPopupProps {
	job_id: Offer["job_id"]
	mode: "web" | "app"
}

export default function OffersPopup({
	job_id,
	mode
}: OffersPopupProps): React.ReactElement | null {
	// Initialize the router instance for navigation
	const router = useRouter()

	// Memoized callback for handling the see all action
	const handleSeeAll = useCallback((): void => {
		router.navigate(`/user/home/my-jobs/offers/${job_id}`) // Navigate to the offers page for the job
	}, [job_id, router])

	return (
		// Outer wrapper with conditional styling for app mode
		<View style={[styles.wrapper, mode === "app" && styles.wrapperApp]}>
			{/* Inner container with primary background and layout */}
			<View style={styles.container}>
				{/* Title text displaying "Offers" */}
				<Text style={styles.titleText}>Offers</Text>
				{/* Touchable "See All" button that navigates to offers page */}
				<TouchableOpacity onPress={handleSeeAll}>
					<Text style={styles.seeAllText}>See All</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		height: 65,
		width: 225,
		borderRadius: 10,
		backgroundColor: "rgba(47, 116, 250, 0.25)",
		alignItems: "center",
		justifyContent: "center"
	},
	wrapperApp: {
		position: "absolute",
		bottom: 125,
		left: "50%",
		transform: [{ translateX: -112.5 }],
		zIndex: 50
	},
	container: {
		height: 55,
		width: 215,
		borderRadius: 8.5,
		backgroundColor: theme.colors.primary,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 15
	},
	titleText: {
		fontSize: 15,
		fontFamily: "Montserrat-SemiBold",
		color: "white"
	},
	seeAllText: {
		fontSize: 11.5,
		fontFamily: "Montserrat-Medium",
		color: "white"
	}
})
