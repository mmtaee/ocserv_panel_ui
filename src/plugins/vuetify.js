import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light', // or 'dark' depending on your needs
    themes: {
      light: {
        colors: {
          background: '#C9F0FF', // Main app background color
          surface: '#FFFFFF', // White surface for cards, dialogs, etc.
          primary: '#4A8DFF', // A deep blue for the primary color
          secondary: '#5FBBFF', // A lighter blue for secondary elements
          tertiary: '#8EC3FF', // A mid-tone blue for actions and buttons
          textPrimary: '#333333', // Dark text for primary text
          textSecondary: '#555555', // Lighter text for secondary text
          error: '#FF5252', // Default error color
          success: '#4CAF50', // Default success color
          warning: '#FB8C00', // Default warning color
        },
      },
      dark: {
        colors: {
          background: '#303030', // Dark background for dark mode
          surface: '#424242', // Dark surface for cards, dialogs, etc.
          primary: '#4A8DFF', // Keep the same primary color for dark mode
          secondary: '#5FBBFF', // Keep the same secondary color for dark mode
          tertiary: '#8EC3FF', // Keep the same tertiary color for dark mode
          textPrimary: '#FFFFFF', // White text for dark mode
          textSecondary: '#DDDDDD', // Lighter text for dark mode
          error: '#FF5252', // Default error color
          success: '#4CAF50', // Default success color
          warning: '#FB8C00', // Default warning color
        },
      },
    },
  },
})
