// import { createBrowserRouter } from "react-router";
// import RootLayout from "../layout/RootLayout";
// import Home from "../Pages/Home/Home";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     Component:RootLayout,
//     children:[
//         {
//             index: true,
//             Component: Home


//         },
//     ]
//   },
// ]);

// router.jsx
import { createBrowserRouter } from "react-router-dom";
// import RootLayout from "../Layout/RootLayout.jsx";
import Home from "../Pages/Home/Home.jsx";
import RootLayout from "../Layout/RootLayout.jsx";
// import RootLayout from "../layout/RootLayout.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element:<RootLayout></RootLayout>,
    children: [
      {
        index: true,
       element:<Home></Home>,
      },
    ],
  },
]);