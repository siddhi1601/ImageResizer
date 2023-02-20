const inputcanvas = document.getElementById("inputcanvas")
const ctx1 = inputcanvas.getContext("2d")

const outputcanvas = document.getElementById("outputcanvas")
const ctx2 = outputcanvas.getContext("2d")

const imWidth = document.getElementById("width").value
const imHeight = document.getElementById("height").value

function loadImage(event) {
    const image = document.getElementById("inputimg")
    image.src = URL.createObjectURL(event.target.files[0])
}

//Function for preview button to preview an uploaded image
const preview = document.getElementById("prevbtn")
preview.addEventListener("click", prev)

function prev() {
    const image = document.getElementById("inputimg")
    var scale = Math.min(inputcanvas.width / image.width, inputcanvas.height / image.height)
    
    var x = (inputcanvas.width / 2) - (image.width / 2) * scale
    var y = (inputcanvas.height / 2) - (image.height / 2) * scale
    ctx1.drawImage(image, x, y, image.width * scale, image.height * scale)
}

//Function to resize an uploaded image
const resize = document.getElementById("resizebtn")
resize.addEventListener("click", resizeImg)

function resizeImg(){
    const imWidth = document.getElementById("width").value
    const imHeight = document.getElementById("height").value
    let src = cv.imread('inputimg')
    let dst = new cv.Mat()
    let dsize = new cv.Size(parseInt(imWidth),parseInt(imHeight))
    cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA)
    cv.imshow('outputcanvas', dst)
    src.delete()
    dst.delete()

}

//Function to download the resized image
const down = document.getElementById("downbtn")
down.addEventListener("click", downloadImage)

function downloadImage(){
    if(window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(outputcanvas.msToBlob(), "resizedImage.png")
    } 
    else {

        const a = document.createElement("a")
        document.body.appendChild(a);
        a.href = outputcanvas.toDataURL()

        a.download = "resizedImage.png"
        a.click()

        document.body.removeChild(a)
    }
    window.location.reload()
}