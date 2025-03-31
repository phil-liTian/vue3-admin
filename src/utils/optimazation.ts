/*
 * @author: phil.li
 */
function ajaxFn(timestamp) {
	return () =>
		new Promise((resolve, reject) => {
			setTimeout(() => {
				console.log(timestamp);
				resolve(timestamp);
			}, timestamp);
		});
}

const promiseArr = [
	ajaxFn(1000),
	ajaxFn(1000),
	ajaxFn(1000),
	ajaxFn(1000),
	ajaxFn(1000),
];
const promiseArr1 = [
	ajaxFn(1000),
	ajaxFn(1000),
	ajaxFn(3000),
	ajaxFn(2000),
	ajaxFn(1000),
];

async function asyncPool(limit, promiseArr) {
	let executing = [];
	let allPromise = [];
	for (const fn of promiseArr) {
		const res = await fn();

		executing.push(res);
		allPromise.push(res);
		if (limit <= promiseArr.length) {
			// 需要处理高并发请求
			res.then(() => {
				// const index = executing.indexOf(res);
				// executing.splice(index, 1);
				executing = executing.filter((item) => item !== res);
			});

			if (executing.length >= limit) {
				await Promise.race(executing);
			}
		}
	}

	return Promise.all(allPromise);
}

// asyncPool(2, promiseArr)
// asyncPool(2, promiseArr1).then((res) => {
//   console.log('所有请求响应结束', res);
// })

export { asyncPool };
