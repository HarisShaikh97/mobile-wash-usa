import { useState, useEffect } from "react"
import * as Location from "expo-location"

export const useLocation = (): Location.LocationObject | null => {
	// State to store user's current location
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null
	)

	// Retrieve user's current location
	useEffect(() => {
		;(async () => {
			// Check if location permissions are granted
			let { status } = await Location.requestForegroundPermissionsAsync()

			// If permissions are not granted, return
			if (status !== "granted") {
				return
			}

			// Get user's current location
			let location = await Location.getCurrentPositionAsync({})

			// Set location state
			setLocation(location)
		})()
	}, [Location, setLocation])

	// Return location state
	return location
}
