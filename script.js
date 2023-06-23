const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress__filled');
const toggleButton = document.querySelector('.player__button');
const volumeSlider = document.querySelector('input[name="volume"]');
const playbackSpeedSlider = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll('[data-skip]');

function togglePlay() {
	if (video.paused) {
		video.play();
	}else{
		video.pause();
	}
}

function updateToggleButton() {
	const icon = video.paused ? '►' : '❚ ❚';
	toggleButton.innerContent = icon;
}

function handleVolumeChange() {
	video.volume = volumeSlider.value;
}

function handlePlaybackSpeedChange() {
	video.playbackRate = playbackSpeedSlider.value;
}

function handleSkip() {
	const skipSeconds = parseFloat(this.dataset.skip);
	video.currentTime += skipSeconds;
}

function handleProgress() {
	const progressPercentage = (video.currentTime / video.duration) * 100;
    progress.style.flexBasis = `${progressPercentage}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateToggleButton);
video.addEventListener('pause', updateToggleButton);
video.addEventListener('timeUpdate', handleProgress);

toggleButton.addEventListener('click', togglePlay);

volumeSlider.addEventListener('input', handleVolumeChange);

playbackSpeedSlider.addEventListener('input', handlePlaybackSpeedChange);

skipButtons.forEach(button => button.addEventListener('click', handleSkip));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false)