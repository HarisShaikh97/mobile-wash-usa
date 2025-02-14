import { useState, useCallback, useMemo } from "react"
import { View, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useFocusEffect } from "expo-router"
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withDelay,
	withSequence,
	runOnJS
} from "react-native-reanimated"
import BackButton from "../back-button/BackButton"
import { backgroundImagesWeb } from "../../utils/constants"

export default function AddJobWebLayout({
	children
}: {
	children: React.ReactNode
}): React.ReactElement | null {
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0) // State variable to track the current image index
	const [nextImageIndex, setNextImageIndex] = useState<number>(1) // State variable to track the next image index

	// Shared value to control the opacity of the background image
	const opacity = useSharedValue<number>(1)

	// Memoized callback for updating the current and next image indices
	const updateCurrentImageIndex = useCallback((): void => {
		// Update the current image index by incrementing it by 1
		setCurrentImageIndex(
			(prevIndex) => (prevIndex + 1) % backgroundImagesWeb.length
		)
	}, [setCurrentImageIndex, backgroundImagesWeb])

	// Memoized callback for updating the next image index
	const updateNextImageIndex = useCallback((): void => {
		// Update the next image index by incrementing it by 1
		setNextImageIndex(
			(prevIndex) => (prevIndex + 1) % backgroundImagesWeb.length
		)
	}, [setNextImageIndex, backgroundImagesWeb])

	// Memoized callback for triggering the animation
	const triggerAnimation = useCallback((): void => {
		// Update the opacity of the background image with a sequence of timing and delay animations
		opacity.value = withSequence(
			withTiming(0, { duration: 500 }, (finished) => {
				// If the animation is finished, update the current image index
				if (finished) {
					runOnJS(updateCurrentImageIndex)()
				}
			}),
			withDelay(
				100,
				withTiming(1, { duration: 50 }, (finished) => {
					// If the animation is finished, update the next image index
					if (finished) {
						runOnJS(updateNextImageIndex)()
					}
				})
			)
		)
	}, [opacity, updateCurrentImageIndex, updateNextImageIndex])

	// Memoized animated style for the background image
	const bgImage = useAnimatedStyle(
		() => ({
			opacity: opacity.value
		}),
		[opacity]
	)

	// Effect to trigger the animation when the component is focused
	useFocusEffect(
		// Memoized callback for triggering the animation when the component is focused
		useCallback((): (() => void) => {
			// Trigger the animation every 2.5 seconds
			const intervalId = setInterval(triggerAnimation, 2500)

			// Clean up the interval when the component unmounts
			return (): void => {
				clearInterval(intervalId)
				opacity.value = 1
			}
		}, [triggerAnimation, opacity])
	)

	// Memoized current background image based on the current index
	const currentImage = useMemo(
		() => backgroundImagesWeb[currentImageIndex],
		[currentImageIndex, backgroundImagesWeb]
	)

	// Memoized next background image based on the next index
	const nextImage = useMemo(
		() => backgroundImagesWeb[nextImageIndex],
		[nextImageIndex, backgroundImagesWeb]
	)
	return (
		// Main container for the entire layout
		<View style={styles.container}>
			{/* Back button component with custom styling */}
			<BackButton
				size="large"
				color="#000000"
				backgroundColor="#ffffff"
				borderColor="transparent"
			/>
			{/* Container for the main content area */}
			<View style={styles.bodyContainer}>
				{/* Container for the animated image carousel */}
				<View style={styles.animatedCarousalContainer}>
					{/* Current background image with animation */}
					<Animated.Image
						source={currentImage}
						style={[
							styles.background,
							styles.currentBackgroundImage,
							bgImage
						]}
						resizeMode="cover"
					/>
					{/* Next background image that will be shown after transition */}
					<Image
						source={nextImage}
						style={[styles.background, styles.nextBackgroundImage]}
						contentFit="cover"
					/>
					{/* Container for carousel indicator dots */}
					<View style={styles.indicatorContainer}>
						{backgroundImagesWeb.map(
							(_, index): React.ReactElement | null => {
								return (
									// Individual indicator dot
									<View
										style={[
											styles.indicator,
											{
												backgroundColor:
													currentImageIndex === index
														? "transparent"
														: "white"
											}
										]}
										key={index}
									/>
								)
							}
						)}
					</View>
				</View>
				{/* Container for the form content passed as children */}
				<View style={styles.formContainer}>{children}</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F3F8FE",
		flexDirection: "column",
		padding: 35
	},
	bodyContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 15,
		padding: 35
	},
	animatedCarousalContainer: {
		height: "100%",
		width: "40%",
		borderRadius: 15,
		overflow: "hidden",
		position: "relative"
	},
	background: {
		position: "absolute",
		top: 0,
		left: 0,
		height: "100%",
		width: "100%"
	},
	currentBackgroundImage: {
		zIndex: 10
	},
	nextBackgroundImage: {
		zIndex: -10
	},
	indicatorContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 1,
		position: "absolute",
		bottom: 15,
		zIndex: 50
	},
	indicator: {
		width: 13.5,
		height: 13.5,
		borderRadius: 7.5,
		borderWidth: 1.75,
		borderColor: "white"
	},
	formContainer: {
		height: "100%",
		width: "37.5%",
		borderRadius: 15,
		backgroundColor: "white",
		padding: 25,
		alignItems: "center",
		justifyContent: "center"
	}
})
