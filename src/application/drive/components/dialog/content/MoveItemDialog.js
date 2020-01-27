import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {withSnackbar} from "notistack";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import withStyles from "@material-ui/styles/withStyles";
import FolderIcon from "@material-ui/icons/Folder";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import Typography from "@material-ui/core/Typography";


const styles = (theme) => ({
    root: {
        minWidth: 50 + "%",
        maxWidth: 100 + "%",
        [theme.breakpoints.down('sm')]: {
            maxWidth: 100 + "%",
        }
    },
    folders: {
        width: 100 + "%",
        overflow: "auto",
        maxHeight: 50 + "vh",
    },
    folderSelect: {
        width: 100 + "%",
        flexGrow: 1,
        minHeight: 40 + "vh",
        maxHeight: 80 + "vh",
        overflow: "auto",
    },
    folderLabel: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    selectedFolderLabel: {
        backgroundColor: theme.palette.action.selected
    },
    folderIcon: {
        marginRight: theme.spacing(1),
    },
});


class MoveItemDialog extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.updateDestination = this.updateDestination.bind(this);
        this.moveItem = this.moveItem.bind(this);
        this.renderFolderTree = this.renderFolderTree.bind(this);
        this.refreshFolderTree = this.refreshFolderTree.bind(this);
        this.state = {
            target: null
        };
    }


    componentDidMount() {
        this.refreshFolderTree();
    }

    refreshFolderTree() {
        const {actions, folder} = this.props;
        actions.folder.requestFolderTree(folder);
    }

    handleClose() {
        this.setState({...this.state, target: null});
        this.props.actions.dialog.close();
    }

    moveItem() {
        const {actions, itemQueue, enqueueSnackbar} = this.props;
        const {target} = this.state;

        if (target) {
            actions.itemQueue.process.toMove(itemQueue);
        } else {
            enqueueSnackbar("Select a folder first!", {variant: "warning"})
        }
    }

    updateDestination(folder) {
        return () => {
            this.setState({...this.state, target: folder});
        };
    }

    renderFolderTree(folderItem) {
        const {classes} = this.props;
        const isDeleted = Object.keys(folderItem.permissions).length === 0;
        const isSelected = folderItem.id === this.state.target;
        const iconColor = isDeleted ? "disabled" : "primary";

        let data = null;

        if (folderItem.content.length > 0) {
            data = folderItem.content.map(item => this.renderFolderTree(item));
        }
        return (
            <TreeItem
                nodeId={folderItem.id}
                label={
                    <div className={clsx(classes.folderLabel, {
                        [classes.selectedFolderLabel]: isSelected,
                    })}>
                        <FolderIcon className={classes.folderIcon} color={iconColor}/>
                        {folderItem.name}
                    </div>
                }
                onClick={this.updateDestination(folderItem)}
                children={data}
            />
        );
    }

    render() {
        const {classes, dialogItem, isDialogFetching, rootFolder} = this.props;

        return (
            <React.Fragment>
                <DialogTitle>
                    <IconButton disabled={isDialogFetching} onClick={this.refreshFolderTree}>
                        <RefreshIcon/>
                    </IconButton>
                    Move {dialogItem.type}
                </DialogTitle>
                <DialogContent className={classes.root}>
                    <Typography variant={"body1"}>Please select a folder to move: </Typography>
                    <div className={classes.folders}>
                        {!isDialogFetching && Object.keys(rootFolder).length > 0 ? (
                            <TreeView
                                defaultCollapseIcon={<ArrowDropDownIcon/>}
                                defaultExpandIcon={<ArrowRightIcon/>}
                                defaultEndIcon={<div style={{width: 24}}/>}
                            >
                                {this.renderFolderTree(rootFolder)}
                            </TreeView>
                        ) : (
                            <LinearProgress/>
                        )}
                    </div>
                    <Divider/>
                </DialogContent>
                <DialogActions>
                    <Button disabled={isDialogFetching} color={"primary"} onClick={this.moveItem}>Move</Button>
                    <Button disabled={isDialogFetching} color={"default"} onClick={this.handleClose}>Cancel</Button>
                </DialogActions>
            </React.Fragment>
        );
    }
}

export default withSnackbar(withStyles(styles, {withTheme: true})(MoveItemDialog));