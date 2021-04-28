export const colors: string[] = [
    // Red
    "#FEF2F2", "#FEE2E2", "#FECACA", "#FCA5A5", "#F87171", "#EF4444", "#DC2626", "#B91C1C", "#991B1B", "#7F1D1D",
    // Yellow
    "#FFFBEB", "#FEF3C7", "#FDE68A", "#FCD34D", "#FBBF24", "#F59E0B", "#D97706", "#B45309", "#92400E", "#78350F",
    // Green
    "#ECFDF5", "#D1FAE5", "#A7F3D0", "#6EE7B7", "#34D399", "#10B981", "#059669", "#047857", "#065F46", "#064E3B",
    // Blue
    "#EFF6FF", "#DBEAFE", "#BFDBFE", "#93C5FD", "#60A5FA", "#3B82F6", "#2563EB", "#1D4ED8", "#1E40AF", "#1E3A8A",
    // Indigo
    "#EEF2FF", "#E0E7FF", "#C7D2FE", "#A5B4FC", "#818CF8", "#6366F1", "#4F46E5", "#4338CA", "#3730A3", "#312E81",
    // Purple
    "#F5F3FF", "#EDE9FE", "#DDD6FE", "#C4B5FD", "#A78BFA", "#8B5CF6", "#7C3AED", "#6D28D9", "#5B21B6", "#4C1D95",
    // Pink
    "#FDF2F8", "#FCE7F3", "#FBCFE8", "#F9A8D4", "#F472B6", "#EC4899", "#DB2777", "#BE185D", "#9D174D", "#831843"
];

export const colorsInOrder: string[] = [
    // 400
    "#F87171", "#FBBF24", "#34D399", "#60A5FA", "#818CF8", "#A78BFA", "#F472B6",
    // 500
    "#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#6366F1", "#8B5CF6", "#EC4899",
    // 600
    "#DC2626", "#D97706", "#059669", "#2563EB", "#4F46E5", "#7C3AED", "#DB2777",
    // 300
    "#FCA5A5", "#FCD34D", "#6EE7B7", "#93C5FD", "#A5B4FC", "#C4B5FD", "#F9A8D4",
    // 700
    "#B91C1C", "#B45309", "#047857", "#1D4ED8", "#4338CA", "#6D28D9", "#BE185D",
];

/**
 * Given a number of colors needed, returns an array containing Tailwind default colors as strings.
 * 
 * @param num The number of colors needed
 * @returns An array containing the hex values of the corresponding Tailwind colors.
 */
export function getColors(num: number): string[] {
    return [];
}