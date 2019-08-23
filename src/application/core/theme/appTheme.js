import createMuiTheme from "@material-ui/core/styles/createMuiTheme";


export const theme = createMuiTheme({
    overrides:{
        MuiDialog:{
            paper:{
                overflowY:"visible"
            }
        }
    }
});