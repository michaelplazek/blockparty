
export function getIsLocationSet() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(isSet, isNotSet);
	} else {
		return false;
	}
}

function isSet(position) {
	return true;
}

function isNotSet(error) {
	return false;
}