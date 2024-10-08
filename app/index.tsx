import React, { useState, useEffect, useCallback, useMemo } from "react"
import { View, StyleSheet, ImageSourcePropType } from "react-native"
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withDelay,
	withSequence,
	runOnJS
} from "react-native-reanimated"

const backgroundImages: ImageSourcePropType[] = [
	require("../assets/images/background-1.png"),
	require("../assets/images/background-2.png"),
	require("../assets/images/background-3.png"),
	require("../assets/images/background-4.png")
]

export default function Page() {
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
	const [nextImageIndex, setNextImageIndex] = useState<number>(1)
	const opacity = useSharedValue<number>(1)

	const updateCurrentImageIndex = useCallback((): void => {
		setCurrentImageIndex(
			(prevIndex) => (prevIndex + 1) % backgroundImages.length
		)
	}, [])

	const updateNextImageIndex = useCallback((): void => {
		setNextImageIndex(
			(prevIndex) => (prevIndex + 1) % backgroundImages.length
		)
	}, [])

	const triggerAnimation = useCallback((): void => {
		opacity.value = withSequence(
			withTiming(0, { duration: 500 }, (finished) => {
				if (finished) {
					runOnJS(updateCurrentImageIndex)()
				}
			}),
			withDelay(
				100,
				withTiming(1, { duration: 50 }, (finished) => {
					if (finished) {
						runOnJS(updateNextImageIndex)()
					}
				})
			)
		)
	}, [opacity, updateCurrentImageIndex, updateNextImageIndex])

	const bgImage = useAnimatedStyle(
		() => ({
			opacity: opacity.value
		}),
		[opacity]
	)

	useEffect(() => {
		const intervalId = setInterval(triggerAnimation, 2500)
		return () => clearInterval(intervalId)
	}, [triggerAnimation])

	const currentImage = useMemo(
		() => backgroundImages[currentImageIndex],
		[currentImageIndex]
	)
	const nextImage = useMemo(
		() => backgroundImages[nextImageIndex],
		[nextImageIndex]
	)

	return (
		<View style={styles.container}>
			<Animated.Image
				source={currentImage}
				style={[
					styles.background,
					styles.currentBackgroundImage,
					bgImage
				]}
				resizeMode="cover"
			/>
			<Animated.Image
				source={nextImage}
				style={[styles.background, styles.nextBackgroundImage]}
				resizeMode="cover"
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
	overlay: {
		zIndex: 100
	}
})
