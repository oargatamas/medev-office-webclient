import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {Box, Link, Menu, MenuItem, Tooltip, Typography} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import FolderIcon from "@material-ui/icons/Folder";
import {
    CONTENT_DELETE_ITEM,
    CONTENT_EDIT_DETAILS,
    CONTENT_EDIT_PERMISSIONS,
    CONTENT_MOVE_ITEM,
    CONTENT_SHARE_LINK,
    CONTENT_SHOW_IMAGE
} from "../../actions/dialogActions";
import {API_ORIGIN} from "../../../core/action/apiCallActions";
import {DRIVE_API_BASE} from "../../actions/driveApi";
import {textEllipsis} from "../../../utils/stringUtils";
import {fileTypes} from "../../actions/fileTypeDictionary";
import {getThumbnailUrl, THUMB_SMALL} from "../../actions/imageActions";
import Checkbox from "@material-ui/core/Checkbox";


const styles = (theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: theme.spacing(1),
        width: 100,
        //height: 60,
        [theme.breakpoints.down('sm')]: {
            width: 80,
            //height: 50,
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
    checkbox: {
        position: "absolute",
        alignSelf: "flex-start",
        backgroundColor: "white",
        zIndex: theme.zIndex.appBar,
    },
    disabled: {
        filter: "grayscale(100%)",
    }
});


class DriveItem extends Component {


    constructor(props) {
        super(props);
        this.showItemOptions = this.showItemOptions.bind(this);
        this.showItemCheckbox = this.showItemCheckbox.bind(this);
        this.hideItemCheckbox = this.hideItemCheckbox.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.renderItemIcon = this.renderItemIcon.bind(this);
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
        this.handleItemEditClick = this.handleItemEditClick.bind(this);
        this.handleItemShareClick = this.handleItemShareClick.bind(this);
        this.handleItemPermissionsClick = this.handleItemPermissionsClick.bind(this);
        this.handleItemDeleteClick = this.handleItemDeleteClick.bind(this);
        this.handleItemMoveClick = this.handleItemMoveClick.bind(this);
        this.handleFileClick = this.handleFileClick.bind(this);
        this.state = {
            hovered: false,
            menuOpen: false,
            menuAnchor: {
                top: 0,
                left: 0,
            },
        };
    }

    showItemOptions(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            menuOpen: true,
            menuAnchor: {
                left: e.clientX,
                top: e.clientY,
            },
        });
    }

    showItemCheckbox() {
        this.setState({
            ...this.state,
            hovered: true,
        })
    }

    hideItemCheckbox() {
        this.setState({
            ...this.state,
            hovered: false,
        })
    }

    handleCheckboxClick() {
        const {item, checked, onSelect, onDeselect} = this.props;
        if (checked) {
            onDeselect(item);
        } else {
            onSelect(item);
        }
    }

    closeMenu() {
        this.setState({...this.state, menuOpen: false});
    }

    handleItemEditClick() {
        const {item, actions} = this.props;
        actions.dialog.open(CONTENT_EDIT_DETAILS, item);
        this.closeMenu();
    }

    handleItemShareClick() {
        const {item, actions} = this.props;
        actions.dialog.open(CONTENT_SHARE_LINK, item);
        this.closeMenu();
    }

    handleItemPermissionsClick() {
        const {item, actions} = this.props;
        actions.dialog.open(CONTENT_EDIT_PERMISSIONS, item);
        this.closeMenu();
    }

    handleItemDeleteClick() {
        const {item, actions} = this.props;
        actions.dialog.open(CONTENT_DELETE_ITEM, item);
        this.closeMenu();
    }

    handleItemMoveClick() {
        const {item, actions} = this.props;
        actions.dialog.open(CONTENT_MOVE_ITEM, item);
        this.closeMenu();
    }

    handleFileClick() {
        const {item, actions} = this.props;

        if (item.mimeType.startsWith("image")) {
            actions.dialog.open(CONTENT_SHOW_IMAGE, item);
        } else {
            window.location.href = API_ORIGIN + DRIVE_API_BASE + "/file/" + item.id + "/data";
        }
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
        if (disabled) {
            iconClasses.push(classes.disabled)
        }

        return (
            <img alt={item.name} src={imageSource} className={iconClasses.join(' ')} onClick={this.handleFileClick}/>
        );
    }

    render() {
        const {classes, item, key, checked, selectedAlone} = this.props;
        const {menuAnchor, menuOpen, hovered} = this.state;
        const disabled = Object.keys(item.permissions).length === 0;

        return (
            <Box key={key} className={classes.root}
                 onContextMenu={this.showItemOptions}
                 onMouseEnter={this.showItemCheckbox}
                 onMouseLeave={this.hideItemCheckbox}
            >
                {(hovered || checked) ? (
                    <Checkbox className={classes.checkbox} checked={checked} onChange={this.handleCheckboxClick}/>
                ) : null}

                <Tooltip title={item.name}>
                    {this.renderItemIcon(disabled)}
                </Tooltip>
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
                    {(selectedAlone) ? (
                            <div>
                                <Link target={"_blank"} color={"inherit"}
                                      href={API_ORIGIN + DRIVE_API_BASE + "/" + item.type + "/" + item.id + "/data"}>
                                    <MenuItem key={"download"}>Download</MenuItem>
                                </Link>
                                <MenuItem key={"edit"} onClick={this.handleItemEditClick}>Properties</MenuItem>
                                <MenuItem key={"share"} onClick={this.handleItemShareClick}>Create share link</MenuItem>
                                <MenuItem key={"permissions"}
                                          onClick={this.handleItemPermissionsClick}>Permissions</MenuItem>
                            </div>
                        )
                        : null}
                    <MenuItem key={"move"} onClick={this.handleItemMoveClick}>Move</MenuItem>
                    <MenuItem key={"delete"} onClick={this.handleItemDeleteClick}>Delete</MenuItem>
                </Menu>
            </Box>
        );
    }
}


export default withStyles(styles, {withTheme: true})(DriveItem);