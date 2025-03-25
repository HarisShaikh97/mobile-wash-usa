import { StyleSheet } from "react-native"
import MapView, { Region, Details, PROVIDER_GOOGLE } from "react-native-maps"

// Interface for the props of the component
interface MapProps {
	initialRegion: Region
	selectedLocation: Region
	onRegionChange: (region: Region, details: Details) => void
}

export default function Map({
	initialRegion,
	selectedLocation,
	onRegionChange
}: MapProps): React.ReactElement | null {
	return (
		// Map component with Google Maps provider
		<MapView
			style={styles.mapView}
			initialRegion={initialRegion}
			region={selectedLocation}
			onRegionChangeComplete={onRegionChange}
			provider={PROVIDER_GOOGLE}
			scrollEnabled
			showsUserLocation
			showsMyLocationButton
			rotateEnabled={false}
			pitchEnabled={false}
		/>
	)
}

const styles = StyleSheet.create({
	mapView: {
		flex: 1
	}
})
