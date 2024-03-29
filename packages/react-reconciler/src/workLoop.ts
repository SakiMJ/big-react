import { FiberNode, FiberRootNode, createWorkInProgress } from './fiber';
import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { HostRoot } from './workTags';

let workInProgress: FiberNode | null = null;

function prepareFreshStack(root: FiberRootNode) {
	workInProgress = createWorkInProgress(root.current, {});
} //让当前的workInprogress 指向要执行的第一个fiberNode

export function scheduleUpdateOnFiber(fiber: FiberNode) {
	//调度功能
	const root = markUpdateFromFiberToRoot(fiber);
	renderRoot(root);
}

function markUpdateFromFiberToRoot(fiber: FiberNode) {
	let node = fiber;
	let parent = node.return;

	while (parent !== null) {
		node = parent;
		parent = node.return;
	}

	if (node.tag === HostRoot) {
		return node.stateNode;
	}

	return null;
}

function renderRoot(root: FiberRootNode) {
	prepareFreshStack(root);

	do {
		try {
			workLoop();
			break;
		} catch (error) {
			workInProgress = null;
		}
	} while (true);
	function workLoop() {
		while (workInProgress !== null) {
			perFormUnitOfWork(workInProgress);
		}
	}
	function perFormUnitOfWork(fiber: FiberNode) {
		const next = beginWork(fiber);
		fiber.memoizedProps = fiber.pendingProps;
		if (next === null) {
			completeUnitOfWork(fiber);
		} else {
			workInProgress = next;
		}
	}

	function completeUnitOfWork(fiber: FiberNode) {
		let node: FiberNode | null = fiber;

		do {
			completeWork(node);

			const sibling = node.sibling;
			if (sibling !== null) {
				workInProgress = node.sibling;
				return;
			}

			node = node.return;
			workInProgress = node;
		} while (node !== null);
	}
}
