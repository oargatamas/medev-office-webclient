import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Box from "@material-ui/core/Box";

const styles = (theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: 200,
        height: 200,
        margin: theme.spacing(1),
        backgroundColor: "lightGrey",
    }
});

class DriveItem extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(){
        const {item, actions} = this.props;

        if(item.type === "folder"){
            actions.requestFolderContent(item);
        }
    }

    render() {
        const {classes, item, key} = this.props;

        return (
            <Box key={key} className={classes.root} onDoubleClick={this.handleItemClick}>
                {item.name}
            </Box>
        );
    }
}


export default withStyles(styles, {withTheme: true})(DriveItem);