import { Slot } from "expo-router"
import ProfileLayout from "../../../../components/profile-layout/ProfileLayout"

export default function Layout(): React.ReactElement | null {
	return (
		// ProfileLayout component with title set to "Profile"
		<ProfileLayout title="Profile">
			{/* Slot component to render the content of the page */}
			<Slot />
		</ProfileLayout>
	)
}
