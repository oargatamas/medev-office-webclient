import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {Box, Link, Menu, MenuItem, Typography} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import FolderIcon from "@material-ui/icons/Folder";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import {
    CONTENT_DELETE_ITEM,
    CONTENT_EDIT_DETAILS,
    CONTENT_EDIT_PERMISSIONS,
    CONTENT_SHARE_LINK
} from "../../actions/dialogActions";
import {OFFICE_API_HOST} from "../../../core/action/apiCallActions";
import {DRIVE_API_BASE} from "../../actions/driveApi";
import {textEllipsis} from "../../../utils/stringUtils";


const styles = (theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: theme.spacing(1),
    },
    itemIcon: {
        width: 100,
        height: 100,
    }
});


const initialState = {
    menuOpen: false,
    menuAnchor: {
        top: 0,
        left: 0,
    },
};

class DriveItem extends Component {


    constructor(props) {
        super(props);
        this.showItemOptions = this.showItemOptions.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.renderItemIcon = this.renderItemIcon.bind(this);
        this.handleItemEditClick = this.handleItemEditClick.bind(this);
        this.handleItemShareClick = this.handleItemShareClick.bind(this);
        this.handleItemPermissionsClick = this.handleItemPermissionsClick.bind(this);
        this.handleItemDeleteClick = this.handleItemDeleteClick.bind(this);
        this.state = initialState;
    }

    showItemOptions(e) {
        e.preventDefault();
        this.setState({
            menuOpen: true,
            menuAnchor: {
                left: e.clientX,
                top: e.clientY,
            },
        });
    }

    closeMenu() {
        this.setState(initialState);
    }

    renderItemIcon() {
        const {classes, item} = this.props;
        const itemColor = Object.keys(item.permissions).length > 0 ? "primary" : "disabled";

        if (item.type === "folder") {
            return (
                <RouterLink to={"/drive/" + item.id} onContextMenu={this.showItemOptions}>
                    <FolderIcon color={itemColor} className={classes.itemIcon}/>
                </RouterLink>
            );
        }
        return (
            <InsertDriveFileIcon onContextMenu={this.showItemOptions} color={itemColor} className={classes.itemIcon}/>
        );
    }

    handleItemEditClick() {
        const {item, actions} = this.props;
        actions.openItemDialog(CONTENT_EDIT_DETAILS, item);
        this.closeMenu();
    }

    handleItemShareClick() {
        const {item, actions} = this.props;
        actions.openItemDialog(CONTENT_SHARE_LINK, item);
        this.closeMenu();
    }

    handleItemPermissionsClick() {
        const {item, actions} = this.props;
        actions.openItemDialog(CONTENT_EDIT_PERMISSIONS, item);
        this.closeMenu();
    }

    handleItemDeleteClick() {
        const {item, actions} = this.props;
        actions.openItemDialog(CONTENT_DELETE_ITEM, item);
        this.closeMenu();
    }

    render() {
        const {classes, item, key,} = this.props;
        const {menuAnchor, menuOpen} = this.state;

        return (
            <Box key={key} className={classes.root}>
                {this.renderItemIcon()}
                <Typography variant={"subtitle1"}>
                    {textEllipsis(item.name,15)}
                </Typography>
                <Menu
                    id="long-menu"
                    anchorPosition={menuAnchor}
                    anchorReference={"anchorPosition"}
                    keepMounted
                    open={menuOpen}
                    onClose={this.closeMenu}
                >
                    {item.type === "file" ? (
                        <Link color={"inherit"} href={"https://" + OFFICE_API_HOST + "/" + DRIVE_API_BASE + "/file/" + item.id + "/data"}>
                            <MenuItem key={"download"}>Download</MenuItem>
                        </Link>) : null}
                    <MenuItem key={"edit"} onClick={this.handleItemEditClick}>Properties</MenuItem>
                    <MenuItem key={"share"} onClick={this.handleItemShareClick}>Create share link</MenuItem>
                    <MenuItem key={"permissions"} onClick={this.handleItemPermissionsClick}>Permissions</MenuItem>
                    <MenuItem key={"delete"} onClick={this.handleItemDeleteClick}>Delete</MenuItem>
                </Menu>
            </Box>
        );
    }
}


export default withStyles(styles, {withTheme: true})(DriveItem);