import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {Box, Link, Menu, MenuItem, Typography, Tooltip} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import FolderIcon from "@material-ui/icons/Folder";
import {
    CONTENT_DELETE_ITEM,
    CONTENT_EDIT_DETAILS,
    CONTENT_EDIT_PERMISSIONS, CONTENT_MOVE_ITEM,
    CONTENT_SHARE_LINK, CONTENT_SHOW_IMAGE
} from "../../actions/dialogActions";
import {API_ORIGIN, OFFICE_API_HOST} from "../../../core/action/apiCallActions";
import {DRIVE_API_BASE} from "../../actions/driveApi";
import {textEllipsis} from "../../../utils/stringUtils";
import {fileTypes} from "../../actions/fileTypeDictionary";
import {getThumbnailUrl, THUMB_SMALL} from "../../actions/imageActions";


const styles = (theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: theme.spacing(1),
        width: 100,
        height: 60,
        [theme.breakpoints.down('sm')]: {
            width: 80,
            height: 50,
        }
    },
    itemIcon: {
        width: 50,
        height: 50,
        [theme.breakpoints.down('sm')]: {
            width: 50,
            height: 50,
        },
        cursor: "pointer",
    },
    disabled : {
        filter: "grayscale(100%)"
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
        this.handleItemMoveClick = this.handleItemMoveClick.bind(this);
        this.handleFileClick = this.handleFileClick.bind(this);
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

    renderItemIcon(disabled) {
        const {classes, item} = this.props;


        if (item.type === "folder") {
            return (
                <RouterLink to={"/drive/" + item.id}>
                    <FolderIcon color={disabled ? "disabled" : "primary"} className={classes.itemIcon}/>
                </RouterLink>
            );
        }

        const typeData = fileTypes.find(type => type.mimeType === item.mimeType);

        let imageSource = typeData.icon;
        if (item.mimeType.startsWith("image")) {
            imageSource = getThumbnailUrl(item, THUMB_SMALL);
        }

        const iconClasses = [classes.itemIcon];
        if (disabled){
            iconClasses.push(classes.disabled)
        }

        return (
            <img alt={item.name} src={imageSource} className={iconClasses.join(' ')} onClick={this.handleFileClick} onError={(e) => {e.target.src = imageSource}}/>
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

    handleItemMoveClick() {
        const {item, actions} = this.props;
        actions.openItemDialog(CONTENT_MOVE_ITEM, item);
        this.closeMenu();
    }

    handleFileClick() {
        const {item, actions} = this.props;

        if (item.mimeType.startsWith("image")) {
            actions.openItemDialog(CONTENT_SHOW_IMAGE, item);
        } else {
            window.location.href = API_ORIGIN + DRIVE_API_BASE + "/file/" + item.id + "/data";
        }
    }

    render() {
        const {classes, item, key,} = this.props;
        const {menuAnchor, menuOpen} = this.state;
        const disabled = Object.keys(item.permissions).length === 0;

        return (
            <Tooltip title={item.name}>
                <Box key={key} className={classes.root} onContextMenu={this.showItemOptions}>

                    {this.renderItemIcon(disabled)}
                    <Typography variant={"caption"} color={disabled ? "textSecondary" : "textPrimary"}>
                        {
                            textEllipsis(item.name, 15, {side: "middle"}).replace(" ", String.fromCharCode(160))
                        }
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
                            <Link color={"inherit"}
                                  href={API_ORIGIN + DRIVE_API_BASE + "/file/" + item.id + "/data"}>
                                <MenuItem key={"download"}>Download</MenuItem>
                            </Link>) : null}
                        <MenuItem key={"edit"} onClick={this.handleItemEditClick}>Properties</MenuItem>
                        <MenuItem key={"share"} onClick={this.handleItemShareClick}>Create share link</MenuItem>
                        <MenuItem key={"permissions"} onClick={this.handleItemPermissionsClick}>Permissions</MenuItem>
                        <MenuItem key={"move"} onClick={this.handleItemMoveClick}>Move</MenuItem>
                        <MenuItem key={"delete"} onClick={this.handleItemDeleteClick}>Delete</MenuItem>
                    </Menu>
                </Box>
            </Tooltip>
        );
    }
}


export default withStyles(styles, {withTheme: true})(DriveItem);