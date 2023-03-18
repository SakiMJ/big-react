import { Container } from 'hostConfig';
import { FiberNode, FiberRootNode } from './fiber';
import { HostRoot } from './workTags';
import {
    UpdateQueue,
    createUpdate,
    createUpdateQueue,
    enqueueUpdate
} from './updateQueue';
import { ReactElment } from 'shared/ReactTypes';

export function createContainer(container: Container) {
    const hostRootFiber = new FiberNode(HostRoot, {}, null);
    const root = new FiberRootNode(container, hostRootFiber);

    hostRootFiber.updateQueue = createUpdateQueue();
    return root;
}
export function updateContainer(
    element: ReactElment | null,
    root: FiberRootNode
) {
    const hostRootFiber = root.current;
    const update = createUpdate<ReactElment | null>(element);
    enqueueUpdate(
        hostRootFiber.updateQueue as UpdateQueue<ReactElment | null>,
        update
    );

    scheduleUpdateOnFiber(hostRootFiber);
    return element;
}
