/**
 * @param {Function} func
 * @param {number} delay
 * @param {?boolean} execAsap
 * @returns {delayed}
 */
export function debounce(func, delay = 100, execAsap = false)
{
	let timeout;

	return function debounced()
	{
		let context = this, args = arguments;

		function delayed()
		{
			if (!execAsap)
			{
				func.apply(context, args);
			}

			timeout = null;
		}

		if (timeout)
		{
			clearTimeout(timeout);
		}
		else if (execAsap)
		{
			func.apply(context, args)
		}

		timeout = setTimeout(delayed, delay);
	};
}

/**
 *
 * @param {*} x
 * @returns {boolean}
 */
function existy(x)
{
	return x != null
}

function truthy(x)
{
	return (x !== false) && existy(x)
}

/**
 * @param {boolean} cond
 * @param {Function} action
 * @returns {*}
 */
export function doWhen(cond, action)
{
	if (truthy(cond))
	{
		return action();
	}
	else
	{
		return undefined;
	}
}

/**
 * @param {string} string
 * @param {number} length
 * @param {boolean} useWordBoundary
 * @returns {string}
 */
export function truncate(string, length, useWordBoundary)
{
	string = sanitize(string);
	if (!string || !string.length || string.length <= length)
	{
		return string;
	}

	const subString = string.substr(0, length - 1);
	return (useWordBoundary
		? subString.substr(0, subString.lastIndexOf(' '))
		: subString) + '...';
}

/**
 * @param {string} string
 * @returns {string}
 */
export const truncate31 = (text) => truncate(text, 31, false);

/**
 * @param {string} string
 * @returns {string}
 */
export const truncate21 = (text) => truncate(text, 21, false);

/**
 * @param {string} string
 * @returns {string}
 */
export function sanitize(string)
{
	return (string && string.length) ? string.replace('>', '&gt;').replace('<', '&lt') : string;
}
