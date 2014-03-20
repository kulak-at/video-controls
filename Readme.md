## Video Controls

This library provides easy way to embed video on a page with a stylable controls (like play/pause button, mute button, etc.) and with set of events. Uses native HTML5 video element and when it's unavailable, polyfills it with [html5media library](http://html5media.info/).

### Requirements
jQuery

### Quick start
To embed a video all you have to do is call:
```
$('#video').videoControls({
                autoPlay: true,
                clearContainer: false,
                controls: {
                    skip: true,
                    play: true,
                    mute: true
                },
                videoConfig: {
                    width: 100,
                    height: 200
                }
            })
```

#### Configuration
autoplay - whether a video should start automaticly or not

clearContainer - if true, the container is cleared from it's content

controls - defines which controls should be rendered. All controls are rendered in container with class *video-controls*. Available options are:
play - if true, inserts a button with class *video-control-play* that controls the playback
mute - inserts a button with class *video-control-mute* that mutes a video (and unmutes it after second click)
skip - adds a skip button with class *video-control-skip* - can be handled with a callback described below

Note that play and mute buttons have additional *active* class if are pushed (video is played or is muted).

videoConfig - an object with extra parameters that should be injected as parameters to a HTML5 video tag.

#### Events
onEnd(callback) - callback is called when video ends (user reachces the end)

onSkip(callback) - when skip button is pushed

onPlay(callback) - when play button is clicked - note that if a video has autoplay, it's not triggered.

onPause(callback) - when user pauses the video

onMute(callback)

onUnmute(callback)

onTimeupdate(callback) - fired while video is played, a callback gets a *ratio* argument that indicates the position in the video (in a range from 0 to 1).

onProgress(callback) - fired while video is downloaded. As timeupdate, gets a *ratio* argument (in range from 0 to 1). Note that user may watch the video while there is still a downloading process running.


#### Example
For a full working example look at the *examples* folder.