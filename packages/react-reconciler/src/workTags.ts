export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText;

export const FunctionComponent = 0;
export const HostRoot = 0; //根渲染节点
export const HostComponent = 5; //div对应的fiberNode
export const HostText = 6;
