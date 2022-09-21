const COLORS = {
    primary: "#FFEEDB",
    secondary: "#0B1D37",
    secondaryFaded: "#0B1D37F2",
    accent: "#FFBD9A",
    grey: "#c7c7cc"
}

const SIZES = {
    padding: 16,
    borderRadius: 5,
    textBoxRadius: 5,
    h1: 24,
    h2: 20,
    h3: 16
}

const FONTS = {
    h1_semiBold: { fontSize: SIZES.h1 },
    h2_semiBold: { fontSize: SIZES.h2 },
    h3_semiBold: { fontSize: SIZES.h3 },
}

const SHADOW = {
    elevation: 5,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 2, height: 12 },
    shadowRadius: 12,
}

export { COLORS, SIZES, FONTS, SHADOW }