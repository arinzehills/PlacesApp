import { Text } from "@ant-design/react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./SearchInput.styles";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  loading?: boolean;
  error?: string | null;
  helperText?: string;
  showClearButton?: boolean;
  minLength?: number;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  onClear,
  loading = false,
  error,
  helperText,
  showClearButton = true,
  minLength = 3,
  placeholder = "Search places...",
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChangeText("");
    onClear?.();
  };

  const showClear = showClearButton && value.length > 0 && !loading;
  const hasError = Boolean(error);
  const showMinLengthHelper =
    value.length > 0 && value.length < minLength && !hasError;

  const inputStyle = [
    styles.input,
    isFocused && styles.inputFocused,
    hasError && styles.inputError,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={inputStyle}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor="#999"
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
          {...textInputProps}
        />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#007AFF" />
          </View>
        )}

        {showClear && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClear}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.clearButtonText}>×</Text>
          </TouchableOpacity>
        )}
      </View>

      {hasError && <Text style={styles.errorText}>{error}</Text>}

      {showMinLengthHelper && (
        <Text style={styles.helperText}>
          Type at least {minLength} characters to search
        </Text>
      )}

      {helperText && !hasError && !showMinLengthHelper && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
};
