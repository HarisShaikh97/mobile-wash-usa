import { useState } from "react"
import {
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { AntDesign, Feather, Ionicons, Entypo } from "@expo/vector-icons"
import HorizontalSeparator from "../../../components/horizontal-separator/HorizontalSeparator"
import SearchBar from "../../../components/search-bar/SearchBar"
import { theme, FAQs } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const [searchValue, setSearchValue] = useState<string>("") // State for managing search value
	const [currentFaqIndex, setCurrentFaqIndex] = useState<number | null>(null) // State for managing the current FAQ index

	return (
		// Container for the help and support page
		<View style={styles.container}>
			{/* Title of the page */}
			<Text style={styles.titleText}>Help & Support</Text>
			{/* Scroll view for the help and support content */}
			<ScrollView
				style={styles.helpSupportCard}
				showsVerticalScrollIndicator={false}
			>
				{/* Container for the scroll view content */}
				<View style={styles.helpSupportCardScrollContainer}>
					{/* Section for contacting support */}
					<View style={styles.contactSupportSection}>
						{/* Title for the contact support section */}
						<Text style={styles.cardTitleText}>
							Contact Support
						</Text>
						{/* Horizontal separator for visual separation */}
						<HorizontalSeparator color="#DBDBDB" />
						{/* Container for contact support options */}
						<View style={styles.contactSupportOptionContainer}>
							{/* Container for the contact support option icon */}
							<View
								style={styles.contactSupportOptionIconContainer}
							>
								{/* Icon for chat support */}
								<AntDesign
									name="message1"
									size={11.5}
									color="white"
								/>
							</View>
							{/* Text for chat support option */}
							<Text style={styles.contactSupportOptionText}>
								Chat with us
							</Text>
						</View>
						{/* Horizontal separator for visual separation */}
						<HorizontalSeparator color="#DBDBDB" />
						{/* Container for contact support options */}
						<View style={styles.contactSupportOptionContainer}>
							{/* Container for the contact support option icon */}
							<View
								style={styles.contactSupportOptionIconContainer}
							>
								{/* Icon for email support */}
								<Feather
									name="mail"
									size={11.5}
									color="white"
								/>
							</View>
							{/* Text for email support option */}
							<Text style={styles.contactSupportOptionText}>
								Email us
							</Text>
						</View>
						{/* Horizontal separator for visual separation */}
						<HorizontalSeparator color="#DBDBDB" />
						{/* Container for contact support options */}
						<View style={styles.contactSupportOptionContainer}>
							{/* Container for the contact support option icon */}
							<View
								style={styles.contactSupportOptionIconContainer}
							>
								{/* Icon for call support */}
								<Ionicons
									name="call-outline"
									size={11.5}
									color="white"
								/>
							</View>
							{/* Text for call support option */}
							<Text style={styles.contactSupportOptionText}>
								Call us
							</Text>
						</View>
					</View>
					{/* Section for FAQs */}
					<View style={styles.faqSection}>
						{/* Title for the FAQ section */}
						<Text style={styles.cardTitleText}>FAQ</Text>
						{/* Description for the FAQ section */}
						<Text style={styles.cardDescriptionText}>
							Find answer to your problem using this app.
						</Text>
						{/* Container for the search bar */}
						<View style={styles.searchBarWrapper}>
							{/* Search bar for searching FAQs */}
							<SearchBar
								placeholder="Try find “how to”"
								color="#CACACA"
								backgroundColor="#ffffff"
								borderColor="#F5F5F5"
								value={searchValue}
								onChangeText={setSearchValue}
								filterEnabled={false}
								mode="app"
							/>
						</View>
						{/* Container for customer and vendor tabs */}
						<View style={styles.customerVendorTabWrapper}>
							{/* Container for the customer tab */}
							<View style={styles.customerTab}>
								{/* Text for the customer tab */}
								<Text
									style={[
										styles.customerVendorText,
										styles.customerText
									]}
								>
									Customer
								</Text>
							</View>
							{/* Text for the vendor tab */}
							<Text
								style={[
									styles.customerVendorText,
									styles.vendorText
								]}
							>
								Vendor
							</Text>
						</View>
						{/* Container for FAQs */}
						<View style={styles.faqsWrapper}>
							{/* Mapping through FAQs and rendering each item */}
							{FAQs.map(
								(item, index): React.ReactElement | null => {
									return (
										// Container for each FAQ item
										<View
											style={styles.faqItemContainer}
											key={index}
										>
											{/* Touchable area for expanding the FAQ item */}
											<TouchableOpacity
												style={
													styles.faqItemHeaderContainer
												}
												onPress={() => {
													setCurrentFaqIndex(
														currentFaqIndex ===
															index
															? null
															: index
													)
												}}
											>
												{/* Text for the FAQ question */}
												<Text
													style={
														styles.faqItemHeaderText
													}
												>
													{item.question}
												</Text>
												{/* Icon for expanding the FAQ item */}
												<Entypo
													name={
														currentFaqIndex ===
														index
															? "minus"
															: "plus"
													}
													size={17.5}
													color={
														theme.colors.secondary
													}
												/>
											</TouchableOpacity>
											{/* Conditionally rendering the FAQ answer */}
											{currentFaqIndex === index && (
												// Container for the FAQ answer
												<View
													style={
														styles.faqItemDescriptionTextContainer
													}
												>
													{/* Text for the FAQ answer */}
													<Text
														style={
															styles.faqItemDescriptionText
														}
													>
														{item.answer}
													</Text>
												</View>
											)}
										</View>
									)
								}
							)}
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		gap: 10,
		zIndex: 10
	},
	titleText: {
		fontSize: 22.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		width: 200,
		textAlign: "center"
	},
	helpSupportCard: {
		flex: 1,
		width: "100%",
		marginTop: 30,
		marginBottom: 25,
		paddingHorizontal: 25,
		borderRadius: 15,
		backgroundColor: "#F4F6F9"
	},
	helpSupportCardScrollContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 25,
		marginVertical: 22.5
	},
	cardTitleText: {
		fontSize: 16,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary
	},
	cardDescriptionText: {
		fontSize: 10,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	contactSupportSection: {
		width: "100%",
		flexDirection: "column",
		gap: 12.5
	},
	contactSupportOptionContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10
	},
	contactSupportOptionIconContainer: {
		height: 27.5,
		width: 27.5,
		borderRadius: 15,
		backgroundColor: theme.colors.primary,
		alignItems: "center",
		justifyContent: "center"
	},
	contactSupportOptionText: {
		fontSize: 11.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	faqSection: {
		width: "100%",
		flexDirection: "column",
		gap: 3.5
	},
	searchBarWrapper: {
		width: "100%",
		marginVertical: 15
	},
	customerVendorTabWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 25
	},
	customerVendorText: {
		fontSize: 11.5,
		fontFamily: "Roboto-Medium"
	},
	customerTab: {
		height: 30,
		width: 100,
		borderRadius: 5,
		backgroundColor: theme.colors.primary,
		alignItems: "center",
		justifyContent: "center"
	},
	customerText: {
		color: "white"
	},
	vendorText: {
		color: theme.colors.secondary
	},
	faqsWrapper: {
		marginTop: 15,
		flexDirection: "column",
		width: "100%"
	},
	faqItemContainer: {
		flexDirection: "column",
		width: "100%"
	},
	faqItemHeaderContainer: {
		height: 35,
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	faqItemHeaderText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary
	},
	faqItemDescriptionTextContainer: {
		width: "100%"
	},
	faqItemDescriptionText: {
		fontSize: 10,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	}
})
