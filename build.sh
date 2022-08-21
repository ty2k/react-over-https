# Run the build script included with create-react-app
cd frontend && npm run build

# Copy the optimized production build artifacts to the backend/public folder
cp -r build ../backend/public
