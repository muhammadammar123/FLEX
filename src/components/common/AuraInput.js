import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { RADIUS, SPACING } from '../../constants/layout';

export function AuraInput({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  helperText,
  required = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  autoCapitalize = 'none',
  maxLength,
  style,
  inputStyle,
  leftIcon,
  rightElement,
  ...restProps
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && (
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.requiredAsterisk}> *</Text>}
        </View>
      )}

      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputFocused,
          error ? styles.inputError : null,
          multiline && styles.inputMultiline,
        ]}
      >
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          style={[styles.input, multiline && styles.textMultiline, inputStyle]}
          {...restProps}
        />

        {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
      </View>

      {error ? (
        <Text style={styles.errorText}>⚠ {error}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.sm,
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 0.2,
  },
  requiredAsterisk: {
    color: COLORS.accentLight,
    fontWeight: '700',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    minHeight: 50,
  },
  inputFocused: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.surface,
  },
  inputError: {
    borderColor: COLORS.critical,
    backgroundColor: COLORS.criticalSoft,
  },
  inputMultiline: {
    alignItems: 'flex-start',
    paddingVertical: SPACING.sm,
    minHeight: 90,
  },
  leftIconContainer: { marginRight: SPACING.sm },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    paddingVertical: SPACING.sm,
  },
  textMultiline: { textAlignVertical: 'top' },
  rightElement:  { marginLeft: SPACING.sm },
  errorText: {
    color: COLORS.critical,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 5,
    marginLeft: 2,
  },
  helperText: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 5,
    marginLeft: 2,
  },
});
