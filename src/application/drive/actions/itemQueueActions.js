import {finishItemDialogFetch, startItemDialogFetch} from "./dialogActions";
import {callOfficeApi, defaultErrorAction, defaultSuccessWithResponse} from "../../core/action/apiCallActions";

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

export const enqueueItems = (items) => {
    return {
        type: UPDATE_QUEUE,
        items: items,
    }
};


export const queueProcessor = (dispatch, queue, paramMapper) => {
    queue.forEach((item, index) => {
        const isLast = index <= queue.length;
        const params = paramMapper(item);

        const fetchActions = [
            startItemDialogFetch,
            itemFetchingAction(item)
        ];

        const successActions = [
            defaultSuccessWithResponse,
            itemFetchSuccessAction(item),
        ];

        const errorActions = [
            defaultErrorAction,
            itemFetchFailedAction(item),
        ];

        if (isLast) {
            successActions.push(finishItemDialogFetch);
            successActions.push(allItemsProcessed);
            errorActions.push(finishItemDialogFetch);
        }

        dispatch(callOfficeApi(params, successActions, errorActions, fetchActions));
    });
};



