let video, img, cl, ctxl, c_tmp, ctx_tmp, input, imagesArray, imgWidth, imgHeight, ratiox, ratioy, ctx_tmp2;
function init() {
  video = document.getElementById('video')

  cl = document.getElementById('output-canvas')
  ctxl = cl.getContext('2d')
  input = document.querySelector("input")
  imagesArray = []
  
  ratiox = 320
  ratioy = 300

  img = new Image();

  img.src = "/asset/img.png"

  imgWidth = img.height
  imgHeight = img.width

  c_tmp = document.createElement('canvas')
  c_tmp.setAttribute('width', 800)
  c_tmp.setAttribute('height', 1000)
  ctx_tmp = c_tmp.getContext('2d')
  ctx_tmp2 = c_tmp.getContext('2d')

  video.addEventListener('play', computeFrame)

  input.addEventListener("change", function() {
    const file = input.files
    imagesArray.push(file[0])
    console.log(URL.createObjectURL(input.files[0]))
    img.src = URL.createObjectURL(input.files[0])
  })
  
}

function computeFrame() {
  ctx_tmp.drawImage(video, 0, 0, video.videoWidth/10, video.videoHeight/4.5)
  let frame = ctx_tmp.getImageData(0, 0, video.videoWidth/10, video.videoHeight/4.5)


  ctx_tmp2.drawImage(img, 0, 0, img.width, img.height, 0,0,ratiox,ratioy)
  
  let frame2 = ctx_tmp2.getImageData(0, 0, video.videoWidth/10, video.videoHeight/4.5)
  let startX = 0;
  let endX = 0
  for (let i = 0; i < frame.data.length / 4; i++) {
    let r = frame.data[i * 4 + 0]
    let g = frame.data[i * 4 + 1]
    let b = frame.data[i * 4 + 2]
    if (r > 40 && r < 90 && g > 100 && g < 200 && b > 10 && b < 170) {
      if(startX == 0) {
        startX = i
        
      }
      // if(endX < i) endX = i
    


      frame.data[i * 4 + 0] = frame2.data[(i - startX) * 4 + 0]
      frame.data[i * 4 + 1] = frame2.data[(i - startX) * 4 + 1]
      frame.data[i * 4 + 2] = frame2.data[(i - startX) * 4 + 2]

      // frame.data[i * 4 + 0] = frame2.data[(i - (startX - endX)) * 4 + 0]
      // frame.data[i * 4 + 1] = frame2.data[(i - (startX - endX)) * 4 + 1]
      // frame.data[i * 4 + 2] = frame2.data[(i - (startX - endX)) * 4 + 2]


      // frame.data[i * 4 + 0] = frame2.data[(i * 4 - (startX * 4))* 4 ]
      // frame.data[i * 4 + 1] = frame2.data[(i * 4 + 1 - (startX  * 4 + 1))* 4 + 1]
      // frame.data[i * 4 + 2] = frame2.data[(i * 4 + 2 - (startX * 4 + 2)) * 4 + 2]
      // frame.data[i * 4 + 0] = frame2.data[(i - (startX - 446707)) * 4 + 0]
      // frame.data[i * 4 + 1] = frame2.data[(i - (startX - 446707)) * 4 + 1]
      // frame.data[i * 4 + 2] = frame2.data[(i - (startX - 446707)) * 4 + 2]

    }
  }
  // for(let i = startX; i < endX; i++) {
  //   let r = frame.data[i * 4 + 0]
  //   let g = frame.data[i * 4 + 1]
  //   let b = frame.data[i * 4 + 2]
    
  //   if (r > 40 && r < 90 && g > 100 && g < 200 && b > 10 && b < 170) {
  //     frame.data[i * 4 + 0] = frame2.data[(i - startX) * 4 + 0]
  //     frame.data[i * 4 + 1] = frame2.data[(i - startX) * 4 + 1]
  //     frame.data[i * 4 + 2] = frame2.data[(i - startX) * 4 + 2]


  //   }
  // }

    const ratio = (imgWidth * imgHeight)/((endX - startX) / 4)



  ctxl.putImageData(frame, 0, 0)
  setTimeout(computeFrame, 0)
}

document.addEventListener("DOMContentLoaded", () => {
  init()
})