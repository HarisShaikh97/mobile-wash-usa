import { Slot } from "expo-router"
import AuthWebLayout from "../../../components/auth-web-layout/AuthWebLayout"

export default function Layout(): React.ReactElement | null {
	return (
		<AuthWebLayout // AuthWebLayout component for background image
			bgImage={require("../../../assets/images/login-image-web.png")} // Background image for AuthWebLayout
		>
			{/* Slot component for dynamic content */}
			<Slot />
		</AuthWebLayout>
	)
}
