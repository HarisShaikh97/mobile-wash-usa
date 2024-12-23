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
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
	const [nextImageIndex, setNextImageIndex] = useState<number>(1)

	const opacity = useSharedValue<number>(1)

	const updateCurrentImageIndex = useCallback((): void => {
		setCurrentImageIndex(
			(prevIndex) => (prevIndex + 1) % backgroundImagesWeb.length
		)
	}, [])

	const updateNextImageIndex = useCallback((): void => {
		setNextImageIndex(
			(prevIndex) => (prevIndex + 1) % backgroundImagesWeb.length
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

	useFocusEffect(
		useCallback((): (() => void) => {
			const intervalId = setInterval(triggerAnimation, 2500)

			return (): void => {
				clearInterval(intervalId)
				opacity.value = 1
			}
		}, [triggerAnimation])
	)

	const currentImage = useMemo(
		() => backgroundImagesWeb[currentImageIndex],
		[currentImageIndex]
	)

	const nextImage = useMemo(
		() => backgroundImagesWeb[nextImageIndex],
		[nextImageIndex]
	)
	return (
		<View style={styles.container}>
			<BackButton
				size="large"
				color="#000000"
				backgroundColor="#ffffff"
				borderColor="transparent"
			/>
			<View style={styles.bodyContainer}>
				<View style={styles.animatedCarousalContainer}>
					<Animated.Image
						source={currentImage}
						style={[
							styles.background,
							styles.currentBackgroundImage,
							bgImage
						]}
						resizeMode="cover"
					/>
					<Image
						source={nextImage}
						style={[styles.background, styles.nextBackgroundImage]}
						contentFit="cover"
					/>
					<View style={styles.indicatorContainer}>
						{backgroundImagesWeb.map(
							(_, index): React.ReactElement | null => {
								return (
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
