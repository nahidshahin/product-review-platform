import { useRoutes } from "react-router-dom";
import ProductList from '../components/ProductList';
import ProductDetail from '../components/ProductDetail';


export default function Router() {
	let element = useRoutes([
		{
			element: <ProductList />,
			children: [
				{ path: "/", element: <ProductList /> }
			]
		},
		{
			element: <ProductList />,
			children: [
				{ path: "/products", element: <ProductList /> }
			]
		},
		{
			element: <ProductDetail />,
			children: [
				{ path: "/products/:id", element: <ProductDetail /> }
			]
		},
		{
			path: '*',
			element: <div>404 Not Found</div>
		},
	]);

	return element;
}
