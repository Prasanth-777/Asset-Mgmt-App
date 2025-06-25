📦 Asset Management App – React Native (Frontend)
This is a mobile application built with React Native that allows users to manage assets with features like adding, editing, deleting, filtering by categories and statuses, uploading images, and managing authentication.

🚀 Features
✅ User Login & Registration (Static Auth for demo)

✅ Add, Edit, and Delete Assets

✅ Manage Asset Categories and Statuses

✅ Date Pickers for Purchase and Warranty Dates

✅ Upload Image for Assets

✅ Persistent Global State using Context API

✅ Toast notifications and form validations

✅ Responsive UI with clean design

✅ Tab Navigation with icons (Home, Settings, etc.)

✅ Logout functionality

🧰 Tech Stack
React Native CLI

React Navigation

Context API (for global state management)

@react-native-picker/picker (dropdowns)

@react-native-community/datetimepicker (date selection)

Expo Vector Icons

ToastAndroid (Android toast messages)

📸 Screens
Login & Register

Home (Asset List)

Add/Edit Asset

Add Category

Add Status

Settings (with logout)

🛠️ Setup Instructions
1. Clone the Repo
git clone https://github.com/Prasanth-777/Asset-Mgmt-App.git


3. Install Dependencies
npm install

4. Start Metro Bundler
npx expo start



🔐 Demo Login Credentials
Email: prasanth@gmail.com
Password: 123456

📁 Folder Structure

├── App.js
├── /screens
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   ├── HomeScreen.js
│   ├── AddAssetScreen.js
│   ├── EditAssetScreen.js
│   ├── AddCategoryScreen.js
│   ├── AddStatusScreen.js
│   └── SettingsScreen.js
├── /context
│   └── AssestContext.js
├── /assets
│   └── (App assets/images/icons)
