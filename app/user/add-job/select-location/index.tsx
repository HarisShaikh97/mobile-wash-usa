import { useState } from "react"
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { ImageBackground, Image } from "expo-image"
import { useFonts } from "expo-font"
import BackButton from "../../../../components/back-button/BackButton"
import HorizontalSeparator from "../../../../components/horizontal-separator/HorizontalSeparator"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const [location, setLocation] = useState<string>("")

	const [fontsLoaded] = useFonts({
		"Montserrat-Medium": require("../../../../assets/fonts/Montserrat/Montserrat Medium 500.ttf")
	})

	return (
		<ImageBackground
			source={require("../../../../assets/images/map-lg.png")}
			style={styles.container}
			contentFit="fill"
		>
			<View style={styles.headerContainer}>
				<BackButton
					color="#000000"
					backgroundColor="#FFFFFF"
					borderColor="#F5F5F5"
				/>
			</View>
			<View style={styles.searchBarContainer}>
				<View style={styles.horizontalWrapper}>
					<Image
						source={require("../../../../assets/icons/location3.svg")}
						style={styles.locationIcon}
						contentFit="contain"
					/>
					{fontsLoaded && (
						<TextInput
							value={location}
							onChangeText={setLocation}
							placeholder="California, USA"
							style={styles.textField}
						/>
					)}
				</View>
				{location.length > 0 && (
					<View style={styles.searchResultsList}>
						<HorizontalSeparator color="#DDDDDD" />
						<TouchableOpacity style={styles.horizontalWrapper}>
							<Image
								source={require("../../../../assets/icons/location3.svg")}
								style={styles.locationIcon}
								contentFit="contain"
							/>
							{fontsLoaded && (
								<Text style={styles.textField}>
									Current Location
								</Text>
							)}
						</TouchableOpacity>
						<TouchableOpacity style={styles.horizontalWrapper}>
							<Image
								source={require("../../../../assets/icons/location.svg")}
								style={styles.locationIcon}
								contentFit="contain"
							/>
							{fontsLoaded && (
								<Text style={styles.textField}>
									California, USA
								</Text>
							)}
						</TouchableOpacity>
						<TouchableOpacity style={styles.horizontalWrapper}>
							<Image
								source={require("../../../../assets/icons/location.svg")}
								style={styles.locationIcon}
								contentFit="contain"
							/>
							{fontsLoaded && (
								<Text style={styles.textField}>
									California, USA
								</Text>
							)}
						</TouchableOpacity>
						<TouchableOpacity style={styles.horizontalWrapper}>
							<Image
								source={require("../../../../assets/icons/location.svg")}
								style={styles.locationIcon}
								contentFit="contain"
							/>
							{fontsLoaded && (
								<Text style={styles.textField}>
									California, USA
								</Text>
							)}
						</TouchableOpacity>
					</View>
				)}
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		paddingHorizontal: 20
	},
	headerContainer: {
		paddingVertical: 35
	},
	searchBarContainer: {
		width: "100%",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#DDDDDD",
		backgroundColor: "white",
		flexDirection: "column"
	},
	horizontalWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		padding: 10
	},
	locationIcon: {
		height: 20,
		width: 20
	},
	textField: {
		flex: 1,
		fontSize: 15,
		fontFamily: "Montserrat-Medium",
		color: theme.colors.secondary
	},
	searchResultsList: {
		width: "100%",
		flexDirection: "column"
	}
})
