const programScene = nodecg.Replicant('obs:programScene');
const previewScene = nodecg.Replicant('obs:previewScene');
const recordingState = nodecg.Replicant('recording');

//
//	View Logic
//

programScene.on('change', (newValue, oldValue) => {
    if (typeof(newValue) === "object") {
    	document.getElementById("program_scene").innerHTML = newValue.name;
    }
})

previewScene.on('change', (newValue, oldValue) => {
    if (typeof(newValue) === "object") {
    	document.getElementById("preview_scene").innerHTML = newValue.name;
    }
})

recordingState.on('change', (newValue, oldValue) => {
    if (newValue.recording === true) {
        $('#recording_toggle').val("Stop Recording");
    } else {
        $('#recording_toggle').val("Start Recording");
    }
})

//
//	Controller Logic
//

$(".preview").click(function(){
	const sceneName = $(this).data('scene');

   nodecg.sendMessage('obs:previewScene', sceneName).then(() => {
       console.log('successfully previewed ' + sceneName);
   }).catch(err => {
       console.error('failed to preview ' + sceneName + ':', err);
   });
});

$(".transition").click(function(){
	console.log($(this).data('transition'))
	
   nodecg.sendMessage('obs:transition', {name: $(this).data('transition')}).then(() => {
       console.log('successfully started a transition');
   }).catch(err => {
       console.error('failed to start transition', err);
   });
});

$("#recording_toggle").click(function(){  
  if (recordingState.value.recording == false) {
     nodecg.sendMessage('obs:startRecording').then(() => {
         console.log('successfully started recording');
         recordingState.value = {recording: true};
     }).catch(err => {
         console.error('failed to start recording', err);
     });
  } else {
      nodecg.sendMessage('obs:stopRecording').then(() => {
          console.log('successfully stopped recording');
          recordingState.value = {recording: false};
      }).catch(err => {
          console.error('failed to stop recording', err);
      });
  }
});