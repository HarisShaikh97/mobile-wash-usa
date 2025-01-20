import { useState } from "react"
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { ImageBackground, Image } from "expo-image"
import BackButton from "../../../../components/back-button/BackButton"
import HorizontalSeparator from "../../../../components/horizontal-separator/HorizontalSeparator"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// State variable for managing location
	const [location, setLocation] = useState<string>("")

	return (
		// ImageBackground component for the screen's background image
		<ImageBackground
			source={require("../../../../assets/images/map-lg.png")}
			style={styles.container}
			contentFit="fill"
		>
			{/* View container for the header section */}
			<View style={styles.headerContainer}>
				{/* BackButton component for navigation */}
				<BackButton
					size="small"
					color="#000000"
					backgroundColor="#FFFFFF"
					borderColor="#F5F5F5"
				/>
			</View>
			{/* View container for the search bar section */}
			<View style={styles.searchBarContainer}>
				{/* View container for the horizontal wrapper */}
				<View style={styles.horizontalWrapper}>
					{/* Image for the location icon */}
					<Image
						source={require("../../../../assets/icons/location3.svg")}
						style={styles.locationIcon}
						contentFit="contain"
					/>
					{/* TextInput for user input */}
					<TextInput
						value={location}
						onChangeText={setLocation}
						placeholder="California, USA"
						style={styles.textField}
					/>
				</View>
				{/* Conditional rendering for search results list */}
				{location.length > 0 && (
					<View style={styles.searchResultsList}>
						{/* HorizontalSeparator for separating search results */}
						<HorizontalSeparator color="#DDDDDD" />
						{/* TouchableOpacity for each search result */}
						<TouchableOpacity style={styles.horizontalWrapper}>
							{/* Image for the location icon */}
							<Image
								source={require("../../../../assets/icons/location3.svg")}
								style={styles.locationIcon}
								contentFit="contain"
							/>
							{/* Text for the search result */}
							<Text style={styles.textField}>
								Current Location
							</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.horizontalWrapper}>
							<Image
								source={require("../../../../assets/icons/location.svg")}
								style={styles.locationIcon}
								contentFit="contain"
							/>
							<Text style={styles.textField}>
								California, USA
							</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.horizontalWrapper}>
							<Image
								source={require("../../../../assets/icons/location.svg")}
								style={styles.locationIcon}
								contentFit="contain"
							/>
							<Text style={styles.textField}>
								California, USA
							</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.horizontalWrapper}>
							<Image
								source={require("../../../../assets/icons/location.svg")}
								style={styles.locationIcon}
								contentFit="contain"
							/>
							<Text style={styles.textField}>
								California, USA
							</Text>
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
