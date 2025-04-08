import { useState, useCallback, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { useDispatch } from "react-redux"
import { Region, Details } from "react-native-maps"
import Map from "../../../../components/map/Map"
import BackButton from "../../../../components/back-button/BackButton"
import FormButton from "../../../../components/form-button/FormButton"
import { useLocation } from "../../../../hooks/useLocation"
import { addJobLocation } from "../../../../features/add-job/addJobSlice"

// Initial region for the map
const INITIAL_REGION = {
	latitude: 37.78825,
	longitude: -122.4324,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421
}

export default function Page(): React.ReactElement | null {
	// Initializing the router instance for navigation
	const router = useRouter()

	// Initializing the dispatch function for Redux
	const dispatch = useDispatch()

	// Hook to get the location
	const location = useLocation()

	// State to hold the selected location
	const [selectedLocation, setSelectedLocation] =
		useState<Region>(INITIAL_REGION)

	// Memoized function to handle region change
	const onRegionChange = useCallback(
		(region: Region, details: Details): void => {
			// If the change is a gesture, set the selected location
			if (details.isGesture) {
				setSelectedLocation(region)
			}
		},
		[setSelectedLocation]
	)

	// Function to handle confirm location
	const handleConfirm = useCallback((): void => {
		// Dispatching the addJobNeeds action with the location(latitude and longitude)
		dispatch(
			addJobLocation({
				longitude: selectedLocation.longitude,
				latitude: selectedLocation.latitude
			})
		)

		// Navigate to the review page
		router.navigate("/user/add-job/review")
	}, [router, dispatch, selectedLocation])

	// Effect to update selected location when location changes
	useEffect((): void => {
		// If location is available, update selected location
		if (location) {
			setSelectedLocation({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421
			})
		}
	}, [setSelectedLocation, location])

	return (
		// Main container wrapper
		<View style={styles.wrapper}>
			{/* Back button container positioned at top left */}
			<View style={styles.backButtonWrapper}>
				<BackButton
					size="small"
					color="#000000"
					backgroundColor="#FFFFFF"
					borderColor="#F5F5F5"
				/>
			</View>
			{/* Custom map marker image centered on screen */}
			<Image
				source={require("../../../../assets/icons/map-marker.svg")}
				style={styles.mapMarker}
				contentFit="contain"
			/>
			{/* Confirm button container positioned at bottom */}
			<View style={styles.formButtonWrapper}>
				<FormButton
					length="full"
					colorTheme="dark"
					isLoading={false}
					title="Confirm"
					onPress={handleConfirm}
				/>
			</View>
			{/* Google Maps component with custom configuration */}
			<Map
				initialRegion={INITIAL_REGION}
				selectedLocation={selectedLocation}
				onRegionChange={onRegionChange}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: "white",
		position: "relative"
	},
	mapView: {
		flex: 1
	},
	backButtonWrapper: {
		position: "absolute",
		top: 35,
		left: 25,
		zIndex: 10
	},
	mapMarker: {
		height: 35,
		width: 35,
		borderRadius: 17.5,
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: [{ translateX: -17.5 }, { translateY: -25 }],
		zIndex: 10,
		backgroundColor: "rgba(47, 116, 250, 0.5)"
	},
	formButtonWrapper: {
		width: "100%",
		position: "absolute",
		bottom: 35,
		paddingHorizontal: 25,
		alignItems: "center",
		zIndex: 10
	}
})
