// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [require("daisyui")],
//   daisyui: {
//     themes: ["light", "dark"], // Add themes for dark mode requirement
//   },
// }

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       // Professional Font Family (matches your index.css)
//       fontFamily: {
//         poppins: ["Poppins", "sans-serif"],
//       },
//       // Custom shadows for cards (Recruiter-pleasing depth)
//       boxShadow: {
//         'card': '0 10px 40px -10px rgba(0,0,0,0.08)',
//         'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
//       }
//     },
//   },
//   plugins: [require("daisyui")],
//   daisyui: {
//     themes: [
//       {
//         // PROFESSIONAL LIGHT THEME (Corporate/Clean)
//         light: {
//           ...require("daisyui/src/theming/themes")["light"],
//           "primary": "#2563EB",     // Royal Blue (Main Brand Color)
//           "secondary": "#0F172A",   // Dark Navy (For Footer/Contrast)
//           "accent": "#F59E0B",      // Golden Amber (For Highlights/Stars)
//           "neutral": "#334155",     // Slate Grey (Softer text than pure black)
//           "base-100": "#FFFFFF",    // Pure White Background
//           "base-200": "#F1F5F9",    // Very Light Grey (For Section Backgrounds)
          
//           "--rounded-btn": "0.5rem", // Slight rounded buttons (Modern)
//           "--rounded-box": "0.5rem", // Slight rounded cards
//         },
        
//         // PROFESSIONAL DARK THEME (Modern/Easy on Eyes)
//         dark: {
//           ...require("daisyui/src/theming/themes")["dark"],
//           "primary": "#3B82F6",     // Lighter Blue (Better visibility on dark)
//           "secondary": "#64748B",   // Slate Grey
//           "accent": "#FBBF24",      // Bright Amber
//           "neutral": "#1E293B",     // Dark Slate
//           "base-100": "#0F172A",    // Deep Navy Background (Not pitch black)
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
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        'card': '0 10px 40px -10px rgba(0,0,0,0.08)',
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#2563EB",     // Royal Blue
          "secondary": "#0F172A",   // Navy
          "accent": "#F59E0B",      // Amber
          
          // ✅ CHANGE THIS: Deep Navy Blue (Instead of Grey/Black)
          "neutral": "#1e3a8a",     // A rich, deep blue footer
          
          "neutral-content": "#ffffff", // Force white text on footer
          
          "base-100": "#FFFFFF",    
          "base-200": "#F1F5F9",    
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#3B82F6",    
          "neutral": "#1E293B",     // Dark Navy for Dark Mode
          "base-100": "#0F172A",   
          "base-200": "#1E293B",   
        },
      },
    ],
  },
}