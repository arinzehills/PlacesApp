const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Add support for the new src structure
config.resolver.alias = {
  "@": path.resolve(__dirname, "src"),
  "@/modules": path.resolve(__dirname, "src/modules"),
  "@/app": path.resolve(__dirname, "src/app"),
  "@/shared": path.resolve(__dirname, "src/shared"),
  "@/store": path.resolve(__dirname, "src/store"),
};

module.exports = config;
