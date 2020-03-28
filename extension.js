const {OBSUtility} = require('nodecg-utility-obs');
module.exports = function (nodecg) {
    const nowPlayingReplicant = nodecg.Replicant("now-playing");

    nodecg.listenFor('obs:transitioning', data => {
        nowPlayingReplicant.value = data.sceneName.toLowerCase().includes("holding");
    });

    const obs = new OBSUtility(nodecg);

    nodecg.listenFor('obs:startRecording', async (_data, callback) => {
        try {
            await obs.send('StartRecording');
            if (callback && !callback.handled) {
                callback();
            }
        } catch (error) {
            console.log('Error starting recording:', error);
            if (callback && !callback.handled) {
                callback(error);
            }
        }
    });

     nodecg.listenFor('obs:stopRecording', async (_data, callback) => {
        try {
            await obs.send('StopRecording');
            if (callback && !callback.handled) {
                callback();
            }
        } catch (error) {
            console.log('Error stopping recording:', error);
            if (callback && !callback.handled) {
                callback(error);
            }
        }
    });

    obs.on("ConnectionOpened", () => {
    	obs.on('PreviewSceneChanged', data => {
    	    data.sources.forEach(source => {
    	    	if (source.type == 'vlc_source') {
    	    		obs.send('GetSourceSettings', {sourceName: source.name, sourceType: 'vlc_source'}).then(data => {
    	    			data.sourceSettings.playlist.forEach(item => {
    	    				if(item.value.startsWith('rtmp://')) {
    	    					reloadStream(source.name, item.value)
    	    				}
    	    			})
    	    		})
    	    	}
    	    });
    	});

    	function delay(t, v) {
    	   return new Promise(function(resolve) { 
    	       setTimeout(resolve.bind(null, v), t)
    	   });
    	}

    	function reloadStream(sourceName, streamURL) {
    		const stopSettings = {
    			loop: false,
    			playback_behaviour: 'stop_restart',
    			playlist: [
    				{
    					hidden: false,
    					selected: false,
    					value: streamURL
    				}
    			]
    		};

    		const startSettings = {
    			loop: false,
    			playback_behaviour: 'always_play',
    			playlist: [
    				{
    					hidden: false,
    					selected: false,
    					value: streamURL
    				}
    			]
    		}

    		return obs.send('SetSourceSettings', {sourceName: sourceName, sourceType: 'vlc_source', sourceSettings: stopSettings}).then(data => {
    			return delay(50).then(function() {
    		        return obs.send('SetSourceSettings', {sourceName: sourceName, sourceType: 'vlc_source', sourceSettings: startSettings});
    		    });
    		})
    	}
    })
}
