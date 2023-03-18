import { Props, Key, Ref } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from 'hostConfig';
export class FiberNode {
	type: any;
	tag: WorkTag;
	pendingProps: Props;
	key: Key;
	stateNode: any;
	ref: Ref;

	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;

	memoizedProps: Props | null;
	memoizedState: any;
	alternate: FiberNode | null;
	updateQueue: unknown;
	flags: Flags;

	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		// pendingProps fiberNode接下来有哪些状态要改变
		//key ReactELmentKey

		this.tag = tag; //实例属性
		this.key = key;
		this.stateNode = null;
		this.type = null;

		//树状结构
		this.return = null;
		this.sibling = null;
		this.child = null;
		this.index = 0;

		this.ref = null;

		//作为工作单元
		this.pendingProps = pendingProps;
		this.memoizedProps = null;
		this.alternate = null;
		this.updateQueue = null;
		this.memoizedState = null;
		//副作用
		this.flags = NoFlags;
	}
}
//current: 指hostRootFiber  finishedWork: 指向更新完成之后的hostRootFiber
export class FiberRootNode {
	container: Container;
	current: FiberNode;
	finishedWork: FiberNode | null;
	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container; //宿主环境
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
	}
}
