let video, img, cl, ctxl, c_tmp, ctx_tmp, input, imagesArray, imgWidth, imgHeight, frame3, frame2, frame4, ctx_tmp2;
function init() {
  video = document.getElementById('video')

  cl = document.getElementById('output-canvas')
  ctxl = cl.getContext('2d')
  input = document.querySelector("input")
  imagesArray = []


  img = new Image();

  img.src = "/asset/img.png"

  imgWidth = img.height
  imgHeight = img.width

  c_tmp = document.createElement('canvas')
  c_tmp.setAttribute('width', 800)
  c_tmp.setAttribute('height', 1200)
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
  ctx_tmp.drawImage(video, 0, 0, video.videoWidth/10, video.videoHeight/5)
  let frame = ctx_tmp.getImageData(0, 0, video.videoWidth/10, video.videoHeight/5)
  frame3 = ctx_tmp.createImageData(video.videoWidth/10, video.videoHeight/5);


  ctx_tmp.drawImage(img, 0, 0, imgWidth/5, imgHeight/3)
  frame2 = ctx_tmp.getImageData(0, 0, imgWidth, imgHeight)
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
      translateImg(startX)
      setTimeout(() => {
        frame4 = ctx_tmp2.getImageData(0, 0, video.videoWidth/10, video.videoHeight/5)

        frame.data[i * 4 + 0] = frame4.data[i * 4 + 0]
        frame.data[i * 4 + 1] = frame4.data[i * 4 + 1]
        frame.data[i * 4 + 2] = frame4.data[i * 4 + 2]
  
      },30)
    }
  }
  ctxl.putImageData(frame, 0, 0)
  setTimeout(computeFrame, 0)
}

function translateImg(startX) {
  for (let y = 0; y < frame2.height; y++) {
    for (let x = 0; x < frame2.width; x++) {
      // 현재 픽셀의 인덱스 계산
      const index = (y * frame2.width + x) * 4;
  
      // 이동된 좌표의 픽셀 값을 가져와서 임시 배열에 저장합니다.
      frame3.data[startX * 4] = frame2.data[index];
      frame3.data[startX * 4 + 1] = frame2.data[index + 1];
      frame3.data[startX * 4 + 2] = frame2.data[index + 2];
      frame3.data[startX * 4 + 3] = frame2.data[index + 3];

      ctx_tmp2.putImageData(frame3, 0, 0);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  init()
})