import { View, ScrollView, Text, StyleSheet } from "react-native"
import { useFonts } from "expo-font"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Roboto-Medium": require("../../../assets/fonts/Roboto/Roboto Medium 500.ttf"),
		"Roboto-Regular": require("../../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	return (
		<View style={styles.container}>
			{fontsLoaded && (
				<Text style={styles.titleText}>Privacy Policy</Text>
			)}
			<ScrollView
				style={styles.privacyPolicyCard}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.privacyPolicyCardScrollContainer}>
					{fontsLoaded && (
						<Text style={styles.cardTitleText}>
							1. Introduction:
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardDescriptionText}>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis
							nostrud exercitation ullamco laboris nisi ut aliquip
							ex ea commodo consequat.
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardDescriptionText}>
							Duis aute irure dolor in reprehenderit in voluptate
							velit esse cillum dolore eu fugiat nulla pariatur.
							Excepteur sint occaecat cupidatat non proident.
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardTitleText}>
							2. Information Collection:
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardDescriptionText}>
							Sed ut perspiciatis unde omnis iste natus error sit
							voluptatem accusantium doloremque laudantium, totam
							rem aperiam, eaque ipsa quae ab illo inventore
							veritatis et quasi architecto beatae vitae.
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardDescriptionText}>
							Nemo enim ipsam voluptatem quia voluptas sit
							aspernatur aut odit aut fugit.
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardTitleText}>
							3. Use of Information:
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardDescriptionText}>
							At vero eos et accusamus et iusto odio dignissimos
							ducimus qui blanditiis praesentium voluptatum
							deleniti atque corrupti quos dolores et quas
							molestias excepturi sint occaecati cupiditate non
							provident, similique sunt in culpa qui officia
							deserunt mollitia animi, id est laborum et dolorum
							fuga
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardTitleText}>
							4. Data Sharing:
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardDescriptionText}>
							At vero eos et accusamus et iusto odio dignissimos
							ducimus qui blanditiis praesentium voluptatum
							deleniti atque corrupti quos dolores et quas
							molestias excepturi sint occaecati cupiditate non
							provident, similique sunt in culpa qui officia
							deserunt mollitia animi, id est laborum et dolorum
							fuga
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardTitleText}>
							5. Use of Information:
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardDescriptionText}>
							At vero eos et accusamus et iusto odio dignissimos
							ducimus qui blanditiis praesentium voluptatum
							deleniti atque corrupti quos dolores et quas
							molestias excepturi sint occaecati cupiditate non
							provident, similique sunt in culpa qui officia
							deserunt mollitia animi, id est laborum et dolorum
							fuga
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardTitleText}>6. Security:</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardDescriptionText}>
							At vero eos et accusamus et iusto odio dignissimos
							ducimus qui blanditiis praesentium voluptatum
							deleniti atque corrupti quos dolores et quas
							molestias excepturi sint occaecati cupiditate non
							provident, similique sunt in culpa qui officia
							deserunt mollitia animi, id est laborum et dolorum
							fuga
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardTitleText}>
							7. User Rights:
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardDescriptionText}>
							At vero eos et accusamus et iusto odio dignissimos
							ducimus qui blanditiis praesentium voluptatum
							deleniti atque corrupti quos dolores et quas
							molestias excepturi sint occaecati cupiditate non
							provident, similique sunt in culpa qui officia
							deserunt mollitia animi, id est laborum et dolorum
							fuga
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardTitleText}>8. Cookies:</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardDescriptionText}>
							At vero eos et accusamus et iusto odio dignissimos
							ducimus qui blanditiis praesentium voluptatum
							deleniti atque corrupti quos dolores et quas
							molestias excepturi sint occaecati cupiditate non
							provident, similique sunt in culpa qui officia
							deserunt mollitia animi, id est laborum et dolorum
							fuga
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardTitleText}>
							9. Data Retention:
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardDescriptionText}>
							At vero eos et accusamus et iusto odio dignissimos
							ducimus qui blanditiis praesentium voluptatum
							deleniti atque corrupti quos dolores et quas
							molestias excepturi sint occaecati cupiditate non
							provident, similique sunt in culpa qui officia
							deserunt mollitia animi, id est laborum et dolorum
							fuga
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardTitleText}>
							10. Changes to the Policy:
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.cardDescriptionText}>
							At vero eos et accusamus et iusto odio dignissimos
							ducimus qui blanditiis praesentium voluptatum
							deleniti atque corrupti quos dolores et quas
							molestias excepturi sint occaecati cupiditate non
							provident, similique sunt in culpa qui officia
							deserunt mollitia animi, id est laborum et dolorum
							fuga
						</Text>
					)}
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
		gap: 10
	},
	titleText: {
		fontSize: 22.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		width: 200,
		textAlign: "center"
	},
	privacyPolicyCard: {
		flex: 1,
		width: "100%",
		marginTop: 15,
		marginBottom: 25,
		paddingHorizontal: 17.5,
		borderRadius: 15,
		backgroundColor: "#F4F6F9"
	},
	privacyPolicyCardScrollContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 7.5,
		marginVertical: 22.5
	},
	cardTitleText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary
	},
	cardDescriptionText: {
		fontSize: 10,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	}
})
