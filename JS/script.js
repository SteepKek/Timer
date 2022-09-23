window.addEventListener('DOMContentLoaded', () => {
	const deadLine = '2022-09-23T21:00';

	function calculateTime(endtime) {
		let days, hours, minutes, seconds;
		const t = Date.parse(endtime) - Date.parse(new Date());
		if (t <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		}
		else {
			days = Math.floor(t / (1000 * 60 * 60 * 24));
			hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			minutes = Math.floor((t / (1000 * 60)) % 60);
			seconds = Math.floor((t / 1000) % 60);
		}
		return {
			total: t,
			days,
			hours,
			minutes,
			seconds,
		};
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			updateTime = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = calculateTime(endtime);

			days.innerHTML = zeroAdder(t.days);
			hours.innerHTML = zeroAdder(t.hours);
			minutes.innerHTML = zeroAdder(t.minutes);
			seconds.innerHTML = zeroAdder(t.seconds);

			if (t.total <= 0) {
				clearInterval(updateTime);
			}
		}
		function zeroAdder(num) {
			if (num >= 0 && num < 10) {
				return `0${num}`;
			}
			else {
				return num;
			}
		}
	}

	setClock('.timer', deadLine);
});