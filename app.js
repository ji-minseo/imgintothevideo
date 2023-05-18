let video, cl, ctxl, c_tmp, ctx_tmp;
function init() {
  video = document.getElementById('video')

  cl = document.getElementById('output-canvas')
  ctxl = cl.getContext('2d')

  c_tmp = document.createElement('canvas')
  c_tmp.setAttribute('width', 800)
  c_tmp.setAttribute('height', 1200)
  ctx_tmp = c_tmp.getContext('2d')

  video.addEventListener('play', computeFrame)
}

function computeFrame() {
  ctx_tmp.drawImage(video, 0, 0, video.videoWidth/10, video.videoHeight/5)
  let frame = ctx_tmp.getImageData(0, 0, video.videoWidth/10, video.videoHeight/5)
  
  for (let i = 0; i < frame.data.length / 4; i++) {
    let r = frame.data[i * 4 + 0]
    let g = frame.data[i * 4 + 1]
    let b = frame.data[i * 4 + 2]
    if (r > 40 && r < 90 && g > 100 && g < 200 && b > 10 && b < 170) {
      frame.data[i * 4 + 3] = 0
    }
  
  }



  ctxl.putImageData(frame, 0, 0)
  setTimeout(computeFrame, 0)
}

document.addEventListener("DOMContentLoaded", () => {
  init()
})