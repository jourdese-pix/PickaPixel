import { colors } from './colors'
import { spacing } from './spacing'
import { typography } from './typography'

export const theme = {
    colors,
    spacing,
    typography,
}

// Common styles that can be reused across components
export const commonStyles = {
    screen: {
        flex: 1,
        backgroundColor: colors.background.secondary,
        padding: spacing.padding.screen,
    },
    card: {
        backgroundColor: colors.background.primary,
        padding: spacing.padding.card,
        borderRadius: spacing.radius.medium,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    header: {
        fontSize: typography.sizes.xlarge,
        fontWeight: typography.weights.bold,
        color: colors.text.primary,
        marginBottom: spacing.margin.bottom,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: typography.sizes.large,
        fontWeight: typography.weights.semibold,
        color: colors.text.secondary,
        marginBottom: spacing.margin.bottom,
    },
    text: {
        regular: {
            fontSize: typography.sizes.medium,
            color: colors.text.secondary,
            fontWeight: typography.weights.regular,
        },
        bold: {
            fontSize: typography.sizes.medium,
            color: colors.text.secondary,
            fontWeight: typography.weights.bold,
        },
        light: {
            fontSize: typography.sizes.medium,
            color: colors.text.tertiary,
            fontWeight: typography.weights.light,
        },
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    spacing: {
        marginBottom: {
            marginBottom: spacing.margin.bottom,
        },
        marginVertical: {
            marginVertical: spacing.margin.vertical,
        },
        marginHorizontal: {
            marginHorizontal: spacing.margin.horizontal,
        },
    }
}
