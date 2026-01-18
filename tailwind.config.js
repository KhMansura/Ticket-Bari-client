
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         poppins: ["Poppins", "sans-serif"],
//       },
//       boxShadow: {
//         'card': '0 10px 40px -10px rgba(0,0,0,0.08)', // Soft 3D shadow
//       }
//     },
//   },
//   plugins: [require("daisyui")],
//   daisyui: {
//     themes: [
//       {
//         light: {
//           ...require("daisyui/src/theming/themes")["light"],
//           "primary": "#2563EB",     // Royal Blue (Brand Color)
//           "secondary": "#0F172A",   // Navy
//           "accent": "#F59E0B",      // Amber (for highlights)
//           "neutral": "#1e3a8a",     // Deep Navy (For Professional Footer)
//           "base-100": "#FFFFFF",    // Pure White
//           "base-200": "#F1F5F9",    // Light Grey (Site Background)
//           "info": "#3abff8",
//           "success": "#36d399",
//           "warning": "#fbbd23",
//           "error": "#f87272",
//         },
//         dark: {
//           ...require("daisyui/src/theming/themes")["dark"],
//           "primary": "#3B82F6",     // Lighter Blue for Dark Mode
//           "secondary": "#64748B",
//           "neutral": "#1E293B",     // Dark Slate Footer
//           "base-100": "#0F172A",    // Deep Navy Background
//           "base-200": "#1E293B",    // Lighter Navy
//         },
//       },
//     ],
//   },
// }
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Changed to lowercase 'poppins' to match standard tailwind naming
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        'card': '0 10px 40px -10px rgba(0,0,0,0.08)', 
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#2563EB",     
          "secondary": "#0F172A",   
          "accent": "#F59E0B",      
          "neutral": "#1e3a8a",     
          "base-100": "#FFFFFF",    
          "base-200": "#F1F5F9",    // Site background color
          "success": "#36d399",
          "error": "#f87272",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#3B82F6",     
          "secondary": "#94A3B8",  
          "neutral": "#1E293B",     
          "base-100": "#0F172A",    
          "base-200": "#1E293B",    
        },
      },
    ],
  },
}