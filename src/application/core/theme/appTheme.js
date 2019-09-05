import createMuiTheme from "@material-ui/core/styles/createMuiTheme";


export const theme = createMuiTheme({
    overrides: {
        MuiDialog: {
            paper: {
                overflowY: "visible",
            }
        },
        MuiDialogTitle: {
            root: {
                wordBreak: "break-all",
            }
        },
        MuiListItemText:{
            primary:{
                wordBreak: "break-all",
            },
            secondary:{
                wordBreak: "break-all",
                color: "green",
            }
        }
    }
});