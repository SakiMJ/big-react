import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	Type,
	Key,
	Ref,
	Props,
	ElementType,
	ReactElment
} from 'shared/ReactTypes';

const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElment {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'ly'
	};
	return element;
};

export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	let key: Key = '';
	let ref: Ref = null;
	const props: Props = null;

	for (const prop in config) {
		const value = config[prop];

		if (prop === 'key') {
			if (value !== undefined) {
				key = '' + value;
			}
		}
		if (prop === 'ref') {
			if (value !== undefined) {
				ref = '' + value;
			}
		}

		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = value;
		}

		const maybeChildrenLength = maybeChildren.lengh;
		if (maybeChildrenLength) {
			if (maybeChildrenLength === 1) {
				props.children = maybeChildren[0];
			} else {
				props.children = maybeChildren;
			}
		}
	}

	return ReactElement(type, key, ref, props);
};

export const jsxDEV = jsx;
