import { Slot } from "expo-router"
import ProfileLayout from "../../../components/profile-layout/ProfileLayout"

export default function Layout(): React.ReactElement | null {
	return (
		// Layout for the Edit Account page
		<ProfileLayout title="Edit Account">
			{/* Slot for dynamic content */}
			<Slot />
		</ProfileLayout>
	)
}
