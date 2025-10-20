# Receipt Recipe Parser

A React Native app built with Expo that analyzes receipt photos and suggests recipes based on purchased ingredients using Claude AI.

## Features

- 📱 **Cross-platform**: Works on iOS, Android, and Web
- 📷 **Camera Integration**: Take photos directly or select from gallery
- 🤖 **AI-Powered**: Uses Claude AI to analyze receipts and suggest recipes
- 🎨 **Modern UI**: Clean, responsive design that works on all screen sizes
- 🔒 **Secure**: API keys handled through environment variables
- ⚡ **Fast**: Powered by Bun for lightning-fast package management and runtime

## Prerequisites

- **Bun** (v1.0 or higher) - [Install Bun](https://bun.sh/docs/installation)
- **Expo CLI** (optional, handled via bunx)
- **An Anthropic API key** - [Get one here](https://console.anthropic.com/)

## Setup

1. **Clone and install dependencies**:
```bash
cd receipts-app
bun install
```

2. **Set up environment variables**:
```bash
cp .env.example .env
```
Edit `.env` and add your Anthropic API key:
```
EXPO_PUBLIC_ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

3. **Expo plugins are already configured** in package.json and will be installed automatically with `bun install`

## Running the App

### Development
```bash
# Start the development server
bun start

# Run on specific platforms
bun run ios      # iOS Simulator
bun run android  # Android Emulator
bun run web      # Web browser

# Alternative: Start with dev client
bun run dev
```

### Building for Production

#### Web
```bash
bun run build:web
```

#### Mobile (using EAS Build)
```bash
# Install EAS CLI globally with Bun
bun add -g @expo/eas-cli

# Configure EAS (first time only)
bunx eas build:configure

# Build for iOS
bun run build:ios

# Build for Android
bun run build:android
```

### Additional Commands
```bash
# Clear cache and restart
bun run clean

# Reinstall dependencies (if needed)
rm -f bun.lockb && bun install
```

## Why Bun?

This project uses **Bun** as the JavaScript runtime and package manager for several advantages:

- ⚡ **Lightning Fast**: Bun installs packages 10-25x faster than npm
- 🔧 **All-in-one**: Runtime, bundler, test runner, and package manager
- 🔗 **Drop-in Replacement**: Works seamlessly with existing npm packages
- 📦 **Efficient**: Smaller lockfiles and better dependency resolution
- 🚀 **Modern**: Built from the ground up for modern JavaScript/TypeScript

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ImagePickerComponent.tsx
│   ├── ItemsList.tsx
│   ├── RecipeCard.tsx
│   └── LoadingSpinner.tsx
├── screens/            # App screens
│   └── HomeScreen.tsx
├── services/           # API and external services
│   └── claudeApi.ts
└── types/             # TypeScript type definitions
    └── index.ts
```

## How It Works

1. **Upload Receipt**: Users can either take a photo with the camera or select an image from their gallery
2. **AI Analysis**: The receipt image is sent to Claude AI which extracts food items
3. **Recipe Generation**: Claude suggests 3-5 recipes based on the identified ingredients
4. **Display Results**: Items and recipes are displayed in an easy-to-read format

## Platform-Specific Features

### Mobile (iOS/Android)
- Native camera access
- Photo library integration
- Optimized touch interactions
- Platform-specific permissions

### Web
- File upload interface
- Responsive design
- Keyboard navigation support

## Permissions Required

### iOS
- Camera access for taking photos
- Photo library access for selecting images

### Android
- Camera permission
- External storage read/write permissions

## Environment Variables

- `EXPO_PUBLIC_ANTHROPIC_API_KEY`: Your Anthropic API key for Claude AI

## Troubleshooting

### Common Issues

1. **Camera not working**: Ensure permissions are granted in device settings
2. **API errors**: Verify your Anthropic API key is correct and has sufficient credits
3. **Build issues**: Try clearing cache with `bun run clean`
4. **Bun compatibility**: If you encounter issues, ensure you're using Bun v1.0+

### Development Tips

- Use `bunx expo start --tunnel` for testing on physical devices
- Enable web debugging in Expo DevTools for easier development
- Check console logs for detailed error messages
- Bun's fast install speeds up dependency management significantly
- Use `bun run clean` instead of manually clearing caches

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on multiple platforms
5. Submit a pull request

## License

MIT License - see LICENSE file for details