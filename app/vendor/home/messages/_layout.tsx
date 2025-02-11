import { useState } from "react"
import { ScrollView, View, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { Slot } from "expo-router"
import BackButton from "../../../../components/back-button/BackButton"
import SearchBar from "../../../../components/search-bar/SearchBar"
import { theme } from "../../../../utils/constants"

export default function Layout(): React.ReactElement | null {
	const [searchValue, setSearchValue] = useState<string>("") // State for search input

	return (
		<View style={styles.container}>
			{/* Background image */}
			<Image
				source={require("../../../../assets/images/profile-bg.png")}
				style={styles.bgImage}
				contentFit="fill"
			/>
			{/* Main content container */}
			<View style={styles.bodyContainer}>
				{/* Header section with back button */}
				<View style={styles.headerContainer}>
					<BackButton
						size="small"
						color="#ffffff"
						backgroundColor="rgba(255, 255, 255, 0.15)"
						borderColor="#ffffff"
					/>
				</View>
				{/* Title section with search bar */}
				<View style={styles.titleWrapper}>
					<Text style={styles.titleText}>All Chats</Text>
					<SearchBar
						value={searchValue}
						onChangeText={setSearchValue}
						placeholder="Search"
						color="#CACACA"
						backgroundColor="#ffffff"
						borderColor="#F5F5F5"
						filterEnabled={false}
						mode="app"
					/>
				</View>
				{/* Chat messages container */}
				<View style={styles.chatsCard}>
					{/* Chat messages scrollable container */}
					<ScrollView
						style={styles.chatsCardScrollView}
						showsVerticalScrollIndicator={false}
					>
						{/* Chat messages slot */}
						<Slot />
					</ScrollView>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		position: "relative"
	},
	bgImage: {
		height: 300,
		width: "100%",
		position: "absolute",
		top: 0,
		left: 0,
		backgroundColor: theme.colors.primary
	},
	bodyContainer: {
		flex: 1,
		zIndex: 10,
		flexDirection: "column"
	},
	headerContainer: {
		padding: 25
	},
	titleWrapper: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 25,
		paddingHorizontal: 25
	},
	titleText: {
		fontSize: 25,
		fontFamily: "Montserrat-SemiBold",
		color: "white",
		alignSelf: "center"
	},
	chatsCard: {
		flex: 1,
		backgroundColor: "white",
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		paddingHorizontal: 25,
		marginTop: 35
	},
	chatsCardScrollView: {
		flex: 1
	}
})
