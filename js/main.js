(function(){

  var x,
      voices,
      num
      demo_text = 'Type your text here.';

  $('.tooltipped').tooltip();

  if (!'speechSynthesis' in window) {
    alert('Your browser doesn\'t support Speech Synthesis so this page won\'t be much fun. Sorry.');
    return false;
  }

  // Populate volume
  for (var x = 0; x <= 10; x++) {
    num = Math.round(0.1 * x * 100) / 100;
    $('<option/>').text(num).val(num).appendTo('#speech-volume');
  }
  $('#speech-volume').val(1);

  // Populate rate
  for (var x = 1; x <= 200; x++) {
    num = Math.round(0.1 * x * 100) / 100;
    $('<option/>').text(num).val(num).appendTo('#speech-rate');
  }
  $('#speech-rate').val(1);

  // Populate pitch
  for (var x = 0; x <= 2; x++) {
    $('<option/>').text(x).val(x).appendTo('#speech-pitch');
  }
  $('#speech-pitch').val(2);

  $('#speech-form').on('submit', function (e) {
    e.preventDefault();

    if (!voices) {
      alert('Voices haven\'t loaded yet.');
      return false;
    }

    var msg = new SpeechSynthesisUtterance(),
      input_str = $('#speech-input').val()
      voice_id = $('#speech-voice').val();

    if (voice_id !== 'default') {
      msg.voice = voices[voice_id];
    }

    msg.volume = $('#speech-volume').val();
    msg.rate   = $('#speech-rate').val();
    msg.pitch  = $('#speech-pitch').val();
    msg.text   = input_str;

    window.speechSynthesis.speak(msg);

    msg.onend = function (e) {
      console.log('Message ends.');
    }
  });

  // voices are loade async. when loaded...
  window.speechSynthesis.onvoiceschanged = function() {
    var x = 0,
      elem,
      voice_list = $('#speech-voice').text('');

    voices = window.speechSynthesis.getVoices(),

    speechSynthesis.getVoices().forEach(function(voice) {

      elem = $('<option/>').val(x).text(voice.name);

      if (voice.default) {
        elem.attr('selected', true);
      }

      voice_list.append(elem);
      
      x++;
    });

    $('#speak').removeAttr('disabled');
    $('#speech-input').removeAttr('disabled').val(demo_text);
  };

})();
