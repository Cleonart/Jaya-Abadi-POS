export function start(alert_){
	alert_.fire({
		icon: 'warning',
		title: 'Mohon tunggu',
		text: 'Memproses data...',
		allowOutsideClick: false,
		showConfirmButton: false,
		timerProgressBar: true,
		onBeforeOpen: () => {
			alert_.showLoading()
		},
	});
}

export function stop(alert_){
	alert_.close();
}