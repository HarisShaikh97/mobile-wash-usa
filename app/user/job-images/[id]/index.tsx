import { useState, useCallback, useMemo } from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useLocalSearchParams } from "expo-router"
import AntDesign from "@expo/vector-icons/AntDesign"
import BackButton from "../../../../components/back-button/BackButton"
import { backgroundImages } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// Get the job ID from URL params
	const { id } = useLocalSearchParams()

	// State to track the index of currently displayed image
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)

	// Memoized function to handle transitioning to next image in the carousel
	const handleNextImage = useCallback((): void => {
		// Increments index and wraps around using modulo of array length
		setCurrentImageIndex(
			(prevIndex) => (prevIndex + 1) % backgroundImages.length
		)
	}, [setCurrentImageIndex, backgroundImages])

	// Memoized function to handle transitioning to previous image in the carousel
	const handlePreviousImage = useCallback((): void => {
		// Decrements index and wraps around using modulo, adding length to handle negative values
		setCurrentImageIndex(
			(prevIndex) =>
				(prevIndex - 1 + backgroundImages.length) %
				backgroundImages.length
		)
	}, [setCurrentImageIndex, backgroundImages])

	// Memoizes the current image to prevent unnecessary re-renders
	const currentImage = useMemo(
		// Returns image at current index from background images array
		() => backgroundImages[currentImageIndex],
		[currentImageIndex, currentImageIndex]
	)

	return (
		// Main container for the image viewer
		<View style={styles.container}>
			{/* Header with back button */}
			<View style={styles.headerContainer}>
				<BackButton
					size="small"
					color="#000000"
					backgroundColor="#FFFFFF"
					borderColor="transparent"
				/>
			</View>
			{/* Full screen background image */}
			<Image
				source={currentImage}
				style={styles.background}
				contentFit="cover"
			/>
			{/* Previous image button */}
			<TouchableOpacity
				style={[styles.actionButton, styles.previousButton]}
				onPress={handlePreviousImage}
			>
				<AntDesign name="arrowleft" size={17.5} color="black" />
			</TouchableOpacity>
			{/* Next image button */}
			<TouchableOpacity
				style={[styles.actionButton, styles.nextButton]}
				onPress={handleNextImage}
			>
				<AntDesign name="arrowright" size={17.5} color="black" />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative"
	},
	headerContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		paddingVertical: 35,
		paddingHorizontal: 25,
		zIndex: 50
	},
	background: {
		position: "absolute",
		top: 0,
		left: 0,
		height: "100%",
		width: "100%"
	},
	actionButton: {
		height: 80,
		width: 40,
		backgroundColor: "white",
		position: "absolute",
		top: "50%",
		alignItems: "center",
		justifyContent: "center"
	},
	previousButton: {
		borderTopRightRadius: 15,
		borderBottomRightRadius: 15,
		left: 0
	},
	nextButton: {
		borderTopLeftRadius: 15,
		borderBottomLeftRadius: 15,
		right: 0
	}
})
