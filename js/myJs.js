// let imgChild = document.createElement("img");
let imgGallery = document.getElementById("img_gallery");
let imgContent = document.getElementById('image_content')
// imgGallery.appendChild(imgChild)


// floatButton.addEventListener('mouseover',function (e) {
//     console.log("鼠标悬浮")
//     document.getElementById('menu1').style.visibility = 'visible'
// })
// floatButton.addEventListener('mouseleave',function (e) {
//     console.log("鼠标离开")
//     document.getElementById('menu1').style.visibility = 'hidden'
//
// })
const ScrollTop = (number = 0, time) => {
    if (!time) {
        document.body.scrollTop = document.documentElement.scrollTop = number;
        return number;
    }
    const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
    let spacingInex = time / spacingTime; // 计算循环的次数
    let nowTop = document.body.scrollTop + document.documentElement.scrollTop; // 获取当前滚动条位置
    let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
    let scrollTimer = setInterval(() => {
        if (spacingInex > 0) {
            spacingInex--;
            ScrollTop(nowTop += everTop);
        } else {
            clearInterval(scrollTimer); // 清除计时器
        }
    }, spacingTime);
};

document.getElementById('search_key').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        console.log('enter')
        searchImg()
    }
}, true)


function searchImg() {
    let keyWords = document.getElementById('search_key').value
    let size = document.getElementById('search_size').value
    if (keyWords.length === 0) {
        keyWords = 'flower'
        document.getElementById('search_key').value = keyWords
    }
    console.log(size);
    console.log(keyWords);
    imgGallery.innerHTML = ""
    let requestURL = "https://pixabay.com/api/?key=21039693-40d98fce614790ce1b9fefb04&q=" + encodeURI(keyWords) + "&per_page=" + size + "&pretty=true"
    // console.log(requestURL);

    let request = new XMLHttpRequest();
    request.open("get", requestURL)
    request.send()


    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            let all = request.responseText
            let json = JSON.parse(all);
            let hits = json.hits;
            for (let hite of hits) {
                let imgElement = document.createElement("img");
                let divElement = document.createElement('div');

                imgElement.src = hite.largeImageURL
                imgElement.style.height = '100%'
                imgElement.style.width = '100%'
                imgElement.style.borderRadius = '4px'
                imgElement.style.cursor = 'pointer'
                imgElement.addEventListener('click',function (e) {
                    toBlank(hite.pageURL)
                })

                divElement.appendChild(imgElement)
                divElement.className = 'card '
                divElement.style.margin = '4px'
                divElement.style.padding = "0"
                imgGallery.appendChild(divElement)
            }
        }
    }
}

function toBlank(url) {
    window.open(url,'_blank')
}

function requestGet() {
    // let requestURL = "https://pixabay.com/api/?key=21039693-40d98fce614790ce1b9fefb04&q=yellow+flowers&image_type=photo&pretty=true"
    // let request = new XMLHttpRequest();
    // request.open("get", requestURL)
    // request.send()
    if (imgContent.style.visibility === "visible") {
        imgContent.style.visibility = "hidden"
        imgGallery.innerHTML = ""
    } else {
        imgContent.style.visibility = "visible"
        searchImg()
        // request.onreadystatechange = function () {
        //     if (request.readyState === 4 && request.status === 200) {
        //         let all = request.responseText
        //         let json = JSON.parse(all);
        //
        //         let hits = json.hits;
        //         for (let hite of hits) {
        //             let imgElement = document.createElement("img");
        //             let divElement = document.createElement('div');
        //
        //             imgElement.src = hite.largeImageURL
        //             imgElement.style.height = '100%'
        //             imgElement.style.width = '100%'
        //             imgElement.style.borderRadius = '4px'
        //
        //             imgElement.className = ''
        //             divElement.appendChild(imgElement)
        //             divElement.className = 'card gallery_content'
        //             divElement.style.padding = "0"
        //
        //             imgGallery.appendChild(divElement)
        //             // console.log(hite.id);
        //         }
        //         // for (let i = 0; i < hits.length; i++) {
        //         //     let htmlImageElement = document.createElement("img");
        //         //     htmlImageElement.src = hits.previewURL
        //         //     imgGallery.appendChild(htmlImageElement)
        //         // }
        //         console.log(hits.length);
        //
        //         // let list = [1,2,3,4]
        //         // for (let number of list) {
        //         //     console.log(number);
        //         // }
        //
        //         // console.log(request.responseText)
        //         // document.getElementById("xml").textContent = json
        //         // window.open(requestURL,'_blank')
        //         // window.open(requestURL,'_self')
        //     }
        // }


    }

}
document.getElementById('nav_image').addEventListener('click',function (){
    if (imgContent.style.visibility === "visible") {
        imgContent.scrollIntoView()

    }


})