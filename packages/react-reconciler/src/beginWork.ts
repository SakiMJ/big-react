import { ReactElment } from 'shared/ReactTypes';
import { FiberNode } from './fiber';
import { UpdateQueue, processUpdateQueue } from './updateQueue';
import { HostComponent, HostRoot, HostText } from './workTags';
import { mountChildFibers, reconcilerChildFibers } from './childFibers';
export const beginWork = (wip: FiberNode) => {
	switch (wip.tag) {
		case HostRoot:
			updateHostRoot(wip);
			return;

		case HostComponent:
			updateHostComponent(wip);
			return;
		case HostText:
			return null;
		default:
			console.log('未定义');
			break;
	}
};

export const updateHostRoot = (wip: FiberNode) => {
	const baseState = wip.memoizedState;

	const updateQueue = wip.updateQueue as UpdateQueue<Element>;
	const pending = updateQueue.shared.pending;

	updateQueue.shared.pending = null;

	const { memoizedState } = processUpdateQueue(baseState, pending);

	wip.memoizedState = memoizedState;

	const nextChildren = wip.memoizedState;

	reconcilerChildren(wip, nextChildren);

	return wip.child;
};

export const updateHostComponent = (wip: FiberNode) => {
	const nextProps = wip.pendingProps;

	const nextChildren = nextProps.children;

	reconcilerChildren(wip, nextChildren);

	return wip.child;
};

function reconcilerChildren(wip: FiberNode, children?: ReactElment) {
	const current = wip.alternate;

	if (current !== null) {
		//update
		wip.child = reconcilerChildFibers(wip, current?.child, children);
	} else {
		//mount

		wip.child = mountChildFibers(wip, null, children);
	}
}
