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
	const [searchValue, setSearchValue] = useState<string>("")
	const [currentFaqIndex, setCurrentFaqIndex] = useState<number | null>(null)

	return (
		<View style={styles.container}>
			<Text style={styles.titleText}>Help & Support</Text>
			<ScrollView
				style={styles.helpSupportCard}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.helpSupportCardScrollContainer}>
					<View style={styles.contactSupportSection}>
						<Text style={styles.cardTitleText}>
							Contact Support
						</Text>
						<HorizontalSeparator color="#DBDBDB" />
						<View style={styles.contactSupportOptionContainer}>
							<View
								style={styles.contactSupportOptionIconContainer}
							>
								<AntDesign
									name="message1"
									size={11.5}
									color="white"
								/>
							</View>
							<Text style={styles.contactSupportOptionText}>
								Chat with us
							</Text>
						</View>
						<HorizontalSeparator color="#DBDBDB" />
						<View style={styles.contactSupportOptionContainer}>
							<View
								style={styles.contactSupportOptionIconContainer}
							>
								<Feather
									name="mail"
									size={11.5}
									color="white"
								/>
							</View>
							<Text style={styles.contactSupportOptionText}>
								Email us
							</Text>
						</View>
						<HorizontalSeparator color="#DBDBDB" />
						<View style={styles.contactSupportOptionContainer}>
							<View
								style={styles.contactSupportOptionIconContainer}
							>
								<Ionicons
									name="call-outline"
									size={11.5}
									color="white"
								/>
							</View>
							<Text style={styles.contactSupportOptionText}>
								Call us
							</Text>
						</View>
					</View>
					<View style={styles.faqSection}>
						<Text style={styles.cardTitleText}>FAQ</Text>
						<Text style={styles.cardDescriptionText}>
							Find answer to your problem using this app.
						</Text>
						<View style={styles.searchBarWrapper}>
							<SearchBar
								placeholder="Try find “how to”"
								color="#CACACA"
								value={searchValue}
								onChangeText={setSearchValue}
								filterEnabled={false}
							/>
						</View>
						<View style={styles.customerVendorTabWrapper}>
							<View style={styles.customerTab}>
								<Text
									style={[
										styles.customerVendorText,
										styles.customerText
									]}
								>
									Customer
								</Text>
							</View>
							<Text
								style={[
									styles.customerVendorText,
									styles.vendorText
								]}
							>
								Vendor
							</Text>
						</View>
						<View style={styles.faqsWrapper}>
							{FAQs.map(
								(item, index): React.ReactElement | null => {
									return (
										<View
											style={styles.faqItemContainer}
											key={index}
										>
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
												<Text
													style={
														styles.faqItemHeaderText
													}
												>
													{item.question}
												</Text>
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
											{currentFaqIndex === index && (
												<View
													style={
														styles.faqItemDescriptionTextContainer
													}
												>
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
