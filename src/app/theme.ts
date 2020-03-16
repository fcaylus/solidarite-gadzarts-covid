import {createMuiTheme, responsiveFontSizes} from "@material-ui/core/styles";
import colors from "./colors";

/**
 * Theme for the main app.
 */
const originalTheme = createMuiTheme();
const theme = {
    ...originalTheme, ...responsiveFontSizes(createMuiTheme({
        palette: {
            primary: colors.primary,
            secondary: colors.secondary,
            background: colors.background,
        },
        overrides: {
            MuiAppBar: {
                colorDefault: {
                    backgroundColor: colors.white,
                    color: colors.primary.main
                }
            },
            MuiMenuItem: {
                root: {
                    "&:active": {
                        backgroundColor: "rgba(0, 0, 0, 0.08)"
                    }
                }
            },
            MuiCardContent: {
                root: {
                    padding: originalTheme.spacing(2),
                    "&:last-child": {
                        paddingBottom: originalTheme.spacing(3)
                    },
                    [originalTheme.breakpoints.down("xs")]: {
                        padding: originalTheme.spacing(1),
                        "&:last-child": {
                            paddingBottom: originalTheme.spacing(2)
                        }
                    }
                }
            },
            MuiCardHeader: {
                root: {
                    padding: originalTheme.spacing(2),
                    [originalTheme.breakpoints.down("xs")]: {
                        padding: originalTheme.spacing(1)
                    }
                }
            }
        }
    }))
};

export default theme;
