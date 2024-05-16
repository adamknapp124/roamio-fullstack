import '../app/globals.css';
import { Navigation } from './components/Navigation.jsx';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				{children}
				<Navigation />
			</body>
		</html>
	);
}
