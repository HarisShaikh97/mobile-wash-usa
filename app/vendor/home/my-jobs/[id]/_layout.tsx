import { ScrollView, View, StyleSheet } from "react-native"
import { Slot, useLocalSearchParams, useRouter } from "expo-router"
import BackButton from "../../../../../components/back-button/BackButton"
import DeleteButton from "../../../../../components/delete-button/DeleteButton"
import JobActionPopup from "../../../../../components/job-action-popup/JobActionPopup"
import { theme } from "../../../../../utils/constants"

export default function Layout(): React.ReactElement | null {
	// Get job ID from URL params
	const { id } = useLocalSearchParams()

	// Initialize router object for navigation
	const router = useRouter()

	return (
		// Main wrapper container
		<View style={styles.wrapper}>
			{/* Action popup for marking job as completed */}
			<JobActionPopup
				title="Mark As Completed"
				onPress={() => {
					router.navigate(`/vendor/job-completion-verification/${id}`)
				}}
			/>
			{/* Scrollable content area */}
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
			>
				{/* Main content container */}
				<View style={styles.container}>
					{/* Header with navigation buttons */}
					<View style={styles.headerContainer}>
						{/* Back navigation button */}
						<BackButton
							size="small"
							color={theme.colors.secondary}
							backgroundColor="transparent"
							borderColor="#F5F5F5"
						/>
						{/* Delete job button */}
						<DeleteButton />
					</View>
					{/* Slot for nested route content */}
					<Slot />
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: "white",
		position: "relative"
	},
	scrollView: {
		flex: 1,
		paddingHorizontal: 25
	},
	container: {
		flexDirection: "column",
		paddingBottom: 200
	},
	headerContainer: {
		width: "100%",
		paddingVertical: 35,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	}
})
