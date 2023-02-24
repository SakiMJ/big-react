import { Props, Key } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
export class FiberNode {
	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		// pendingProps fiberNode接下来有哪些状态要改变
		//key ReactELmentKey

		this.tag = tag; //实例属性
	}
}
