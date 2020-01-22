
export const UPDATE_QUEUE = "driveSetItemQueue";
export const CLEAR_ITEM_QUEUE = "driveClearItemQueue";
export const QUEUE_PROCESSED = "driveItemQueueProcessed";
export const QUEUE_ITEM_FETCH = "driveQueuedItemFetch";
export const QUEUE_ITEM_SUCCESS = "driveQueuedItemSuccess";
export const QUEUE_ITEM_ERROR = "driveQueuedItemError";

export const allItemsProcessed = () => {
    return {
        type: QUEUE_PROCESSED
    };
};


export const clearItemQueue = () => {
    return {
        type: CLEAR_ITEM_QUEUE
    };
};

export const itemFetchingAction = (item) => {
    return () => ({
        type: QUEUE_ITEM_FETCH,
        filename: item.name
    });
};

export const itemFetchSuccessAction = (item) => {
    return () => ({
        type: QUEUE_ITEM_SUCCESS,
        filename: item.name
    });
};

export const itemFetchFailedAction = (item) => {
    return () => ({
        type: QUEUE_ITEM_ERROR,
        filename: item.name
    });
};