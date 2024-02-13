import logo from './logo.svg';
import './App.css';
import Home from './screen/Home';
import ErrorPage from'./screen/Home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HotelDetailes from './screen/HotelDetailes';
import AddPorduct from './screen/AddProduct';
import AddProductNext from './screen/AddProductNext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
     path: "/:id",
     element:<HotelDetailes />
  },
  {
    path: "/AddPorduct",
    element:<AddPorduct />
 },
 {
  path: "/AddProductNext/:data",
  element:<AddProductNext />
}
 
]);
function App() {
  return (
    <>
    <div className='bg-gray-100'>
    <RouterProvider router={router} />

    </div>
    </>


  );
}

export default App;
