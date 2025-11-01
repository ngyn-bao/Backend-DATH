export function indexOfMax(arr) {
	if (arr.length === 0) {
		return -1;
	}

	var max = arr[0];
	var maxIndex = [];

	for (var i = 1; i < arr.length; i++) {
		if (arr[i] > max) {
			maxIndex = [];
			maxIndex.push(i);
			max = arr[i];
		}
		else if (arr[i] === max) {
			maxIndex.push(i);
		}
	}

	return maxIndex;
}
