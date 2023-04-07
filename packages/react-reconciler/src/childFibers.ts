import { ReactElment } from 'shared/ReactTypes';
import { FiberNode, createFiberFormElement } from './fiber';
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import { HostText } from './workTags';
import { Placement } from './fiberFlags';

function childReconciler(shouldTrackEffects: boolean) {
	function reconcileSingleElement(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		element: ReactElment
	) {
		const fiber = createFiberFormElement(element);
		fiber.return = returnFiber;
		return fiber;
	}

	function reconcileSingleTextNode(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		content: string | number
	) {
		const fiber = new FiberNode(HostText, { content }, null);
		fiber.return = returnFiber;
		return fiber;
	}

	function placeSingleChild(fiber: FiberNode) {
		if (shouldTrackEffects && fiber.alternate === null) {
			fiber.flags != Placement;
		}

		return fiber;
	}

	return function reconcilerChildFibers(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		newChild?: ReactElment
	) {
		if (typeof newChild === 'object' && newChild != null) {
			if (newChild.$$typeof === REACT_ELEMENT_TYPE) {
				return placeSingleChild(
					reconcileSingleElement(returnFiber, currentFiber, newChild)
				);
			}
		}
		if (typeof newChild === 'string' && newChild != null) {
			return placeSingleChild(
				reconcileSingleTextNode(returnFiber, currentFiber, newChild)
			);
		}
	};
}

export const reconcilerChildFibers = childReconciler(true);
export const mountChildFibers = childReconciler(false);
