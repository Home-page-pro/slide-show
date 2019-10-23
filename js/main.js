'use strict';

const images = [
    'img/pic00.png',
    'img/pic01.png',
    'img/pic02.png',
    'img/pic03.png',
    'img/pic04.png',
    'img/pic05.png',
    'img/pic06.png',
    'img/pic07.png'
]

let current = 0

// メインの切り替え
const mainImage = document.getElementById('main') // main要素を持ってくる
mainImage.src = images[current] // main要素のソースにimages[番号]を入れる

// 下のボタンの切り替え
images.forEach((image, index) => {
    const img = document.createElement('img') // img要素作成
    img.src = image
    
    const li = document.createElement('li') // li要素作成
    
    // mainImageと同じボタンにcurrentクラスを付ける
    if (index === current) {
        li.classList.add('current')
    }
    
    // クリックされたらmainImageを押したボタンと同じにする
    li.addEventListener('click', () => {
        mainImage.src = image
        const thumbnails = document.querySelectorAll('.thumbnails > li')
        thumbnails[current].classList.remove('current') // 今までのcurrentクラスを取る
        current = index // currentにindexを代入する
        thumbnails[current].classList.add('current') // currentクラスを付ける
    })
    
    li.appendChild(img) // li要素にimg要素を入れる
    document.querySelector('.thumbnails').appendChild(li) // thumbnailsクラスにli要素を入れる
})

// →を押したら次へ
const next = document.getElementById('next')
next.addEventListener('click', () => {
    let target = current + 1
    if (target === images.length) {
        target = 0
    }
    // thumbnailsのliのtarget番目がクリックされたときと同じ処理をする
    document.querySelectorAll('.thumbnails > li')[target].click()
})

// ←を押したら前へ
const prev = document.getElementById('prev')
prev.addEventListener('click', () => {
    let target = current - 1
    if (target < 0) {
        target = images.length  - 1
    }
    document.querySelectorAll('.thumbnails > li')[target].click()
})

let timeoutId

function playSlideshow() {
    timeoutId = setTimeout(() => {
        next.click() // nextをクリック
        playSlideshow()  // 実行
    }, 1000) // 一秒後に
}

let isPlaying = false

const play = document.getElementById('play')
play.addEventListener('click', () => {
    if (isPlaying === false) {
        playSlideshow() // 実行
        play.textContent = 'Pause'
    } else {
        clearTimeout(timeoutId)
        play.textContent = 'Play'
    }
    isPlaying = !isPlaying
})