import { StyleSheet } from "react-native"
import MapView, { Region, Details } from "react-native-maps"

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
		<MapView
			style={styles.mapView}
			initialRegion={initialRegion}
			region={selectedLocation}
			onRegionChangeComplete={onRegionChange}
			provider="google"
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
