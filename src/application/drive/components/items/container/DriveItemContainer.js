import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";
import {Box} from "@material-ui/core";
import DriveItem from "../DriveItem";


const styles = () => ({
    root: {
        flex: "1 1 auto",
        height: "100%",
        overflow:"auto",
    },
    content: {
        display:"flex",
        flexDirection:"row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
    }
});

class DriveItemContainer extends Component {


    constructor(props, context) {
        super(props, context);
        this.selectItem = this.selectItem.bind(this);
        this.deselectItem = this.deselectItem.bind(this);
    }

    selectItem(item){
        const {selectedItems, actions} = this.props;
        actions.itemQueue.enqueue(selectedItems.concat([item]));
    }

    deselectItem(item){
        const {selectedItems, actions} = this.props;
        actions.itemQueue.enqueue(selectedItems.filter(i => i.id !== item.id));
    }

    render() {
        const {classes, items, actions, selectedItems} = this.props;

        return (
            <Box className={classes.root}>
                <Box className={classes.content}>
                    {items.map((item) => {
                        const checked = selectedItems.filter(queueItem => queueItem.id === item.id).length > 0;
                        const selectedAlone = selectedItems.length <= 1;
                        return (
                            <DriveItem
                                key={item.id}
                                item={item}
                                checked={checked}
                                actions={actions}
                                selectedAlone={selectedAlone}
                                onSelect = {this.selectItem}
                                onDeselect={this.deselectItem}
                            />
                        )})}
                </Box>
            </Box>
        );
    }
}

export default withStyles(styles, {withTheme: false})(DriveItemContainer);