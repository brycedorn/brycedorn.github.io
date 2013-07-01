$(document).ready ( function(){
  setInterval(function() {
    var canvas = document.getElementById('bars'),
      ctx = canvas.getContext('2d'),
      barwidth = 3,
      channels,
      rate,
      frameBufferLength,
      fft;

    // Clear the canvas before drawing spectrum
    ctx.clearRect(0,0, canvas.width, canvas.height);

    for (var i = 0; i < 340; i++ ) {
      var j = Math.random();
      j *= 200;
      // Draw rectangle bars for each frequency bin
      ctx.fillRect(i * barwidth * 2, canvas.height, barwidth, -j);
    }
  },100);
});