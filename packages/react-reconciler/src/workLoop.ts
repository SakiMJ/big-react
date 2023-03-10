import { FiberNode } from './fiber';

let workInProgress: FiberNode | null = null;
import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
function prepareFreshStack(fiber: FiberNode) {
	workInProgress = fiber;
} //让当前的workInprogress 指向要执行的第一个fiberNode

function renderRoot(root: FiberNode) {
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
