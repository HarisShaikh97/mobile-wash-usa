import { useState, useCallback, useMemo } from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useLocalSearchParams } from "expo-router"
import AntDesign from "@expo/vector-icons/AntDesign"
import BackButton from "../../../../components/back-button/BackButton"
import { backgroundImages } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const { id } = useLocalSearchParams()

	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)

	const handleNextImage = useCallback((): void => {
		setCurrentImageIndex(
			(prevIndex) => (prevIndex + 1) % backgroundImages.length
		)
	}, [])

	const handlePreviousImage = useCallback((): void => {
		setCurrentImageIndex(
			(prevIndex) =>
				(prevIndex - 1 + backgroundImages.length) %
				backgroundImages.length
		)
	}, [])

	const currentImage = useMemo(
		() => backgroundImages[currentImageIndex],
		[currentImageIndex]
	)

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<BackButton
					size="small"
					color="#000000"
					backgroundColor="#FFFFFF"
					borderColor="transparent"
				/>
			</View>
			<Image
				source={currentImage}
				style={styles.background}
				contentFit="cover"
			/>
			<TouchableOpacity
				style={[styles.actionButton, styles.previousButton]}
				onPress={handlePreviousImage}
			>
				<AntDesign name="arrowleft" size={17.5} color="black" />
			</TouchableOpacity>
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
