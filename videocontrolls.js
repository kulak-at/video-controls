$.fn.videoControls = function(config) {
    
    var supports_video = function() {
        return !!document.createElement('video').canPlayType;
    }
    
    var on_end_callbacks = [];
    var on_pause_callbacks = [];
    var on_play_callbacks = [];
    var on_mute_callbacks = [];
    var on_unmute_callbacks = [];
    var on_skip_callbacks = [];
    var on_progress_callbacks = [];
    
    var callB = function(ar) {
        for(var i in ar)
            ar[i]();
    }
    
    // TODO: not calling it more than once.
    if(!supports_video()) {
        // polyfill
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://api.html5media.info/1.1.6/html5media.min.js';
        $('body').append(script);
    }
    
    // creating video
    var video = $('<video class="video-control-video"></video>');
    for(var attr in config.videoConfig) {
        video.attr(attr, config.videoConfig[attr]);
    }
    
    
    // rendering controls
    var controls = $('<div class="video-controls"></div>');
    if(config.controls.play)
        controls.append('<a href="#" class="video-control-play"></a>');
    
//    if(config.controls.pause)
//        controls.append('<a href="#" class="video-control-pause"></a>');
    
    if(config.controls.skip)
        controls.append('<a href="#" class="video-control-skip"></a>');
    
    if(config.controls.mute)
        controls.append('<a href="#" class="video-control-mute"></a>');
    
    isPlaying = config.autoPlay || false;
    if(isPlaying)
        controls.find('.video-control-play').addClass('active');
    
    
    
    controls.find('.video-control-play').on('click', function(e) {
        e.preventDefault();
        if(isPlaying) {

            video.get(0).pause();
            isPlaying = false;
            $(this).removeClass('active');
            callB(on_pause_callbacks);
        } else {
            video.get(0).play();
            isPlaying = true;
            $(this).addClass('active');
            callB(on_play_callbacks);
        }
    });
    
    var isMuted = false;
    controls.find('.video-control-mute').on('click', function(e) {
        e.preventDefault();
        if(isMuted) {
            video.get(0).muted = false;
            isMuted = false;
            $(this).removeClass('active');
            callB(on_unmute_callbacks);
        } else {
            video.get(0).muted = true;
            isMuted = true;
            $(this).addClass('active');
            callB(on_mute_callbacks);
        }
    });
    
    controls.find('.video-control-skip').on('click', function(e) {
        e.preventDefault();
        callB(on_skip_callbacks);
    });
    
    video.on('ended', function() {
        console.log('VIDEO ENDED');
        callB(on_end_callbacks);
    });
    
    video.on('timeupdate', function(e) {
        for(var i in on_progress_callbacks)
            on_progress_callbacks[i]( this.currentTime / this.duration );
    });
    
    
    // set-up: clearing container, etc.
    if(config.clearContainer)
        this.html('');
    
    
    
    var src = config.src || this.attr('data-src');
    var m = src.match(/(.*)(\{(.*)\})/);
    var prefix = m[1];
    var exts = m[3].split(',');
    for(var i in exts) {
        console.log(prefix + exts[i]);
        var mime = '';
        switch(exts[i]) {
            case 'ogg': mime = 'video/ogg'; break;
            case 'mp4': mime = 'video/mp4'; break;
            case 'webm': mime = 'video/webm'; break;
        }
        var source = $('<source></source');
        source.attr('src', prefix + exts[i]).attr('type', mime);
        video.append(source);
    }
    
    this.append(video);
    this.append(controls);
    
    
    if(config.autoPlay) {
        video.get(0).play();
    } // here something with autoplay
    
    
    
    
   
    return {
        onEnd: function(callback) {
            on_end_callbacks.push(callback);
            return this;
        },
        onPlay: function(callback) {
            on_play_callbacks.push(callback);
            return this;
        },
        onPause: function(callback) {
            on_pause_callbacks.push(callback);
            return this;
        },
        onSkip: function(callback) {
            on_skip_callbacks.push(callback);
            return this;
        },
        onMute: function(callback) {
            on_mute_callbacks.push(callback);
            return this;
        },
        onUnmute: function(callback) {
            on_unmute_callbacks.push(callback);
            return this;
        },
        onTimeupdate: function(callback) {
            on_progress_callbacks.push(callback);
        },
        isPlaying: function() {
            return isPlaying;
        },
        isMuted: function() {
            return isMuted;
        }
    };
};
