import { Action } from 'shared/ReactTypes';

export interface Update<State> {
    action: Action<State>;
}

export interface UpdateQueue<State> {
    shared: {
        pending: Update<State> | null;
    };
}

export const createUpdate = <State>(action: Action<State>): Update<State> => {
    //创建update实例
    return {
        action
    };
};

export const createUpdateQueue = <State>() => {
    return {
        shared: {
            pending: null
        }
    } as UpdateQueue<State>;
};

export const enqueueUpdate = <State>(
    upDateQueue: UpdateQueue<State>,
    upDate: Update<State>
) => {
    upDateQueue.shared.pending = upDate;
};

export const processUpdateQueue = <State>(
    baseState: State, //初始状态
    pendingUpdate: Update<State> | null //要消费的update
): { memoizedState: State } => {
    const result: ReturnType<typeof processUpdateQueue<State>> = {
        memoizedState: baseState
    };
    if (pendingUpdate !== null) {
        const action = pendingUpdate.action;
        if (action instanceof Function) {
            result.memoizedState = action(baseState);
        } else {
            result.memoizedState = action;
        }
    }

    return result;
};
